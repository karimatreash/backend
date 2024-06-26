import express, { Request, Response } from 'express';
import { conn } from '../connection'; 

const app = express();

const get_appointment = app.get('/appointment/user/:id', (req: Request, res: Response) => {
  if (!req.params || !req.params.id) {
    return res.status(400).json({ error: 'User ID is missing in the URL' });
  }

  const userId = req.params.id; 

  if (isNaN(Number(userId))) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  const sql = `SELECT
  t1.appoi_id,
  t1.date,
  t1.description,
  
  t1.provider_id,
  t2.provider_fname,
  t2.provider_lname,
  t2.city,
  t2.provider_phone,
  t2.address,
  t3.servcie_name,
  t4.disblaystats
  
  FROM appointment t1
  JOIN service_provider t2 ON t1.provider_id = t2.provider_id
  JOIN service t3 ON t1.servcie_id = t3.servcie_id 
  JOIN status t4 on t1.status = t4.id_status
  
  
  WHERE t1.customer_id = ? AND t1.status=1`
  conn.query(sql, [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred' }); 
    }

    if (result.length === 0) {
      return res.status(200).json({ message: "You don't have any appointments" }); 
    }

    res.json({appointments :result}); 
  });
});

export default get_appointment;
