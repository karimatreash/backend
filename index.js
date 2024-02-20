"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import express, { Request, Response } from 'express';
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const bodyParser_1 = __importDefault(require("body-parser")) ;
const app = (0, express_1.default)();
const port = 4000;
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:53052'); // Replace with your Flutter app's origin
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });
// const corsOptions = {
//   origin: 'http://localhost:53052', // Allow requests from your Flutter app's origin
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors(corsOptions));
// Create a MySQL connection
const connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'home_service',
    port: 3306
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL');
});
app.get('/service', (req, res) => {
    // Query to fetch categories from the database
    const query = 'SELECT * FROM service';
    // Execute the query
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching categories: ', err);
            res.status(500).send({ error: 'Error fetching service' });
            return;
        }
        res.json(results);
        console.log(results);
    });
});
app.get('/serviceprovider/by/:id', (req, res) => {
    const serviceid = req.params.id;
    connection.query('SELECT service_provider.provider_id,provider_phone,service_provider.provider_fname,service_provider.provider_lname,service_provider.city,service_provider.address,service.servcie_name FROM service_provider INNER JOIN service ON service_provider.service_id = service.servcie_id WHERE service_provider.provider_id=? ', [serviceid], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching categories' });
        }
        if (result.length == 0) {
            res.status(404).send('worker not found');
            return;
        }
        res.json(result);
    });
});
app.get('/serviceprovider/:id', (req, res) => {
    const serviceid = req.params.id;
    connection.query('SELECT provider_id,provider_fname,provider_lname, provider_phone FROM service_provider WHERE service_provider.service_id=? ', [serviceid], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching categories' });
        }
        if (result.length == 0) {
            res.status(404).send('worker not found');
            return;
        }
        res.json(result);
    });
    app.use(bodyParser_1.default.json());
    app.post('/signup/user', async (req, res) => {
        const { fname, lastname, phone,city,address, pass,email   } = req.body
        try {
            conn.query('SELECT * FROM custoumer WHERE email =?'[email], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send({ error: 'servier error' });
                }
                if (result.length > 0) {
                    return res.status(400).json({ error: 'email all readt exist' });
                }
            });
            conn.query('SELECT * FROM custoumer WHERE phone =?'[phone], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send({ error: 'servier error' });
                }
                if (result.length > 0) {
                    return res.status(400).json({ error: 'phone all readt exist' });
                }
            }
    
            )
            const solt = 15;
            const hashpass = await bcrypt.hash(pass, solt);
            var sql ='INSERT INTO customer (customer_fname,customer_lname,phone_num,city,address,pass,email) VALUES ?'
            conn.query(sql,[fname, lastname, phone,city,address,pass,email],(err,results)=>{
                if(err){
                    console.error(err);
                    res.status(500).json({error:"servier errore "});
                }
                res.status(201).json({massage:"signup secssfuly "});
            })
    
        }
        catch(err){
            console.error('error:',err)
        }
    }
    )
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
