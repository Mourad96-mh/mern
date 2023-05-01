import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import useHttpClient from '../../shared/hooks/http-hook';
import Spinner from '../../shared/components/UIElements/spinner';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const userId = useParams().userId;
  const {isLoading, error, sendRequest} = useHttpClient();

  useEffect(()=> {

    const fetchRequest = async ()=> {
      try{
        const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
        setLoadedPlaces(responseData.places);
      }catch(err){}
    }
    fetchRequest();
  }, [sendRequest, userId])

  const deletePlaceHandler = (placeId) => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== placeId));
  }

  return (
    <>
    {isLoading && <Spinner/>}
    {error && <p>{error.message}</p>}
      <PlaceList items={loadedPlaces} onDeletePlace={deletePlaceHandler}/>
    </>
  )
};

export default UserPlaces;
