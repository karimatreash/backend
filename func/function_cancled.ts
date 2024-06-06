import express, { Response, Request } from "express";
import { conn } from "../connection";
const app = express();

function cancelOldRequest (){
    const currentDate = new Date();
    const threeDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 3));
    const formattedDate = threeDaysAgo.toISOString().split('T')[0];

    const selectQuery = `
    SELECT t2.servcie_name,	t1.service_requestid , t1.customer_id
    FROM service_request t1
    JOIN service t2 on t2.servcie_id=t1.servcie_id
    WHERE create_date <= ? AND status = 0
    `;

    conn.query(selectQuery, [formattedDate], (error, results) => {
        if (error) {
            console.error('Error fetching old requests:', error);
        }

        if (results.length > 0) {
            results.forEach((request: { service_requestid: any; customer_id: any; servcie_name:any}) => {
                const updateQuery = `
                    UPDATE service_request
                    SET status = 7
                    WHERE service_requestid = ?
                `;
                
                conn.query(updateQuery, [request.service_requestid], (updateError) => {
                    if (updateError) {
                        console.error('Error updating request status:', updateError);
                    } 
                    else{
                        //هون بدك ترسل اشعارالى العميل و المقدم انه تم الغاء الطلب بسبب عدم الاستجابة 
                    }
                });
            });
        }
        
       
        const twoDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 2));
        const formattedDate2 = threeDaysAgo.toISOString().split('T')[0];
        const selectQuerytow = `
    SELECT t2.servcie_name,	t1.service_requestid , t1.customer_id
    FROM service_request t1
    JOIN service t2 on t2.servcie_id=t1.servcie_id
    WHERE create_date <= ? AND status = 0
    `;
    conn.query(selectQuerytow, [formattedDate2], (error, results) => {
        if (error) {
            console.error('Error fetching old requests:', error);
        }
        if(results.length > 0){
            results.forEach((request: { service_requestid: any; customer_id: any; servcie_name:any}) => {
           //هون بدك ترسل اشعار للمقدم انه عندك طلبات لازم توافق عليهم 
                ;})
        }

    })

    

        
    });


}
export default cancelOldRequest;