// import express, { Request, Response } from 'express';
// import { conn } from '../connection'; 
// const app = express();
// const getAppointmentsForToday = app.get("/getAppointmentsForToday/:id",(req: Request, res: Response) => {
//     if (!req.params || !req.params.id) {
//         return res.status(400).json({ error: 'User ID is missing in the URL' });
//       }
    
//       const userId = req.params.id; 
    
//       if (isNaN(Number(userId))) {
//         return res.status(400).json({ error: 'Invalid user ID' });
//       }
//     const currentDate = new Date();
    
    
//     const formattedDate = currentDate.toISOString().split('T')[0];
// console.log(formattedDate)
  
//     const query = `SELECT 
//     t1.date,
//     t2.provider_fname,
//     t2.provider_lname,
//     t3.servcie_name 
//     FROM appointment t1
//     join service_provider t2 on t1.provider_id =t2.provider_id
//     join service t3 on t1.servcie_id=t3.servcie_id 
//     WHERE date = '${formattedDate}' AND customer_id =?`;

//     conn.query(query,[userId], (error, results) => {
//         if (error) {
//             console.error('Error fetching appointments:', error);
//             return res.status(500).json({ error: 'An error occurred while fetching appointments' });
//         }
//         if(results.length==0){
//             return res.status(200).json({ message:'no appointment tody' });
//         }

        
//         return res.status(200).json({ appointments: results });
//     });

// });

// export default getAppointmentsForToday;
import express, { Request, Response } from 'express';
import { conn } from '../connection'; 
const app = express();
const getAppointmentsForToday = app.get("/getAppointmentsForToday/:id",(req: Request, res: Response) => {
    if (!req.params || !req.params.id) {
        return res.status(400).json({ error: 'User ID is missing in the URL' });
      }
    
      const userId = req.params.id; 
    
      if (isNaN(Number(userId))) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }

    // Get current date in local time zone
    const currentDate = new Date();

    // Extract the year, month, and day from the current date
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed, so we add 1
    const day = currentDate.getDate().toString().padStart(2, '0');

    // Construct the formatted date string
    const formattedDate = `${year}-${month}-${day}`;
  
    console.log(formattedDate);
  
    const query = `SELECT 
    t1.date,
    t2.provider_fname,
    t2.provider_lname,
    t3.servcie_name 
    FROM appointment t1
    join service_provider t2 on t1.provider_id =t2.provider_id
    join service t3 on t1.servcie_id=t3.servcie_id 
    WHERE DATE(t1.date) = ? AND customer_id =?`;

    conn.query(query, [formattedDate, userId], (error, results) => {
        if (error) {
            console.error('Error fetching appointments:', error);
            return res.status(500).json({ error: 'An error occurred while fetching appointments' });
        }
        if(results.length === 0) {
            return res.status(200).json({ message:'No appointments today' });
        }

        return res.status(200).json({ appointments: results });
    });

});

export default getAppointmentsForToday;

