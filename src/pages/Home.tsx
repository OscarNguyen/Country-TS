import React, { useState } from 'react'

import Header from './Header/Header';
import DataTable from './DataTable/DataTable';


export default function Home() {

  const [searchingKeyword, setSearchingKeyword] = useState<string>("");

  const getKeyword = (searchWord: string): void => {
    setSearchingKeyword(searchWord);
  };

  return (
    <>
      <Header isHomePage onGetKeyWord={getKeyword} />
      <DataTable keyword={searchingKeyword} />
    </>
  )
}
