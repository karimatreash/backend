import { conn } from "../connection";
import cron from 'node-cron'
const scheduleReminders = () => {
    cron.schedule('0 9 * * *', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formattedDate = tomorrow.toISOString().split('T')[0];
  
      try {
        const [rows]:any = await conn.query(
          'SELECT * FROM appointments WHERE date = ?',
          [formattedDate]
        );
  
        const appointments: any[] = rows as any[];
        appointments.forEach((appointment) => {
            //appointment  من هاي بتقدر تجيب الايميل 
         // هون بدك ترسل اشعار للمفدم و الكسمتر انه عندكم بكرا شغل 
        });
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    });
  };
  
  export default scheduleReminders;