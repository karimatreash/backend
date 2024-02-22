//import express, { Request, Response } from 'express';
import express,{ Request, Response } from 'express';
import {conn} from './connection';
//import { Sequelize } from 'sequelize';
const Sequelize =require('sequelize')
const app = express();
// import apisignup from './signupApi'
// import Service from './moduls/serive';



console.log(conn)

app.get('/service', (req: Request, res: Response) => {
  
  
  // Service.findAll().then((ser: any)=>{
  //   res.json(ser);
  // });

  const query = 'SELECT * FROM service';

  // التنفيذ
  conn.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching serive : ', err);
      res.status(500).send({ error: 'Error fetching service' });
      return;
      
    }
res.json(results);
  


  
    console.log(results);
    
    
  });

});

app.get('/serviceprovider/:id',(req:Request,res:Response)=>{
    const serviceid =req.params.id;
   console.log(conn)
    conn.query('SELECT provider_fname,provider_lname, provider_phone FROM service_provider WHERE service_provider.service_id=? ' ,[serviceid],(err,result)=>{
        if(err){
            console.error(err);
            res.status(500).json({ error: 'Error fetching provider' })
        }
        if (result.length == 0) {
            res.status(404).send('worker not found');
            return;
        }
        res.json(result);
    })
})


app.get('/serviceprovider/details/:id/status',(req:Request,res:Response)=>{
  const serviceid =req.params.id;
  const status =1;
  conn.query('SELECT service_provider.city,service_provider.address,service.servcie_name,service_provider.status FROM service_provider INNER JOIN service ON service_provider.service_id = service.servcie_id WHERE service_provider.provider_id=? AND service_provider.status=?; ' ,[serviceid,status],(err,result)=>{
      if(err){
          console.error(err);
          res.status(500).json({ error: 'Error fetching provider ' })
      }
      if (result.length == 0) {
          res.status(404).send('worker not found');
          return;
      }
      res.json(result);
  })
})
// app.use(apisignup);

const port = process.env.port||5000;
app.listen(port, () => {
  console.log(`Server is running on port `);
});
