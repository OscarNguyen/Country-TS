import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {CountryDataType} from '../types';

function useCountry():([CountryDataType[],Error|null]){
  const [data, setData] = useState<CountryDataType[]>([]);
  const [error, setError] = useState<Error|null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios('https://restcountries.eu/rest/v2/all');
        setData(result.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return [data, error];
};

export default useCountry;
