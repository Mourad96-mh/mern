import React, {useState, useEffect} from 'react';

import UsersList from '../components/UsersList';
import Spinner from '../../shared/components/UIElements/spinner';
import useHttpClient from '../../shared/hooks/http-hook';

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const {isLoading, error, sendRequest} = useHttpClient();
  useEffect(()=> {
    const fetchRequest = async()=> {
      try{
        const responseData = await sendRequest('http://localhost:5000/api/users')
        setLoadedUsers(responseData.users);
      }catch(err){
      }
    }
    fetchRequest();
  }, [sendRequest])


  return (
    <>
    {isLoading && <Spinner/>}
    {error && <p>{error}</p>}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
};

export default Users;
