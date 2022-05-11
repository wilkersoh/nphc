import { useQuery } from "react-query";
import toast from "react-hot-toast";
import axiosClient from "utils/axios";

type IUseUpdateUserStatus = {
  success: boolean;
  message: string;
}

const updateUser = ( _id: string ) => axiosClient.get(`/users/${ _id }`);

export const useUpdateUser = ( _id: string, data: any ) => {
  return useQuery([ 'updateUser', data], () => updateUser( _id ), {
    onError: ( error: IUseUpdateUserStatus ) => toast.error(`${ error.message }`),
    onSuccess: ( payload: IUseUpdateUserStatus ) => toast.success(`${ payload.message }`)
  })
}
