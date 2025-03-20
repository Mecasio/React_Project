const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const webtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyparser = require('body-parser');

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));

//MYSQL CONNECTION FOR ADMISSION
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'admission',
});

//MYSQL CONNECTION FOR ENROLLMENT
const db2 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'enrollment',
});

db.connect(err => {
    if (err) throw err;
    console.log("Database Connected");
});

db2.connect(err => {
    if (err) throw err;
    console.log("Database Connected");
});


/*--------------------------------------------------*/ 

//ADMISSION
//REGISTER
app.post("/register", async (req, res) => {
    const {username, email, password} = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.beginTransaction((err) => {
            if (err) return db.rollback(() => res.status(500).send({ message: "Transaction start failed" })); 
            
            const query1 = 'INSERT INTO person_table () VALUES ()';
            
            db.query(query1, (err, result) => {
                if (err) return db.rollback(() => res.status(500).send({ message: "Error creating person_id" })); 
            
                const person_id = result.insertId;
                
                const query2 = 'INSERT INTO user_accounts (person_id, username, email, password) VALUES (?, ?, ?, ?)';

                db.query(query2, [person_id, username, email, hashedPassword], (err, result) => {
                    if (err) return db.rollback(() => res.status(500).send({ message: "Error inserting user data" })); 
                
                    db.commit((err) => {
                        if (err) return db.rollback(() => res.status(500).send({ message: "Transaction commit failed" }));
                        res.status(201).send({ message: "Registration successful!", person_id });
                    });
                });
            });
        });
    } 
    catch(error) {
        res.status(500).send({message: "Internal Server Error"});
    }
});

//READ
app.get('/admitted_users', (req, res) => {
    const query = 'SELECT * FROM user_accounts';

    db.query(query, (err,result) => {
        if (err) return res.status(500).send({message: 'Error Fetching data from the server'});
        res.status(200).send(result);
    });
});

//TRANSFER ENROLLED USER INTO ENROLLMENT
app.post('/transfer', async (req, res) => {
    const { person_id } = req.body;

    const fetchQuery = 'SELECT * FROM user_accounts WHERE person_id = ?';

    db.query(fetchQuery, [person_id], (err, result) => {
        if (err) return res.status(500).send({ message: "Error fetching data from admission DB", error: err });

        if (result.length === 0) {
            return res.status(404).send({ message: "User not found in admission DB" });
        }

        const user = result[0];
        
        const insertPersonQuery = 'INSERT INTO person_table (first_name, middle_name, last_name) VALUES (?, ?, ?)';

        db2.query(insertPersonQuery, [user.first_name, user.middle_name, user.last_name], (err, personInsertResult) => {
            if (err) {
                console.log("Error inserting person:", err);
                return res.status(500).send({ message: "Error inserting person data", error: err });
            }

            const newPersonId = personInsertResult.insertId;

            const insertUserQuery = 'INSERT INTO user_accounts (person_id, username, email, password) VALUES (?, ?, ?, ?)';

            db2.query(insertUserQuery, [newPersonId, user.username, user.email, user.password], (err, insertResult) => {
                if (err) {
                    console.log("Error inserting user:", user.username, err);
                    return res.status(500).send({ message: "Error inserting user account", error: err });
                } else {
                    console.log("User transferred successfully:", user.username);
                    return res.status(200).send({ message: "User transferred successfully", username: user.username });
                }
            });
        });
    });
});


/*--------------------------------------------------*/ 

//ENROLLMENT
//LOGIN
app.post("/login", (req, res) => {
    const {email, password} = req.body;

    const query = 'SELECT * FROM user_accounts WHERE email = ?';

    db2.query(query, [email], async (err, result) => {
        if (err) return res.status(500).send(err);

        if (result.length === 0) return res.status(400).send({message: 'Users not found...'});

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(400).send({message: 'Invalid Credentials'});

        const token = webtoken.sign({
            id: user.id,
            person_id: user.person_id,
            username: user.username,
            email: user.email,
        },
            'secret', { expiresIn: '1h'}
        );
        res.status(200).send({token, user: {person_id: user.person_id, username: user.username, email: user.email}});
    }); 
});

//READ
app.get('/enrolled_users', (req, res) => {
    const query = 'SELECT * FROM user_accounts';

    db2.query(query, (err,result) => {
        if (err) return res.status(500).send({message: 'Error Fetching data from the server'});
        res.status(200).send(result);
    });
});


app.listen(5000, () => {
    console.log('Server runnning');
});