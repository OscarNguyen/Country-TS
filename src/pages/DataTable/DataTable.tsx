import React, { useState, useEffect, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Link } from 'react-router-dom';

import { CountryDataType } from '../../types';
import { ThemeContext } from '../../themes/themes';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/actions/cart';
import { AppState } from '../../types';
import { getDataSuccess } from '../../redux/actions/product';
import { GRAY, WHITE } from '../../constants/Color';

const useStyles = makeStyles((theme) => ({
  lang: {
    marginBottom: '8px',
  },

  img: {
    width: '90px',
    height: '70px',
  },

  listItem: {
    listStyle: 'none',
  },

  thead: {
    background: GRAY,
  },

  loading: {
    textAlign: 'center',
    marginTop: '200px',
    position: 'absolute',
    right: 0,
    left: 0
  },

  root: {
    marginTop: '64px',
    position: 'relative',
  }
}));

interface DataTableProps {
  keyword?: string,
}

type CustomTableCellProps = {
  children: React.ReactNode,
}

const DataTable: React.FC<DataTableProps> = ({ keyword }) => {
  const classes = useStyles();
  const [sortLabel, setSortLabel] = useState<'asc' | 'desc'>('asc');
  const [sortedData, setSortedData] = useState<CountryDataType[]>([]);
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const headerItems = ['Flag', 'Name', 'Languages', 'Population', 'Region', ''];

  const contentBackground = {
    background: theme.contentBackground, color: theme.contentColor,
    borderBottomColor: theme.borderBottomColor
  }

  const fetchedProduct = useSelector((state: AppState) => {
    if (state.product.items.length !== 0) {
      return state.product.items;
    }
  })

  const CustomTableCell: React.FC<CustomTableCellProps> = ({ children }) => (
    <TableCell style={contentBackground} align="center">
      {children}
    </TableCell>
  )

  const addToCart = (name: string) => {
    const nextState = fetchedProduct!.map(item => {
      if (name !== item.name) {
        return item;
      }
      return { ...item, added: !item.added }
    });

    setSortedData(nextState);
    dispatch(getDataSuccess(nextState));
  }

  const onSort = (type: string, direction: string) => {
    let updatedData;
    if (type === 'languages') {
      updatedData = sortedData!.sort((a, b) => {
        if (direction === 'asc') {
          setSortLabel('desc');
          if (a['flag'] < b['flag']) {
            return -1;
          } else if (a['flag'] > b['flag']) {
            return 1;
          } else {
            return 0;
          }
        } else {
          setSortLabel('asc');
          if (a['flag'] < b['flag']) {
            return 1;
          } else if (a['flag'] > b['flag']) {
            return -1;
          } else {
            return 0;
          }
        }
      });
    } else {
      updatedData = sortedData!.sort((a, b) => {
        if (direction === 'asc') {
          setSortLabel('desc');
          if (a[type] < b[type]) {
            return -1;
          } else if (a[type] > b[type]) {
            return 1;
          } else {
            return 0;
          }
        } else {
          setSortLabel('asc');
          if (a[type] < b[type]) {
            return 1;
          } else if (a[type] > b[type]) {
            return -1;
          } else {
            return 0;
          }
        }
      });
    }
    setSortedData(updatedData);
  };

  useEffect(() => {
    let filteredData =
      keyword === null
        ? fetchedProduct
        : (fetchedProduct && keyword)
        && fetchedProduct!
          .filter((item) => item.name.toLowerCase().includes(keyword!.toString().toLowerCase()));

    if (!filteredData) {
      setSortedData(fetchedProduct!);
    } else {
      setSortedData(filteredData!);
    }
  }, [keyword, fetchedProduct]);

  return (
    <>
      {sortedData ? (
        <TableContainer component={Paper}>
          <Table className={classes.root} stickyHeader={true}>
            <TableHead className={classes.thead}>
              <TableRow>
                {headerItems.map((item) => (
                  <CustomTableCell key={item ? item : 'flag'}>
                    {item}
                    {item && <TableSortLabel
                      direction={sortLabel}
                      onClick={() => {
                        onSort(item.toLowerCase(), sortLabel);
                      }}
                    ></TableSortLabel>}
                  </CustomTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((item) => (
                <TableRow key={item.name}>
                  <CustomTableCell>
                    <img src={item.flag} alt={item.name} style={{ boxShadow: theme.boxShadow }} className={classes.img} />
                  </CustomTableCell>
                  <CustomTableCell><Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/countries/name/${item.name.toLowerCase()}`}>{item.name}</Link></CustomTableCell>
                  <CustomTableCell>
                    <ul>
                      {item.languages.map((item) => (
                        <li key={item.name} className={classes.listItem}>
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </CustomTableCell>
                  <CustomTableCell>{item.population}</CustomTableCell>
                  <CustomTableCell>{item.region}</CustomTableCell>
                  <CustomTableCell>
                    {item.added ? <CheckCircleIcon style={{ cursor: 'default' }} color={theme.contentBackground === WHITE ? 'disabled' : 'action'} />
                      : <AddCircleIcon
                        onClick={() => {
                          addToCart(item.name);
                          dispatch(addProduct(item));
                        }}
                        style={{ color: theme.addIconColor, cursor: 'pointer' }} />}
                  </CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>) : (
        <LinearProgress className={classes.loading} />
      )}
    </>
  );
};

export default DataTable;
