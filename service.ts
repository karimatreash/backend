import express, { Response, Request } from "express";
import { conn } from "./connection";
const app = express();
const service_api =app.get('/service', (req: Request, res: Response) => {
    
// Service.findAll().then((ser: any)=>{
    //   res.json(ser);
    // });
    
    // التنفيذ
    conn.query(`SELECT * FROM service WHERE isactive=1`, (err, results) => {
        if (err) {
            console.error('Error fetching serive : ', err);
            res.status(500).send({ error: 'Error fetching service' });
            return;

        }
        if(results.length==0){
            res.status(200).json({message:"get succesful"})
        }
        
        res.json(results);
    });
});

export default service_api;
