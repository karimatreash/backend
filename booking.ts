import express, { Response, Request } from "express";
import { conn } from './connection';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const booking_Api = app.post('/booking', async (req: Request, res: Response) => {
    const { date, serviceid, customerid, providerid } = req.body;
    const sql = 'INSERT INTO service_request (servcie_id, provider_id, customer_id, date_request) VALUES (?, ?, ?, ?)';
    try {
        const result = await conn.query(sql, [serviceid, providerid, customerid, date]);
        res.status(200).json({ message: "booking successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'server error' });
    }
});

export default booking_Api;
