import express, { Response, Request } from "express";
import { conn } from "../connection";

const app = express();

const active_status = app.post('/service/active/:id', async (req: Request, res: Response) => {
    const serviceId  = req.params.id;

    if (isNaN(Number(serviceId))) {
        return res.status(400).json("Invalid user ID");
    }

    try {
        const q = `SELECT isactive from service WHWER servcie_id=? `
        conn.query(q,[serviceId],(err,results)=>{

        if(results==0){
            const sql = `UPDATE service SET isactive = 1 WHERE servcie_id= ?`;
        conn.query(sql, [serviceId]);
        return res.status(200).json({message:"active done "})
        }
        else {
            const sql = `UPDATE service SET isactive = 0 WHERE servcie_id= ?`;
        conn.query(sql, [serviceId]);
        return res.status(200).json({message:"deactive done "})
        }
        
    })
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default active_status;