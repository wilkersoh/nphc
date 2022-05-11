import type { NextApiRequest, NextApiResponse } from 'next';
import mongoseDbConnect from "utils/databaseConnect";
import User from "models/User";

mongoseDbConnect();

export default async function updateUsers(req: NextApiRequest, res: NextApiResponse) {

}