import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import axiosClient from "utils/axios";
import { objectToErrorMessage } from "utils/objectToErrorMessage";

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
      queryClient.invalidateQueries('getUsers')
      // queryClient.setQueryData<ICreateUser>('getUsers', ( prev: any ) => {
      //   console.log('prev', prev)
      //   console.log('dat.... ', data)
      //   return {
      //     ...prev,
      //     data: {
      //       ...data.data,
      //       users: [ ...prev.users, data.data.user ]
      //     }
      //   }
      // })
      setShowCreateModal( false )
    },
    onError: ( error: any ) => {
      const { response: { data, status } } = error;
      const message = objectToErrorMessage( data.errors );
      toast.error(`${ message } (${ status })`)
      setCreateFormError( data.errors )
    }
  })
}
