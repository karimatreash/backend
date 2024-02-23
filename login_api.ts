import express, { Response, Request } from "express";
import { conn } from "./connection";
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser';

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const login_api = app.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        conn.query('SELECT * FROM customer WHERE email = ?', [email], async (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "service error?!!!" });
            }
            if (result.length === 0) {
                return res.status(401).json("email or password wrong ");
            }

            const user = result[0];
            const match = await bcrypt.compare(password, user.pass);
            if (!match) {
                return res.status(401).json("email or password wrong");
            }
            res.status(200).json({ message: 'Login successful', user: { email: user.email ,
                
            } });
        });
    } catch (err) {
        console.error('error:', err);
        res.status(500).json({ error: 'server error' });
      }
});
export default login_api;
