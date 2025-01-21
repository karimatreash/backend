import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("demodatabase","root","",{
host:'localhost',
dialect:'mysql'
})
sequelize.authenticate()
.then(()=>console.log('Database connected....'))
.catch((err)=>console.error('Database connection error',err));