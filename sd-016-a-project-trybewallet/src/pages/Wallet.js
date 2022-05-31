import React from 'react';
import FormsWallet from '../components/FormsWallet';
import Header from '../components/Header';
import TableForms from '../components/TableForms';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <FormsWallet />
        <TableForms />
      </>
    );
  }
}

export default Wallet;
