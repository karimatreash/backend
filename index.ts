import express from 'express';
import provider_api from './cotomer/provider';
import apisignup from './signupApi'
 import login_api from './cotomer/login_api';
 import service_api from './service';
 import booking_Api from './cotomer/booking';
 import requests from './cotomer/requset';
import approval from './approved_api';
import get_apoointent from './cotomer/appoinget';

// import Service from './moduls/serive';
const app = express();
app.use(service_api);
app.use(provider_api)
app.use(apisignup);
 app.use(login_api);
 app.use(booking_Api);
 app.use(requests);
 app.use(approval)
 app.use(get_apoointent)
const port = process.env.port||5000;
app.listen(port, () => {
  console.log(`Server is running on port `);
});


// app.get('/serviceprovider/:id',(req:Request,res:Response)=>{
//   const serviceid =req.params.id;
 
//   conn.query('SELECT provider_fname,provider_lname, provider_phone FROM service_provider WHERE service_provider.service_id=? ' ,[serviceid],(err,result)=>{
//       if(err){
//           console.error(err);
//           res.status(500).json({ error: 'Error fetching provider' })
//       }
//       if (result.length == 0) {
//           res.status(404).send('worker not found');
//           return;
//       }
//       res.json(result);
//   })
// })
