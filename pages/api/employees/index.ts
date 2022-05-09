import type { NextApiRequest, NextApiResponse } from 'next';
import mongoseDbConnect from "utils/databaseConnect";
import Employee from "models/Employee";

mongoseDbConnect();

export default async function getAllEmployees(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch( method ) {
    case 'GET':
      try {
        const employees = await Employee.find({});

        res.json({ success: true, data: employees })
      } catch (error) {
        res.status(400).json({ success: false, message: 'Something went wrong.' })
      }
      break;
    case 'POST':
      try {
        const employee = await Employee.create(req.body);

        res.status( 201 ).json({ success: true, data: employee, message: 'Successful created employee'  });
      } catch (error) {
        res.status(400).json({ success: false, message: 'Something went wrong.' })
      }
      break;
    default:
      res.status(400).json({ success: false, message: 'Something went wrong.' })
      break;
  }
}
