// import type { NextPage } from 'next'
import { AiOutlineSearch } from "react-icons/ai";
import { BiAlarmAdd } from "react-icons/bi";
import { GrFormAdd } from "react-icons/gr";
import InputFile from "components/Inputs/File"
import UserTable from 'components/Table';
import { dehydrate, QueryClient } from "react-query"
import { useGetUsers, getUsersFromServer, DEFAULT_QUERY_OBJECT } from "hooks/users/useGetUsers"
import { useCreateUser } from "hooks/users/useCreateUser";
import Layout from "components/Layouts";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Modal from "components/Modal";
import InputNumber from "components/Inputs/Number"
import InputText from "components/Inputs/Text"
import InputSelect from "components/Inputs/Select"

const Home = () => {
  const [ showCreateModal, setShowCreateModal ] = useState( false );
  const [ showSelectFilter, setShowSelectFilter ] = useState( false );
  const [ createFormError, setCreateFormError ] = useState( {} );
  const [ disableSearch, setDisableSearch ] = useState( true );
  const [ fitlerSalary, setFilterSalary ] = useState( {} );
  const [ searchUserQuery, setSearchUserQuery ] = useState( DEFAULT_QUERY_OBJECT );

  DEFAULT_QUERY_OBJECT
  const { data } = useGetUsers( searchUserQuery );

  const [ formData, setFormData ] = useState( {} );
  const { mutate: addUser } = useCreateUser( setShowCreateModal, setCreateFormError );

  useEffect(() => {
    const { endSalary, startSalary } = fitlerSalary

    if( endSalary && startSalary ) return setDisableSearch( false )
    if( !endSalary && startSalary ) return setDisableSearch( true )
    if( endSalary && !startSalary ) return setDisableSearch( true )

  }, [ fitlerSalary ])

  useEffect(() => {
    return () => {
      setFormData( {} );
      setCreateFormError( {} );
      setFilterSalary( {} )
      setDisableSearch( true )
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

  const handleOnChangeFilter = ( e, sortQuery = "" ) => {

    if( !sortQuery.length ) {
      const { name, value } = e.target;
      let salaries = { ...fitlerSalary, [ name ]: value }

      return setFilterSalary( salaries );
    }
    console.log('sortQuery:  :>> ', sortQuery);
    setDisableSearch( false )
    setSearchUserQuery({ ...searchUserQuery, sortBys: sortQuery })
  }

  const handleOnSubmitFilter =  async ( e ) => {
    e.preventDefault();

    setSearchUserQuery({ ...searchUserQuery, ...fitlerSalary })
  }

  return (
    <>
      <Layout className="mt-12 md:mt-8">
        {/* Filter container */}
        <section className="flex flex-col md:mt-10 mb-10">
          <form onSubmit={ handleOnSubmitFilter } className="flex flex-col justify-center md:justify-start">

            <div className="flex flex-wrap lg:flex-nowrap justify-start md items-center">
              <div className="mr-4 mb-2 w-full">
                <label className="block text-sm font-bold mb-2 cursor-pointer" htmlFor="startSalary">
                  Minimum Salary
                </label>
                <InputNumber
                  name="startSalary"
                  value={ fitlerSalary.startSalary }
                  onChange={ handleOnChangeFilter }
                  placeholder={'Minimum Salary'}
                />
              </div>
              <div className="mr-4 mb-2 w-full">
                <label className="block text-sm font-bold mb-2 cursor-pointer" htmlFor="endSalary">
                  Maximum Salary
                </label>
                <InputNumber
                  name="endSalary"
                  value={ fitlerSalary.endSalary }
                  onChange={ handleOnChangeFilter }
                  placeholder={'Maximum Salary'}
                />
              </div>

              <div className="mr-4 mb-2 w-full" onClick={() => setShowSelectFilter( !showSelectFilter )} >
                <label className="block text-sm font-bold mb-2 cursor-pointer">Sort By</label>
                <InputSelect handleOnChangeFilter={ handleOnChangeFilter } show={ showSelectFilter } onClose={() => setShowSelectFilter( false ) } />
              </div>
            </div>

            {/* Search Button */}
            <div className="ml-auto">
              <button disabled={ disableSearch } type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded h-[45px] disabled:bg-gray-500 disabled:opacity-65">Search</button>
            </div>
          </form>

          <div onClick={ () => setShowCreateModal( true )} className="inline-block border-2 h-10 w-10 text-center border-green-400 p-2 cursor-pointer rounded-full">
            <div className="text-2xl text-green mb-2 leading-[0.75]">+</div>
          </div>
        </section>

        {/* user list table */}
        <UserTable lists={ data?.data?.users || [] } />

        <Toaster />
      </Layout>
      <Modal show={ showCreateModal } title="Create User" onClose={() => setShowCreateModal( false )} handleOnSubmit={ createUser }>
        <div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 cursor-pointer" htmlFor="name">
              Name
            </label>
            <InputText
              value={ formData.name }
              name={"name"}
              onChange={ handleCreateOnChange }
              className={ createFormError.name ? true : false }
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 cursor-pointer" htmlFor="salary">
              Salary
            </label>
            <InputNumber
              value={ formData.salary }
              name={'salary'}
              onChange={ handleCreateOnChange }
              placeholder={'Salary'}
              className={ createFormError.salary ? true : false } />
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
