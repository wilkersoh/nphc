import UserTable from 'components/Table';
import { dehydrate, QueryClient } from "react-query"
import { useGetUsers, getUsersFromServer, DEFAULT_QUERY_OBJECT, DEFAULT_PAGE_LIMIT } from "hooks/users/useGetUsers"
import { useCreateUser } from "hooks/users/useCreateUser";
import Layout from "components/Layouts";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Modal from "components/Modal";
import InputNumber from "components/Inputs/Number"
import InputText from "components/Inputs/Text"
import InputSelect from "components/Inputs/Select"
import Pagination from "components/Pagination";

const Home = () => {
  const [ showCreateModal, setShowCreateModal ] = useState( false );

  const [ createFormError, setCreateFormError ] = useState( {} );
  const [ disableSearch, setDisableSearch ] = useState( true );
  const [ fitlerSalary, setFilterSalary ] = useState( {} );
  const [ searchUserQuery, setSearchUserQuery ] = useState( DEFAULT_QUERY_OBJECT );

  const [ showSelectFilter, setShowSelectFilter ] = useState( false );
  const [ showPageFilter, setShowPageFilter ] = useState( false );
  const [ sortBysSelectionText, setSortBysSelectionText ] = useState( "Sory By" )
  const [ showSelectionText, setShowPageText ] = useState( DEFAULT_PAGE_LIMIT )


  DEFAULT_QUERY_OBJECT
  const { data: userListData } = useGetUsers( searchUserQuery );

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

  const handleOnChangeFilter = ( e, sortQuery = "", showPageText ) => {
    let queries = {};
    if( !sortQuery ) {
      if( sortQuery && !sortQuery.length ) {
        // update min and max input
        const { name, value } = e.target;
        let salaries = { ...fitlerSalary, [ name ]: value }

        return setFilterSalary( salaries );
      }
    }

    // trigger from Select Component
    if( sortQuery ) {
      setSortBysSelectionText( e.target.outerText )
      queries = {
        ...queries,
        sortBys: sortQuery
      }
    }
    if( showPageText ) {
      setShowPageText( e.target.outerText )
      queries = {
        ...queries,
        limit: showPageText
      }
    }

    setDisableSearch( false )
    setSearchUserQuery({ ...searchUserQuery, ...queries })
  }

  const handleOnSubmitFilter =  async ( e ) => {
    e.preventDefault();

    setSearchUserQuery({ ...searchUserQuery, ...fitlerSalary })
  }

  const updatePage = page => {
    setSearchUserQuery({ ...searchUserQuery, page: page })
  };

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

              {/* SortBys */}
              <div className="mr-4 mb-2" onClick={() => setShowSelectFilter( !showSelectFilter )}>
                <label className="block text-sm font-bold mb-2 cursor-pointer">Sort By</label>
                <InputSelect handleOnChangeFilter={ handleOnChangeFilter } displayText={ sortBysSelectionText } show={ showSelectFilter } onClose={() => setShowSelectFilter( false ) }>
                  <div id="sort-by" className={`origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button ${ showSelectFilter ? 'block' : 'hidden '}`}>
                      <div className="py-1" role="none">
                        <span onClick={( e ) => handleOnChangeFilter( e, "sortBys=name&sortBys=asc" ) } className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">Name, Alphabetically, A-Z</span>
                        <span onClick={( e ) => handleOnChangeFilter( e, "sortBys=name&sortBys=desc" ) } className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">Name, Alphabetically, Z-A</span>
                        <span onClick={( e ) => handleOnChangeFilter( e, "sortBys=salary&sortBys=asc" ) } className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">Salary, low to high</span>
                        <span onClick={( e ) => handleOnChangeFilter( e, "sortBys=salary&sortBys=desc" ) } className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">Salary, high to low</span>
                        <span onClick={( e ) => handleOnChangeFilter( e, "sortBys=createdAt&sortBys=asc" ) } className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">Created, old to new</span>
                        <span onClick={( e ) => handleOnChangeFilter( e, "sortBys=createdAt&sortBys=desc" ) } className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">Created, new to old</span>
                      </div>
                  </div>
                </InputSelect>
              </div>

              {/* Show Page */}
              <div className="mb-2" onClick={() => setShowPageFilter( !showPageFilter )}>
                <label className="block text-sm font-bold mb-2 cursor-pointer">Show</label>
                <InputSelect handleOnChangeFilter={ handleOnChangeFilter } width="w-[100px]" displayText={ showSelectionText } show={ showPageFilter } onClose={() => setShowPageFilter( false ) }>
                  <div id="show-page-size" className={`origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button ${ showPageFilter ? 'block' : 'hidden '}`}>
                    <div className="py-1" role="none">
                      <span onClick={( e ) => handleOnChangeFilter( e, null, 5 ) } className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">5</span>
                      <span onClick={( e ) => handleOnChangeFilter( e, null, 10 ) } className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">10</span>
                      <span onClick={( e ) => handleOnChangeFilter( e, null, 15 ) } className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">15</span>
                      <span onClick={( e ) => handleOnChangeFilter( e, null, 25 ) } className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">25</span>
                      <span onClick={( e ) => handleOnChangeFilter( e, null, 30 ) } className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">30</span>
                    </div>
                  </div>
                </InputSelect>
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
        <UserTable lists={ userListData?.data?.users || [] } />

        <Pagination countPerPage={ showSelectionText } updatePage={ updatePage } currentPage={ userListData?.data?.currentPage } totalPage={ userListData?.data?.totalPage }/>
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
