import express, { Response, Request } from "express";
import conn from "./connection";
import bcrypt from 'bcrypt'


const app = express()

const apisignup =app.post('/signup/user', async (req: Request, res: Response) => {
    const { fname, lastname, phone,city,address, pass,email   } = req.body
    try {
        conn.query('SELECT * FROM custoumer WHERE email =?'[email], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ error: 'servier error' });
            }
            if (result.length > 0) {
                return res.status(400).json({ error: 'email all readt exist' });
            }
        });
        conn.query('SELECT * FROM custoumer WHERE phone =?'[phone], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ error: 'servier error' });
            }
            if (result.length > 0) {
                return res.status(400).json({ error: 'phone all readt exist' });
            }
        }

        )
        const solt = 15;
        const hashpass = await bcrypt.hash(pass, solt);
        var sql ='INSERT INTO customer (customer_fname,customer_lname,phone_num,city,address,pass,email) VALUES ?'
        conn.query(sql,[fname, lastname, phone,city,address,pass,email],(err,results)=>{
            if(err){
                console.error(err);
                res.status(500).json({error:"servier errore "});
            }
            res.status(201).json({massage:"signup secssfuly "});
        })

    }
    catch(err){
        console.error('error:',err)
    }
}
)

export default apisignup;
