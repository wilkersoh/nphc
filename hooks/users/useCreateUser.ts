import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import axiosClient from "utils/axios";

interface ICreateUser {
  login: boolean;
  name:  string;
  salary: number;
  userId: string;
}

const createUser = ( user: ICreateUser ) => axiosClient.post("/users", user);

export const useCreateUser = ( setShowCreateModal: any, setCreateFormError: any ) => {
  const queryClient = useQueryClient();
  return useMutation( createUser, {
    onSuccess: ( data: any ) => {
      queryClient.setQueryData<ICreateUser>('getUsers', ( prev: any ) => {
        return {
          ...prev,
          data: {
            ...prev.data,
            users: [ ...prev.data.users, data.data.user]
          }
        }
      })
      setShowCreateModal( false )
    },
    onError: ( error: any ) => {
      const { response: { data } } = error;
      toast.error( data.message )
      console.log('error: ', error)
      setCreateFormError( data.errors )
    }
  })
}
