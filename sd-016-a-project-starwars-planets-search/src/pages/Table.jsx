import React, { useContext } from 'react';
import tableHeader from '../data/tableHeader';
import TableContext from '../context/TableContext';

const Table = () => {
  const { data, searchPlanet } = useContext(TableContext);

  const filteredPlanets = data
    .filter((planet) => planet.name.toLowerCase().includes(searchPlanet.toLowerCase()));

  return (
    <main>
      <table>
        <thead>
          <tr>
            {tableHeader.map((options, idx) => (<th key={ idx }>{ options }</th>))}
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet, idx) => (
            <tr key={ idx }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Table;
