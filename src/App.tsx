import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'

import Routes from './Routes'
import { FETCH_PRODUCT, AppState } from './types';
import { themes, ThemeContext } from './themes/themes';

export default function App() {
  const dispatch = useDispatch();
  const productState = useSelector((state: AppState) => state.product.items);

  const loadTheme = () => {
    const theme = localStorage.getItem('theme');
    if (!theme) {
      return undefined;
    }
    return JSON.parse(theme);
  }

  const [context, setContext] = useState({
    theme: loadTheme() ? loadTheme() : themes.light,
    toggleTheme: () => {
      setContext(prev => {
        localStorage.setItem('theme', JSON.stringify(prev.theme === themes.light ? themes.dark : themes.light));
        return ({
          ...prev,
          theme: prev.theme === themes.light ? themes.dark : themes.light
        })
      }
      )
    }
  })

  useEffect(() => {
    if (productState.length === 0) {
      dispatch({ type: FETCH_PRODUCT });
    }
  }, [productState.length, dispatch])

  return (
    <ThemeContext.Provider value={context}>
      <Routes />
    </ThemeContext.Provider>
  )
}
