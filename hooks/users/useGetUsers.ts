import { useQuery } from "react-query";
import toast from "react-hot-toast";
import axiosClient from "utils/axios";
import axios from "axios";
import { objectToQueryString } from "utils/objectToQueryString";

interface IUseUpdateUserError {
  success: boolean;
  message: string;
}
export const DEFAULT_PAGE_LIMIT = 5;
export const DEFAULT_PAGE = 1;
const DEFAULT_QUERY_STRING = `sortBys=createdAt&sortBys=asc&startSalary=&endSalary=&page=${ DEFAULT_PAGE }&limit=${ DEFAULT_PAGE_LIMIT }`
export const DEFAULT_QUERY_OBJECT = {
  sortBys: "",
  startSalary: "",
  endSalary: "",
  page: DEFAULT_PAGE,
  limit: DEFAULT_PAGE_LIMIT
}

export const getUsersFromServer = async () => await ( await fetch(`http://localhost:3000/api/users?${ objectToQueryString( DEFAULT_QUERY_OBJECT ) }`)).json();
const getUsers = ( _query: string ) => {
  let query = _query;
  // ?startSalary=1000&endSalary=1500&page=1&limit=10
  if( !query ) query = DEFAULT_QUERY_STRING

  return axios.get(`http://localhost:3000/api/users?${ objectToQueryString( query ) }`);
}
const getUserById = ( _id: any ) => axiosClient.get(`/users/${ _id }`)

export const useGetUsers = ( query: string) => {
  return useQuery(['getUsers', query ], () => getUsers( query ), {
    onError: ( error: IUseUpdateUserError ) => toast.error(`${ error.message }`)
  });
}

export const useGetUserById = ( _id: string ) => {
  if( typeof _id != 'string' ) return;
  return useQuery([ 'getUserById', _id ], () => getUserById( _id ))
}
