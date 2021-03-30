import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, CardContent, Button, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import Header from '../Header/Header';
import { AppState } from '../../types';
import { ThemeContext } from '../../themes/themes';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '18%',
    padding: '1rem 0',
    boxShadow: 'rgb(214 214 214) 0px 0px 7px 6px',
    margin: '10rem 0',
    color: 'gray',
  },

  mdCard: {
    width: '39%',
    margin: '22% 32%',
    padding: '2% 0',
    lineHeight: 2,
  },

  smCard: {
    width: '83%',
    margin: '22% 9%',
    padding: '2% 0',
    lineHeight: 2,
  },

  smMdContent: {
    margin: '0 6%',
    color: 'gray',
  },

  boxContent: {
    display: 'flex',
    justifyContent: 'center',
  },

  listContainer: {
    listStyle: 'none'
  },

  noDash: {
    marginLeft: '2rem',
  },

  content: {
    margin: '0 12%',
  },

  img: {
    width: '100%',
    boxShadow: 'rgb(214 214 214) 0px 0px 7px 6px'
  },

  imgContainer: {
    textAlign: 'center'
  },

  buttonContainer: {
    textAlign: 'center'
  }
}));

type ParamsType = {
  name: string
}

const Country = () => {
  let history = useHistory();
  const { theme } = useContext(ThemeContext);
  const { name } = useParams<ParamsType>();
  const themeMUI = useTheme();

  const products = useSelector((state: AppState) => state.product.items);
  const product = products.filter(item => item.name.toLowerCase() === name)[0];

  const mdMatch = useMediaQuery(themeMUI.breakpoints.down('md'));
  const smMatch = useMediaQuery(themeMUI.breakpoints.down('sm'));
  const classes = useStyles();

  return (
    <>
      <Header isHomePage={false} onGetKeyWord={() => { }} />
      <div className={classes.boxContent}>
        <Card className={(smMatch ? classes.smCard : classes.card) || (mdMatch ? classes.mdCard : classes.card)} style={{ backgroundColor: theme.contentBackground }} variant="outlined">
          <CardContent className={smMatch || mdMatch ? classes.smMdContent : classes.content}>
            <ul className={`${classes.listContainer}`}>
              <li className={classes.imgContainer}><img alt="Country Flag" className={classes.img} style={{ boxShadow: theme.boxShadow }} src={product.flag} /></li>
              <div>
                <li>{product.name}</li>
                <li>Capital: {product.capital}</li>
                <li>Population: {product.population}</li>
                <li>Languages:<ul className={classes.noDash}> {product.languages.map(item => <li key={item.name}>{item.name}</li>)}</ul></li>
                <li>Region: {product.region}</li>
              </div>
            </ul>
            <div className={classes.buttonContainer}>
              <Button variant='text' color='primary' onClick={() => history.push('/')}>Back</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Country;
