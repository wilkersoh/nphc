// import type { NextApiRequest, NextApiResponse } from 'next';
import mongoseDbConnect from "utils/databaseConnect";
import User from "models/User";

mongoseDbConnect();

export default async function getAllUsers(req, res) {
  const { method, query } = req;

  switch( method ) {
    case 'GET':
      try {
        const { sortBys, limit, page, startSalary, endSalary } = query;
        let users, filterSalary = {};

        // &sortBys=name&sortBys=desc&page=1&limit=10&startSalary=1000&endSalary=2000
        if( startSalary && endSalary ) {
          filterSalary = {
            salary: {
              $gte: startSalary,
              $lt: +endSalary + 0.000001
            }
          }
        }

        if( !sortBys && !limit && !page ) {
          users = await User.find({})
        } else {
          users = await User.find({})
            .where( filterSalary )
            .sort({ [ sortBys[0] ]: sortBys[1] })
            .limit( limit * 1 )
            .skip(( page - 1 ) * limit )
            .exec();
        }


        const usersCount = await User.countDocuments();

        res.json({
          success: true,
          users,
          totalPage: Math.ceil( usersCount / limit ),
          currentPage: page
        })
      } catch (error) {
        res.status(400).json({ success: false, message: 'Something went wrong.' })
      }
      break;
    case 'POST':
      try {
        const uniqueUserId = Date.now() + Math.floor(Math.random() * 100);
        const hasUser = await User.findOne({ name: req.body.name }).exec();

        if( hasUser ) return res.status(400).json({ success: false, message: 'Username already exist in database' })
        const user = await User.create({ ...req.body, userId: uniqueUserId, created: new Date().getTime() });

        res.status( 201 ).json({ success: true, user, message: 'Successful created user.' });
      } catch (error) {
        res.status(400).json({ success: false, message: `Failed to create user. Try again.` })
      }
      break;
    default:
      res.status(400).json({ success: false, message: 'Something went wrong.' })
      break;
  }
}
