import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore({ history }) {
  return (
    <div>
      <Header title="Explore" haveSearch={ false } get="a" />
      <div>
        <button
          data-testid="explore-foods"
          type="button"
          onClick={ () => history.push('/explore/foods') }
        >
          Explore Foods
        </button>
        <button
          data-testid="explore-drinks"
          type="button"
          onClick={ () => history.push('/explore/drinks') }
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </div>
  );
}

Explore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Explore;
