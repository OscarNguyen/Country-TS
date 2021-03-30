import React, { useContext, useState } from 'react';
import { Input, Drawer, List, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemIcon, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Badge from '@material-ui/core/Badge';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { AppState } from '../../types';
import { removeProduct } from '../../redux/actions/cart';
import { getDataSuccess } from '../../redux/actions/product';
import { ThemeContext } from '../../themes/themes';
import { BLUE_BACKGROUND, WHITE } from '../../constants/Color';

const useStyles = makeStyles((theme) => ({
  search: {
    width: '25%',
    alignSelf: 'center'
  },

  underline: {
    '&:before,&:after': {
      borderBottomColor: WHITE,
    }
  },

  root: {
    padding: '16px 8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    width: '100%',
    zIndex: 3,
  },

  rootDrawer: {
    minWidth: '300px',
    textAlign: 'center',
    height: '100vh',
    '& > p': {
      margin: 'auto'
    }
  },

  iconContainer: {
    alignSelf: 'flex-end',
  },

  icon: {
    margin: '0 16px ',
  },

  headerDrawer: {
    textAlign: 'center',
    display: 'flex',
  }
}));

type HeaderProps = {
  onGetKeyWord: (searchWord: string) => void,
  isHomePage: boolean
}

const Header: React.FC<HeaderProps> = ({ onGetKeyWord, isHomePage }) => {
  const classes = useStyles();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const quantity = useSelector((state: AppState) => state.cart.quantity);
  const productsCart = useSelector((state: AppState) => state.cart.items);
  const productsArray = useSelector((state: AppState) => state.product.items);
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const resetStateOfAddButton = (name: String) => {
    const nextState = productsArray.map(product => {
      if (name !== product.name) {
        return product;
      }
      return { ...product, added: false }
    });
    dispatch(getDataSuccess(nextState));
  }

  return (
    <div className={classes.root} style={{ backgroundColor: theme.headerBackground, color: theme.headerColor, boxShadow: theme.boxShadow }}>
      {isHomePage ?
        <Input
          placeholder="Search..."
          className={`${classes.search} ${classes.underline}`}
          onChange={(e) => {
            onGetKeyWord(e.target.value);
          }}
          style={{ color: theme.headerColor }}
        /> : <h1>Country</h1>}

      <div style={{ display: 'inherit' }} >
        <div style={{ display: 'inline-block' }} onClick={() => {
          toggleTheme();
        }}>
          {theme.headerBackground === BLUE_BACKGROUND ? <Brightness4Icon style={{ cursor: 'pointer' }} /> : <BrightnessHighIcon style={{ cursor: 'pointer' }} />}
        </div>

        <div onClick={() => setIsDrawerOpen(!isDrawerOpen)} className={classes.icon} style={{ display: 'inline-block' }}>
          <Badge color='primary' badgeContent={quantity} showZero>
            <ShoppingCartIcon style={{ cursor: 'pointer' }} />
          </Badge>
        </div>

        <Drawer PaperProps={{ className: classes.rootDrawer }} anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <div className={classes.headerDrawer}>
            <div style={{ lineHeight: '57.81px', marginRight: '10%' }}>
              <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={() => setIsDrawerOpen(false)} />
            </div>
            <h1 >Product Cart</h1>
          </div>
          <Divider />
          {productsCart.length === 0 ? <p>Cart Empty</p> : (
            <>
              <List>
                {productsCart! && productsCart!.map((item, index) => <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar src={item.flag} />
                  </ListItemAvatar>
                  <ListItemText>
                    {item.name}
                  </ListItemText>
                  <ListItemIcon onClick={() => {
                    dispatch(removeProduct(item.name));
                    resetStateOfAddButton(item.name);
                  }}>
                    <HighlightOffIcon style={{ cursor: 'pointer' }} />
                  </ListItemIcon>
                </ListItem>)}
              </List></>)}
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
