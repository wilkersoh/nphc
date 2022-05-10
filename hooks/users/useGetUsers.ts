import { useQuery } from "react-query";
import toast from "react-hot-toast";
import axiosClient from "utils/axios";

interface IUseUpdateUserError {
  success: boolean;
  message: string;
}

export const getUsersFromServer = async () => await ( await fetch("http://localhost:3000/api/users")).json();
const getUsers = () => axiosClient.get("/users");
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
