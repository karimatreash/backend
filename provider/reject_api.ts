import express, { Request, Response } from 'express';
import { conn } from '../connection'; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const reject = app.post('/rejectrequest/:id', (req: Request, res: Response) => {
 
  if (!req.params || !req.params.id) {
    return res.status(400).json({ error: 'Request ID is missing in the URL' });
  }

  const requestId = req.params.id; 

  const fetchRequestQuery = 'SELECT * FROM service_request WHERE service_requestid = ?';
  conn.query(fetchRequestQuery, [requestId], (error, results, fields) => {
    if (error) {
      console.error('Error fetching request data:', error);
      return res.status(500).json({ error: 'An error occurred' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Request not found' });
    }
   

    

      const updateRequestQuery = 'UPDATE service_request SET status = 2 WHERE service_requestid = ?';
      conn.query(updateRequestQuery, [requestId], (error, results, fields) => {
        if (error) {
          console.error('Error updating request status:', error);
          return res.status(500).json({ error: 'An error occurred' });
        }

        res.json({ message: 'Request Rejected successfully' });
      });
    });
  });

export default reject;
