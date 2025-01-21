import express, { Response, Request } from "express";
import { conn } from "../connection";

const app = express();
function counstprovider (){
    const countQuery = `
    UPDATE service
JOIN (
 SELECT service_provider.service_id, COUNT(*) as count
 FROM service_provider
 GROUP BY service_provider.service_id
) as subquery
ON service.servcie_id = subquery.service_id
SET service.count = subquery.count;

 `;
 conn.query(countQuery, (err) => {
    if (err) {
        console.error('Error fetching service provider counts: ', err);
        
    }
}
 )
}

const admin_service = app.get('/service-admin', (req: Request, res: Response) => {
    const servicesQuery = `SELECT * FROM service `;
    counstprovider()

    conn.query(servicesQuery, (err, servicesResults) => {
        if (err) {
            console.error('Error fetching services: ', err);
            res.status(500).send({ error: 'Error fetching services' });
            return;
        }
        
        if (servicesResults.length === 0) {
            res.status(200).json({ message: "No active services found" });
            return;
        }

       

            res.json(
                 servicesResults,
               
            );
        });
    });


export default admin_service;