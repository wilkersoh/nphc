import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { BsPencilFill } from "react-icons/bs";
import Prompt from 'components/Prompt';
import toast, { Toaster } from 'react-hot-toast'
import axiosClient from 'utils/axios';
import { useMutation, useQueryClient } from 'react-query';
import Modal from 'components/Modal';
import { numberWithCommas } from 'utils/numberWithComma';
import { objectToErrorMessage } from 'utils/objectToErrorMessage';
import { IUserList, IUserFormError } from "./Users.type";

const removeUser = async ( _id: string ) => {
  const result = await axiosClient.delete(`/users/${ _id }`);

  return result;
}

const updateUser = async ({ _id, ...data }: { _id: string, data: {} }) => {
  const result = await axiosClient.put(`/users/${ _id }`, data);
  return result;
}

const UserTable = ({ lists }: { lists: IUserList[] } ) => {
  const [ showPrompt, setShowPrompt ] = useState( false );
  const [ formErrors, setFormError ] = useState<IUserFormError>( {} );
  const [ selectedUser, setSelectedUser ] = useState<IUserList | any>({});
  const [ showModal, setShowModal ] = useState( false );
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation( removeUser );

  useEffect(() => {
    return () => {
      setFormError( {} );
    }
  }, [])
  const { mutateAsync: updateMutateUser } = useMutation( updateUser, {
    onSuccess: () => {
      toast.success('User was updated');
      setShowModal( false )
      queryClient.invalidateQueries(['getUsers', selectedUser._id ])
    },
    onError: ( error ) => {
      const { response: { data, status } }: any = error;
      const message = objectToErrorMessage( data.errors );
      toast.error(`${ message } (${ status })`);

      setFormError( data.errors )
    }
  });

  const handleOnView = async ( id: string ) => {
    try {
      const user = await axiosClient.get(`/users/${ id }`);
      setSelectedUser( user.data.user );
      setShowModal( true )
    } catch (error) {
      toast.error('Please check with tech team.');
    }
  }

  const handleOnDelete = async ( ) => {
    await mutateAsync( selectedUser._id );
    setShowPrompt( false )
    queryClient.invalidateQueries('getUsers');

    toast.success('Successfully deleted the user.');
  }

  const handleOnChangeUser = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const { name, value, checked, type } = e.target;
    let user;

    switch( type ) {
      case "text":
        user = { ...selectedUser, [ name ]: value }
        break;
      case "checkbox":
        user = { ...selectedUser, [ name ]: checked }
        break;
      default:
        user = { ...selectedUser, [ name ]: value }
    }

    setSelectedUser( user );
  }

  const handleOnSubmit = async ( e: React.SyntheticEvent<HTMLFormElement> ) => {
    e.preventDefault();

    await updateMutateUser( selectedUser );
    queryClient.invalidateQueries('getUsers');
  }

  return (
    <>
      <div className='table md:mx-0'>
        <Toaster />
        <div className='text-2xl font-semibold mb-4'>Employees:</div>
        <div>
          <div className='table-header'>
            <ul className='table-grid'>
              {
                [ "Id", "Name", "Login", "Salary", "Action" ].map(( headerValue ) => (
                  <li className='p-3' key={ headerValue }>{ headerValue }</li>
                ))
              }
            </ul>
          </div>
          <ul className='table-content flex flex-col min-h-[240px]'>
            {
              lists.map(( item: IUserList ) => {
                const { userId, name, login, salary, _id } = item;
                return (
                  <div key={ _id } className="table-grid">
                    <li className='py-3 px-2 md:p-3 overflow-x-auto'>{ userId }</li>
                    <li className='py-3 px-2 md:p-3 overflow-x-auto'>{ name }</li>
                    <li className='py-3 px-2 md:p-3 overflow-x-auto'>{ login }</li>
                    <li className='py-3 px-2 md:p-3 overflow-x-auto'>S${ numberWithCommas( salary ) }</li>
                    <li className='py-3 px-2 md:p-3'>
                      <div className='flex justify-center content-center'>
                        <div className='px-2 cursor-pointer' onClick={() => handleOnView( _id ) }>
                          <BsPencilFill color="lightBlue" />
                        </div>
                        <div className='px-2 cursor-pointer' onClick={() => {
                          setShowPrompt( true )
                          setSelectedUser( item )
                        }}>
                          <MdDelete color="red" />
                        </div>
                      </div>
                    </li>
                  </div>
              )})
            }
          </ul>
        </div>
      </div>
      <Prompt show={ showPrompt } onClose={() => setShowPrompt( false )} handleOnYes={ handleOnDelete }>
        <span>Are you sure you want to delete the user?</span>
      </Prompt>
      <Modal show={ showModal } title="Update User" onClose={() => setShowModal( false )} handleOnSubmit={ handleOnSubmit }>
        <div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 cursor-pointer" htmlFor="name">
              Name
            </label>
            <input
              value={ selectedUser.name || "" }
              onChange={ handleOnChangeUser }
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${ formErrors.name && 'border border-red-500' }`}
              id="name"
              name="name"
              type="text"
              placeholder='Name' />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 cursor-pointer" htmlFor="salary">
              Salary
            </label>
            <input
              value={ selectedUser.salary || "" }
              step=".01"
              onChange={ handleOnChangeUser }
              className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${ formErrors.salary && 'border border-red-500' }`}
              id="salary"
              name="salary"
              type="number"
              placeholder='Salary' />
          </div>
          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2 mr-2 cursor-pointer" htmlFor="login">
              Login
            </label>
            <input
              value={ selectedUser.login || "" }
              onChange={ handleOnChangeUser }
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${ formErrors.name && 'border border-red-500' }`}
              id="login"
              name="login"
              type="text"
              placeholder='Login' />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default UserTable