import React, { Component } from 'react';
import Title from './Title';
import MissionCard from './MissionCard';
import missions from '../data/missions';
import '../style/main.css';

class Missions extends Component {
  render() {
    return (
      <div data-testid="missions" className="container">
        <Title headline="Missões" />
        <div className="container-missions">
          {missions.map((mission) => (
            <MissionCard
              key={ mission.name }
              name={ mission.name }
              year={ mission.year }
              country={ mission.country }
              destination={ mission.destination }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Missions;
