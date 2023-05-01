import {useState, useCallback} from 'react';

const useHttpClient = (url, method = 'GET', body = null, headers = {})=> {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const sendRequest = useCallback(async ( ) => {
        setIsLoading(true);
        try{
            const response = fetch(url, {
                mode: 'no-cors',
                method,
                body,
                headers
            });

            const responseData = await response.json();
            if(!response.ok){
                throw new Error(responseData.message);
            }
            setIsLoading(false);
            return responseData;

        }catch( err){
            setError(err.message);
            setIsLoading(false);
            throw (err);
        }
    }, [url, body, method, headers])

    const clearError = ()=> {
        setError();
    }

    return (isLoading, error, sendRequest, clearError);
};


export default useHttpClient;
