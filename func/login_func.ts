import express, { Response, Request } from "express";
import { conn } from "../connection";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const app = express();

import bodyParser from 'body-parser';
app.use(bodyParser.json());
const loginUser = async (email: string, password: string) => {
    try {
        const [customer]  = await new Promise<any[]>((resolve, reject) => {
            conn.query(`SELECT * FROM customer WHERE email = ?`, [email],(err,results)=>{
                if (err) {
                    reject(err);
                    console.log('error1')
                } else {
                    resolve(results);
                    console.log('error3')
                    console.log(results)
                }
            });
        })
     
        
        
            const match = await bcrypt.compare(password, customer.pass)
            
            
            if (match) {
                return { user: customer, userType: 0 };
                
            }
        

        const [provider]  = await await new Promise<any[]>((resolve, reject) => {
            conn.query(`SELECT * FROM service_provider WHERE email = ?`, [email],(err,results)=>{
                if (err) {
                reject(err);
            } else {
                resolve(results);
            } 
       
           
        });

        })
        
        if (provider && provider.length > 0) {
            const match = await bcrypt.compare(password, provider.pass);

            if (match) {
                return { user: provider[0], userType: 1 };
            }
        }

        return null; 
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
const crypto = require('crypto');


const secretKey = crypto.randomBytes(32).toString('hex');

   
    const generateToken = (userData: any) => {
        let userId;
        if (userData.userType === 'customer') {
            userId = userData.user.customer_id;
        } else if (userData.userType === 'service_provider') {
            userId = userData.user.provider_id;
            ratingp:userData.user.rating
        }
       
            
        const token = jwt.sign({ userId, email: userData.user.email, userType: userData.userType, }, secretKey, { expiresIn: '1h' });
        return token
       
    }

const loginall = app.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const user = await loginUser(email, password);
        
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = generateToken(user);
        
        return res.status(200).json({ message: "Login successful", token, userType: user.userType });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default loginall;


// const loginUser = async (email: string, password: string) => {
//     try {
//         const [customer] = await new Promise<any[]>((resolve, reject) => {
//             conn.query(`SELECT * FROM customer WHERE email = ?`, [email], (err, results) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(results);
//                 }
//             });
//         });

//         const matchCustomer = await bcrypt.compare(password, customer.pass);
//         if (matchCustomer) {
//             return { user: customer, userType: 'customer' };
//         }

//         const [provider] = await new Promise<any[]>((resolve, reject) => {
//             conn.query(`SELECT * FROM service_provider WHERE email = ?`, [email], (err, results) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(results);
//                 }
//             });
//         });

//         if (provider && provider.length > 0) {
//             const matchProvider = await bcrypt.compare(password, provider.pass);
//             if (matchProvider) {
//                 return { user: provider[0], userType: 'service_provider' };
//             }
//         }

//         return null;
//     } catch (error) {
//         console.error('Error:', error);
//         throw error;
//     }
// }

// const loginall = app.post('/login', async (req: Request, res: Response) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ error: "Email and password are required" });
//     }

//     try {
//         const user = await loginUser(email, password);

//         if (!user) {
//             return res.status(401).json({ error: "Invalid email or password" });
//         }

//         let responseData: any = { message: "Login successful", userType: user.userType };

//         if (user.userType === 'service_provider') {
//             responseData = { ...responseData, registrationDate: user.user.registration_date }; // Assuming registration date is stored in the user object
//         } else if (user.userType === 'customer') {
//             responseData = { ...responseData, registrationDate: user.user.registration_date }; // Assuming registration date is stored in the user object
//         }
//         console.log(responseData)
//         return res.status(200).json(responseData);
       
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// });

// export default loginall;
