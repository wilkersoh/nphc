import { useQuery, useMutation, useQueryClient } from "react-query";
import axiosClient from "utils/axios";

interface ICreateUser {
  login: boolean;
  name:  string;
  salary: number;
  userId: string;
}

const createUser = ( user: ICreateUser ) => axiosClient.post("/users", user);

export const useCreateUser = () => {
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
    }
  })
}
