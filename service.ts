import express, { Response, Request } from "express";
import { conn } from "./connection";
const app = express();
const service_api =app.get('/service', (req: Request, res: Response) => {
// Service.findAll().then((ser: any)=>{
    //   res.json(ser);
    // });
    const query = 'SELECT * FROM service';
    // التنفيذ
    conn.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching serive : ', err);
            res.status(500).send({ error: 'Error fetching service' });
            return;

        }
        res.json(results);
    });
});
export default service_api;