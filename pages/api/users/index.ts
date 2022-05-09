import type { NextApiRequest, NextApiResponse } from 'next';
import mongoseDbConnect from "utils/databaseConnect";
import User from "models/User";

mongoseDbConnect();

export default async function getAllUsers(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch( method ) {
    case 'GET':
      try {
        const users = await User.find({});

        res.json({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false, message: 'Something went wrong.' })
      }
      break;
    case 'POST':
      try {
        const user = await User.create(req.body);

        res.status( 201 ).json({ success: true, data: user, message: 'Successful created user'  });
      } catch (error) {
        res.status(400).json({ success: false, message: 'Something went wrong.' })
      }
      break;
    default:
      res.status(400).json({ success: false, message: 'Something went wrong.' })
      break;
  }
}
