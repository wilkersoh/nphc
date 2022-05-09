import type { NextApiRequest, NextApiResponse } from 'next';
import mongoseDbConnect from "utils/databaseConnect";
import Employee, { deleteMany } from "models/Employee";

mongoseDbConnect();

export default async function getEmployeeById(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method
  } = req;

  switch( method ) {
    case 'GET':
      try {
        const employee = await Employee.findById( id );

        if( !employee ) return res.status(400).json({ success: false, messsage: 'Not exist in database'});

        res.json({ success: true, data: employee })
      } catch (error) {
        res.status(400).json({ success: false, message: 'Something went wrong.' })
      }
      break;
    case 'PUT':
      try {
        const updateEmployee = await Employee.findByIdAndUpdate( id, req.body, {
          new: true,
          runValidators: true
        });

        if( !updateEmployee ) return res.status(400).json({ success: false, messsage: 'Not exist in database'});

        res.json({ success: true, data: updateEmployee, message: 'Successful updated the employee'  })

      } catch (error) {
        res.status(400).json({ success: false, message: 'Something went wrong.' })
      }
      break;

    case 'DELETE':
      try {
        const deleteEmployee = await Employee.deleteOne({ _id: id });

        if( !deleteEmployee ) return res.status(400).json({ success: false, messsage: 'Something went wrong in delete the employee.'});

        res.json({ success: true, data: deleteEmployee, message: 'Successful deleted the employee' })
      } catch (error) {
        res.status(400).json({ success: false, message: 'Something went wrong.' })
      }
      break;
    default: res.status(400).json({ success: false, message: 'Something went wrong in calling api.' })
  }
}
