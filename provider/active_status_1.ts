import express, { Response, Request } from "express";
import { conn } from "../connection";

const app = express();

const updateStatusttrue = app.post('/updateStatusById/true/:id', async (req: Request, res: Response) => {
    const userId  = req.params.id;

    if (isNaN(Number(userId))) {
        return res.status(400).json("Invalid user ID");
    }

    try {
        const sql = `UPDATE service_provider SET status = 1 WHERE provider_id = ?`;
        conn.query(sql, [userId]);
        return res.status(200).json({message:"update done"})
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default updateStatusttrue;