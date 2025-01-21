import express ,{Response,Request} from'express'
import { conn } from '../connection';

const app= express();

const getNotification = app.get('/notification/:id?/:usertype',(req:Request,res:Response)=>{
  if (!req.params || !req.params.id && !req.params||req.params.usertype) {
    return res.status(400).json({ error: 'User ID is missing in the URL' });
    }
    const Id = req.params.id; 
    const uesrType= req.params.usertype;
    if (isNaN(Number(Id))) {
    return res.status(400).json({ error: 'Invalid user ID' });
    }
    if(uesrType=="0"){
        const sql = `SELECT * FROM notification WHERE notification_userid = ? and userType = '0'`;
        conn.query(sql,[Id],(err,result)=>{
            if(err){
                console.error(err)
                return res.status(500).json({ error: 'error in service' })
            }
            if(result.length==0){
                res.status(400).json({ message: "You don't have any notifications" })
            }
            res.json(result)
            console.log(result)
        })
    }
    
    else{
        conn.query(`SELECT * FROM notification WHERE provider_id = ? and userType = '1'`,(err,result)=>{
            if(err){
              console.error(err)
              return res.status(500).json({ error: 'error in service' })
            }
            if(result.length==0){
              res.status(400).json({ message: "You don't have any notifications" })
            }
            res.json(result)
            console.log(result)
          })
        
    }

});


export default getNotification