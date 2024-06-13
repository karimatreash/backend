import express from 'express';
import provider_api from './provider/provider';
import apisignup from './customer/signupApi'
 import service_api from './service';
 import booking_Api from './customer/booking';
 import requests from './customer/requset';
import approval from './provider/approved_api';
import get_apoointent from './customer/appoinget';
import raiting_api from './customer/ratingprovider';
import getappointment from './provider/getappointment';
import GetRquest_provider from './provider/Get_request_provider';
import new_date from './provider/SugestedNewDate';
import verify_otp from './func/OTP';
import loginall from './func/login_func';
import get_arch_provider from './provider/archiv_provider';
import signupProvider from './provider/signup_provider';
import reject from './provider/reject_api';
import getNotification from './func/notifications';
import verify_pass from './forget_pass/verifyed_code_pass';
import ResetPass from './forget_pass/reset_password';
import verify_email from './forget_pass/verified_code_email';
import check_email from './forget_pass/check_email';
import get_arch_customer from './customer/arciv_customer';
import update_info from './func/updateinfo';
import getAppointmentsForToday from './customer/todyappointment';
import raiting_api_get from './customer/ratingprovider';
import count_admin from './admin/count_adminpanel';
import updateStatusttrue from './provider/active_status_1';
import active_status from './admin/active_service';
import dactive_status from './admin/deactive_service';
import add_new_service from './admin/add_new_service';
import delete_service from './admin/delete_serivce';


// import Service from './moduls/serive';

const app = express();
app.use(service_api);
app.use(provider_api)
app.use(apisignup);
 app.use(booking_Api);
 app.use(requests);
 app.use(approval)
 app.use(reject)
 app.use(get_apoointent)
 app.use(raiting_api)
 app.use(getappointment)
 app.use(GetRquest_provider)
app.use(new_date)
app.use(verify_otp)
 app.use(loginall)
 app.use(get_arch_provider)
 app.use(signupProvider)
 app.use(loginall)
 app.use(getNotification)
 app.use(verify_pass)
 app.use(ResetPass)
 app.use(verify_email)
 app.use(check_email)
 app.use(get_arch_customer)
 app.use(update_info)
 app.use(getAppointmentsForToday)
 app.use(raiting_api_get)
 app.use(count_admin)
 app.use(updateStatusttrue)
 app.use(active_status)
 app.use(dactive_status)
 app.use(add_new_service)
 app.use(delete_service)
//  app.use(cancelOldRequests)
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
