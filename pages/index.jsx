// import type { NextPage } from 'next'
import { AiOutlineSearch } from "react-icons/ai";
import { BiAlarmAdd } from "react-icons/bi";
import InputFile from "components/Inputs/File"
import UserTable from 'components/Table';
import { dehydrate, QueryClient } from "react-query"
import { useGetUsers, getUsersFromServer } from "hooks/users/useGetUsers"
import { useCreateUser } from "hooks/users/useCreateUser";
import Layout from "components/Layouts";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Modal from "components/Modal";


const Home = () => {
  const { data, isLoading, isFetching } = useGetUsers();
  const [ showCreateModal, setShowCreateModal ] = useState( false );
  const [ createFormError, setCreateFormError ] = useState( {} );
  const { mutate: addUser } = useCreateUser( setShowCreateModal, setCreateFormError );
  const [ formData, setFormData ] = useState( {} );

  useEffect(() => {
    return () => {
      setFormData( {} );
      setCreateFormError( {} );
    }
  }, [ showCreateModal ])

  const createUser = async ( e ) => {
    e.preventDefault();
    addUser( formData )
  }

  const handleCreateOnChange = ( e ) => {
    const { name, value } = e.target;

    const newUser = {
      login: false,
      ...formData,
      [ name ]: value
    }

    setFormData( newUser )
  }

  if( isLoading ) {
    return (
      <div>Loadiing</div>
    )
  }

  return (
    <>
      <Layout>
        <AiOutlineSearch />
        <InputFile />
        <div onClick={ () => setShowCreateModal( true )} className="inline-block border-2 border-green-400 p-2 cursor-pointer rounded-full">
          <BiAlarmAdd color="green"/>
        </div>
        <UserTable lists={ data?.data?.users || [] } />
        <Toaster />
      </Layout>
      <Modal show={ showCreateModal } title="View User" onClose={() => setShowCreateModal( false )} handleOnSubmit={ createUser }>
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer" htmlFor="name">
              Name
            </label>
            <input
              value={ formData.name || "" }
              onChange={ handleCreateOnChange }
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${ createFormError.name && 'border border-red-500' }`}
              id="name"
              name="name"
              type="text"
              placeholder='name' />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer" htmlFor="salary">
              Salary
            </label>
            <input
              value={ formData.salary || "" }
              step=".01"
              onChange={ handleCreateOnChange }
              className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${ createFormError.salary && 'border border-red-500' }`}
              id="salary"
              name="salary"
              type="number"
              placeholder='Salary' />
          </div>
        </div>
      </Modal>
    </>
  )
}

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('getUsers', getUsersFromServer);

  return {
    props: {
      dehydratedState: dehydrate( queryClient )
    }
  }


}

export default Home
