import express from 'express';
import { conn } from "../connection";
const app =express()
const queries = {
    providers: 'SELECT COUNT(*) AS count FROM service_provider',
    active_provider:'SELECT COUNT(*) AS count FROM service_provider WHERE status = 1 ',
    customers: 'SELECT COUNT(*) AS count FROM customer',
    requests: 'SELECT COUNT(*) AS count FROM service_request',
    cancle_request:'SELECT COUNT(*) AS count FROM service_request WHERE status =7',
    appointments: 'SELECT COUNT(*) AS count FROM appointment',
    appointment_done:'SELECT COUNT(*) AS count FROM appointment WHERE status =4',
    count_service:'SELECT COUNT(*) AS count FROM service '
  };
  
 
  type QueryKeys = keyof typeof queries;
  type Results = { [key in QueryKeys]?: number };
  
  const count_admin = app.get('/stats', (req, res) => {
    const results: Results = {};
  
    const handleQuery = (key: QueryKeys) => {
      return new Promise<void>((resolve, reject) => {
        conn.query(queries[key], (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          results[key] = rows[0].count;
          resolve();
        });
      });
    };
  
  
    const queryKeys = Object.keys(queries) as QueryKeys[];
  
    Promise.all(queryKeys.map(handleQuery))
      .then(() => {
        res.json(results);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the statistics' });
      });
  });
  export default count_admin;