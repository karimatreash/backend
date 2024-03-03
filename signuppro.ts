// import express, { Response, Request } from "express";
// import { conn } from "./connection";
// import bcrypt from 'bcrypt'
// import bodyParser = require("body-parser");

// const app = express()
// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true }))
// const apisignup = app.post('/signup/provider', async (req: Request, res: Response) => {
//     const { fname, lastname, phone, city, address, pass, email,serviceid } = req.body;
//     console.log(req.body);
//     try {
//         // Check if email already exists
//         conn.query('SELECT * FROM customer WHERE email = ?', [email], (err, result) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).send({ error: 'server error' });
//             }
//             if (result.length > 0) {
//                 return res.status(400).json({ error: 'email already exists' });
//             }

//             // Check if phone already exists
//             conn.query('SELECT * FROM customer WHERE phone_num = ?', [phone], (err, result) => {
//                 if (err) {
//                     console.error(err);
//                     return res.status(500).send({ error: 'server error' });
//                 }
//                 if (result.length > 0) {
//                     return res.status(400).json({ error: 'phone already exists' });
//                 }

//                 // Hash the password
//                 const saltRounds = 15;
//                 bcrypt.hash(pass, saltRounds, async (err, hash) => {
//                     if (err) {
//                         console.error(err);
//                         return res.status(500).send({ error: 'server error' });
//                     };

//                     // Insert user into database
//                     const sql = 'INSERT INTO customer (customer_fname, customer_lname, phone_num, city, address, pass, email) VALUES (?, ?, ?, ?, ?, ?, ?)';
//                     conn.query(sql, [fname, lastname, phone, city, address, hash, email,serviceid], (err, results) => {
//                         if (err) {
//                             console.error(err);
//                             return res.status(500).json({ error: "server error" });
//                         }
//                         res.status(201).json({ message: "signup successful" });
//                     });
//                 });
//             });
//         });
//     } catch (err) {
//         console.error('error:', err)
//         res.status(500).json({ error: 'server error' });
//     }
// });

// export default apisignup;
