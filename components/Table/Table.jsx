import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import Prompt from 'components/Prompt';
import toast from 'react-hot-toast'
import { useQuery, useMutation }  from "react-query";
import axiosClient from 'utils/axios';

const DeleteUser = ( id ) => axiosClient.delete(`/users/${ id }`);

const Table = ({ lists } ) => {
  const [ showPrompt, setShowPrompt ] = useState( false );
  const [ selectedUserId, setSelectedUserId ] = useState( "" );

  const handleOnView = async ( id ) => {

  }

  const handleOnDelete = async ( ) => {
    const deleteUser = await axiosClient.delete(`/users/${ selectedUserId }`);

    toast.success('Successfully deleted the user!');
  }

  return (
    <>
      <div>
        <div>Lists:</div>
        <ul>
          {
            lists.map(({ userId, name, login, salary, _id } ) => (
              <React.Fragment key={ _id }>
                <li>{ userId }</li>
                <li>{ name }</li>
                <li>{ login }</li>
                <li>{ salary }</li>
                <li>
                  <div>
                    <div onClick={() => handleOnView( _id ) }>
                      <AiFillEye color="green" />
                    </div>
                    <div onClick={() => {
                      setShowPrompt( true )
                      setSelectedUserId( _id )
                    }}>
                      <MdDelete color="red" />
                    </div>
                  </div>
                </li>
              </React.Fragment>
            ))
          }
        </ul>
      </div>
      <Prompt show={ showPrompt } onClose={ () => setShowPrompt( false )} handleOnYes={ handleOnDelete }>
        Are you sure you want to delete the user?
      </Prompt>
    </>
  )
}

export default Table