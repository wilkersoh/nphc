// import type { NextApiRequest, NextApiResponse } from 'next';
import mongoseDbConnect from "utils/databaseConnect";
import User from "models/User";

mongoseDbConnect();

export default async function getUserById(req, res) {
  const {
    query: { id },
    method
  } = req;

  switch( method ) {
    case 'GET':
      try {
        const user = await User.findById( id );

        if( !user ) return res.status(400).json({ success: false, messsage: 'Not exist in database'});

        res.json({ success: true, user })
      } catch (error) {
        res.status(400).json({ success: false, message: 'Something went wrong.' })
      }
      break;
    case 'PUT':
      let errors = {}
      try {
        const { name, salary, login } = req.body;

        const hasUser = await User.findOne({ login }).exec();
        if( hasUser ) return res.status(400).json({ success: false, message: 'Please try other.', errors: { login: "Value already been used."} })

        if( !name.length ) errors['name'] = 'Name is Required'
        if( !salary ) errors['salary'] = 'Salary is Required'
        if( !login ) errors['login'] = 'Login is Required'

        if( Object.keys( errors ).length ) throw new Error();

        const updateUser = await User.findByIdAndUpdate( id, req.body, {
          new: true,
          runValidators: true
        });

        if( !updateUser ) return res.status(400).json({ success: false, messsage: 'Not exist in database'});

        res.json({ success: true, user: updateUser, message: 'Successful updated the User'  })

      } catch (error) {
        res.status(400).json({ success: false, message: 'Something went wrong.', errors })
      }
      break;

    case 'DELETE':
      try {
        const deleteUser = await User.deleteOne({ _id: id });

        if( !deleteUser ) return res.status(400).json({ success: false, messsage: 'Something went wrong in delete the user.'});

        res.json({ success: true, user: deleteUser, message: 'Successful deleted the user' })
      } catch (error) {
        res.status(400).json({ success: false, message: 'Something went wrong.' })
      }
      break;
    default: res.status(400).json({ success: false, message: 'Something went wrong in calling api.' })
  }
}
