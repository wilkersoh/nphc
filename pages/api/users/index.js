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

        // &sortBys=createdAt&sortBys=desc&page=1&limit=10&startSalary=1000&endSalary=2000
        if( startSalary && endSalary ) {
          filterSalary = {
            salary: {
              $gte: startSalary,
              $lt: +endSalary + 0.000001
            }
          }
        }

        if( !sortBys && !limit && !page ) {
          console.log("----- first ")
          users = await User.find({})
        } else if( sortBys ) {
          let sortByStep1 = sortBys.replace("sortBys=", "");
          let sortByStep2 = sortByStep1.replace("sortBys=", "");
          const [ key, value ] = sortByStep2.split("&");

          users = await User.find({})
            .where( filterSalary )
            .sort({ [ key ]: value })
            .limit( limit * 1 )
            .skip(( page - 1 ) * limit )
            .exec();
          } else {
            users = await User.find({})
            .where( filterSalary )
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
      let errors = {}
      try {
        const uniqueUserId = Date.now() + Math.floor(Math.random() * 100);
        // const hasUser = await User.findOne({ name: req.body.name }).exec();
        // if( hasUser ) return res.status(400).json({ success: false, message: 'Username already exist in database' })

        if( !req.body.hasOwnProperty('name') || !req.body.name.length ) errors['name'] = 'Name is Required'
        if( !req.body.hasOwnProperty('name') || !req.body.salary ) errors['salary'] = 'Salary is Required'

        if( Object.keys( errors ).length ) throw new Error();

        const user = await User.create({ ...req.body, userId: uniqueUserId });

        res.status( 201 ).json({ success: true, user, message: 'Successful created user.' });
      } catch (error) {
        console.log("hit catch")
        res.status(400).json({ success: false, message: `Failed to create user. Try again.`, errors })
      }
      break;
    default:
      res.status(400).json({ success: false, message: 'Something went wrong.', })
      break;
  }
}
