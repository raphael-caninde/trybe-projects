import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';
import getPlanets from '../services/starWarsAPI';
import columnOptions from '../data/columnOptions';

const TableProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [searchPlanet, setSearchPlanet] = useState('');
  const [column, setColumn] = useState('population');
  const [comparasion, setComparasion] = useState('maior que');
  const [values, setValues] = useState(0);
  const [selectColumn, setSelectColumn] = useState(columnOptions);

  const dataOptions = {
    data,
    setData,
    searchPlanet,
    setSearchPlanet,
    column,
    setColumn,
    comparasion,
    setComparasion,
    values,
    setValues,
    selectColumn,
    setSelectColumn,
  };

  useEffect(() => {
    (async () => {
      const result = await getPlanets();
      setData(result);
    })();
  }, []);

  return (
    <TableContext.Provider value={ dataOptions }>
      {children}
    </TableContext.Provider>
  );
};

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableProvider;

// como passar função assincrona no useEffect
// https://stackoverflow.com/questions/63570597/typeerror-func-apply-is-not-a-function
