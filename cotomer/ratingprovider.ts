import bodyParser from "body-parser";
import { conn } from "../connection";
import express, { Response, Request } from "express";
import { error } from "console";
const app = express();

// Parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const raiting_api_get = app.post('/raiting', async (req: Request, res: Response) => {
    const { reviewer_id, description, user_id, raiting_value } = req.body;

    
    if (raiting_value === undefined ||
         raiting_value === null ||
          isNaN(raiting_value)||
           raiting_value === '') {
        res.status(400).json("raiting_value is invalid or missing");
        return; 
    }

    const sql = 'INSERT INTO review (reviewer_id, description, user_id, raiting_value) VALUES (?,?,?,?)';
    try {
        const result = await conn.query(sql, [reviewer_id, description, user_id, raiting_value]);

        
        const updateSql = `UPDATE appointment
                           SET status = 4 
                           WHERE provider_id = ?
                           AND customer_id = ?`;
        await conn.query(updateSql, [user_id, reviewer_id]);

        res.status(200).json('Rating successful');
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: "Error in server" });
    }
});

export default raiting_api_get;
