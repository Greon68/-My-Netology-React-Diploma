import { useEffect, useState } from "react";
import { BASE_URL } from "../config/api";

export const useGetFetch = ( path='/') => {
    const[data, setData]= useState('');
    const[loading, setLoading]= useState(false);
    const[error, setError]=useState('');

    const fetchData = async ()=> {
        setLoading(true);
        setError('');
        try {
          const response = await fetch (BASE_URL + path);
          
          const result = await response.json();

        //   console.log('useGetFetch result: ', result);

          if(response.status > 399){
            throw result
          }

          setData(result)

        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

  
    return[data, loading, error]

}

