import { useQuery } from "react-query";
import toast from "react-hot-toast";
import axiosClient from "utils/axios";
import axios from "axios";

interface IUseUpdateUserError {
  success: boolean;
  message: string;
}
const DEFAULT_PAGE_LIMIT = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_QUERY_STRING = `sortBys=name&sortBys=desc&startSalary=&endSalary=&page=${ DEFAULT_PAGE }&limit=${ DEFAULT_PAGE_LIMIT }`
const DEFAULT_QUERY = {
  sortBys: null,
  startSalary: null,
  endSalary: null,
  page: DEFAULT_PAGE,
  limit: DEFAULT_PAGE_LIMIT
}

export const getUsersFromServer = async () => await ( await fetch(`http://localhost:3000/api/users?${ DEFAULT_QUERY_STRING }`)).json();
const getUsers = () => axios.get(`http://localhost:3000/api/users?${ DEFAULT_QUERY_STRING }`);
const getUserById = ( _id: any ) => axiosClient.get(`/users/${ _id }`)

export const useGetUsers = () => {
  return useQuery('getUsers', getUsers, {
    onError: ( error: IUseUpdateUserError ) => toast.error(`${ error.message }`)
  });
}

export const useGetUserById = ( _id: string ) => {
  if( typeof _id != 'string' ) return;
  // if( typeof _id !-)
  return useQuery([ 'getUserById', _id ], () => getUserById( _id ))
}
