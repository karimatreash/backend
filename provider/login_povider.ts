import express, { Response, Request } from "express";
import { conn } from "../connection";
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser';

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const login_provider = app.post('/login_Provider', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(req.body);

              if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
               }
    try {
        conn.query('SELECT * FROM service_provider WHERE email = ?', [email], async (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "service error?!!!" });
            }
            
            if (result.length === 0) {
                return res.status(400).json("email or password wrong ");
            }

            const provider = result[0];
            const match = await bcrypt.compare(password, provider.pass);
            if (!match) {
                console.log("error")
                return res.status(400).json("email or password wrong");
                
            }
            res.status(200).json({ message: 'Login successful', provider: {
                 email: provider.email,
                 fname:provider.provider_fname,
                 lname:provider.provider_lname,
                 id:provider.provider_id,
                 countRequest:provider.count_request,
                 rating:provider.rating
                } });
        });
    } catch (err) {
        console.error('error:', err);
        res.status(500).json({ error: 'server error' });
      }
});
export default login_provider;