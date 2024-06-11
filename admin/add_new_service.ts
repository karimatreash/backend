import express, { Response, Request } from 'express';
import { conn } from '../connection';
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

const add_new_service = app.post('/new_service', async (req: Request, res: Response) => {
    const { servicename, serviceicon } = req.body;
    const sql_add_service = 'INSERT INTO service (servcie_name, service_icon, isactive) VALUES(?, ?, ?)';

    conn.query(sql_add_service, [servicename, serviceicon, 1], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "server error" }); // Return after sending a response
        }
        return res.status(200).json({ message: "the service add done" }); // Return after sending a response
    });
});

export default add_new_service;
