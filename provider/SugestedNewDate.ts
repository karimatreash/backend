import express, { Response, Request } from 'express';
import { conn } from '../connection';

const app = express();

app.use(express.json()); 

const new_date =app.post('/SugestNewDate/:id', async (req: Request, res: Response) => {
    try {
        const requestId = req.params.id;

        console.log(typeof requestId)
        if (!requestId || isNaN(Number(requestId))) {
            return res.status(400).json({ error: 'Invalid or missing request ID' });
        }
        console.log(typeof requestId)
        const { newdate, desc } = req.body;

        if (!newdate || !desc) {
            return res.status(400).json({ error: 'Missing new date or description in request body' });
        }

        const updateQuery = `UPDATE service_request SET newdate = ?, newdes = ?, status = 3 WHERE service_requestid = ?`;
        await conn.query(updateQuery, [newdate, desc, requestId]);

        return res.status(200).json({ message: 'New date added and status updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
});

export default new_date;