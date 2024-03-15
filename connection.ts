import mysql from 'mysql';
import calculateAndSetRatio from './sumrating';
const conn = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'home_service'

});
conn.connect((err) => {
   if (err) {
      console.error(err);
      console.log('cant connect to data baase ')
         ;
   }
   console.log('connected to database 4');
   calculateAndSetRatio();
})

export {conn};

