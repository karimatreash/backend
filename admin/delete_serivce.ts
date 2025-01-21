import express, { Response, Request } from "express";
import { conn } from "../connection";

const app = express();

const delete_service = app.delete('/service/:id', async (req: Request, res: Response) => {
    const serviceId = req.params.id;

    if (isNaN(Number(serviceId))) {
        return res.status(400).json("Invalid service ID");
    }

    try {
        const sql = 'DELETE FROM service WHERE servcie_id = ?';
        await new Promise<void>((resolve, reject) => {
            conn.query(sql, [serviceId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
        return res.status(200).json({ message: "Delete done" });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
});



export default delete_service;
