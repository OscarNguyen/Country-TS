import React, {useState,useEffect, SetStateAction, Dispatch} from 'react';

export default function useTheme(key:string):([string,Dispatch<SetStateAction<string | null>>]){
const[theme,setTheme] = useState(localStorage.getItem(key));

useEffect(()=>{
  if(theme){

    localStorage.setItem(key,theme!);
  }
},[theme]);
return [theme!,setTheme];
}