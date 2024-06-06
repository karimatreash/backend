// import express, { Request, Response } from 'express';
// import { conn } from '../connection'; 
// import nodemailer from 'nodemailer'; // For sending email notifications
// import bodyParser from 'body-parser';
// import { insertNotify } from './send_notification';

// const app = express();
// app.use(bodyParser.json());



// const cancelOldRequests = app.post("/cancelOldRequests", async (req: Request, res: Response) => {
//     const currentDate = new Date();
//     const threeDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 3));
//     const formattedDate = threeDaysAgo.toISOString().split('T')[0];

//     const selectQuery = `
//     SELECT t2.servcie_name,	t1.service_requestid , t1.customer_id
//     FROM service_request t1
//     JOIN service t2 on t2.servcie_id=t1.servcie_id
//     WHERE create_date <= ? AND status = 0
//     `;

//     conn.query(selectQuery, [formattedDate], (error, results) => {
//         if (error) {
//             console.error('Error fetching old requests:', error);
//             return res.status(500).json({ error: 'An error occurred while fetching old requests' });
//         }

//         if (results.length > 0) {
//             results.forEach((request: { service_requestid: any; customer_id: any; servcie_name:any}) => {
//                 const updateQuery = `
//                     UPDATE service_request
//                     SET status = 7
//                     WHERE service_requestid = ?
//                 `;
                
//                 conn.query(updateQuery, [request.service_requestid], (updateError) => {
//                     if (updateError) {
//                         console.error('Error updating request status:', updateError);
//                     } else {
//             //             insertNotify("الغاء طلبك ",
//             // ` نود ابلاغك بانه تم الغاء طلب خدمة ${request.servcie_name} بسبب عدم استجابة مقدم الخدمة `,
//             //  reviewer_id,
//             //   user_id,
//             //    'ok'+user_id,
//             //    "", 
//             //    "",
//             //     '0')

//                        // sendCancellationNotification(request.customer_id, request.request_id);
//                     }
//                 });
//             });
//         }

//         return res.status(200).json({ message: 'Old requests have been processed' });
//     });
// });

// // const sendCancellationNotification = (customerId: any, requestId: any) => {
// //     const selectCustomerQuery = `
// //         SELECT email
// //         FROM customer
// //         WHERE customer_id = ?
// //     `;

// //     conn.query(selectCustomerQuery, [customerId], (error, results) => {
// //         if (error) {
// //             console.error('Error fetching customer email:', error);
// //             return;
// //         }

// //         if (results.length > 0) {
// //             const customerEmail = results[0].email;
// //             const transporter = nodemailer.createTransport({
// //                 service: 'gmail',
// //                 auth: {
// //                     user: 'your-email@gmail.com',
// //                     pass: 'your-email-password'
// //                 }
// //             });

// //             const mailOptions = {
// //                 from: 'your-email@gmail.com',
// //                 to: customerEmail,
// //                 subject: 'Request Canceled',
// //                 text: `Your request with ID ${requestId} has been canceled due to no response within 3 days.`
// //             };
// //             insertNotify("الغاء طلبك ",
// //             ` نود ابلاغك بانه تم الغاء طلب خدمة ${req} بسبب عدم استجابة مقدم الخدمة `,
// //              reviewer_id,
// //               user_id,
// //                'ok'+user_id,
// //                "", 
// //                "",
// //                 '0')

// //             transporter.sendMail(mailOptions, (error, info) => {
// //                 if (error) {
// //                     console.error('Error sending email:', error);
// //                 } else {
// //                     console.log('Email sent:', info.response);
// //                 }
// //             });
// //         }
// //     });
// // };

// export default cancelOldRequests;
