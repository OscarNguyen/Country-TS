import React from 'react';
import { WHITE, BLACK, BLUE_BACKGROUND } from '../constants/Color';
export const themes = {
  light: {
    headerBackground: BLUE_BACKGROUND,
    headerColor: WHITE,
    contentBackground: WHITE,
    contentColor: BLACK,
    borderBottomColor: '',
    boxShadow: 'rgb(214 214 214) 0px 0px 7px 6px',
    addIconColor: BLUE_BACKGROUND,
    color: BLACK,
  },

  dark: {
    headerBackground: '#333',
    headerColor: WHITE,
    color: WHITE,
    contentBackground: '#212121',
    contentColor: WHITE,
    boxShadow: ' 0px 0px 7px 6px #19191a',
    addIconColor: WHITE,
    borderBottomColor: '#3c3c3c'
  },
}

export const ThemeContext = React.createContext(
  {
    theme: themes.dark,
    toggleTheme: () => { }
  }
)