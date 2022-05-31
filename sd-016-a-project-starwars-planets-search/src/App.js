import React from 'react';
import Header from './components/Header';
import Table from './pages/Table';
import TableProvider from './context/TableProvider';

function App() {
  return (
    <TableProvider>
      <Header />
      <Table />
    </TableProvider>
  );
}

export default App;
