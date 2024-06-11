import express, { Response, Request } from "express";
import { conn } from "../connection";

const app = express();

const active_status = app.post('/updateStatusById/service/active/:id', async (req: Request, res: Response) => {
    const serivceId  = req.params.id;

    if (isNaN(Number(serivceId))) {
        return res.status(400).json("Invalid user ID");
    }

    try {
        console.log("خن")
        const sql = `UPDATE service SET isactive = 1 WHERE servcie_id= ?`;
        conn.query(sql, [serivceId]);
        return res.status(200).json({message:"update done"})
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default active_status;