import React, { Component } from 'react';
import Tile from './Tile';
import Button from './Button';
import H6 from './H6';
import TileButtons from './TileButtons';
import { pad } from '../utils/pad';

export const TournamentItem = ({
  tournamentData,
  onClickEdit,
  onClickDelete
}) => {
  let formattedDate, day, month, year, time, hours, minutes, seconds;
  let startDate = new Date(tournamentData.get('startDate'));

  day = pad(startDate.getDay());
  month = pad(startDate.getMonth() + 1);
  year = startDate.getFullYear();
  hours = pad(startDate.getHours());
  minutes = pad(startDate.getMinutes());
  seconds = pad(startDate.getSeconds());

  return (
    <Tile>
      <H6>{tournamentData.get('name')}</H6>
      <div className="itemList">
        <ul>
          <li>Organizor: {tournamentData.get('organizer')}</li>
          <li>Game: {tournamentData.get('game')}</li>
          <li>
            Participants: {tournamentData.get('participants').get('current')} /{' '}
            {tournamentData.get('participants').get('max')}
          </li>
          <li>
            Start:{' '}
            {day +
              '/' +
              month +
              '/' +
              year +
              ' ' +
              hours +
              ':' +
              minutes +
              ':' +
              seconds}
          </li>
        </ul>
      </div>
      <TileButtons>
        <Button onClick={onClickEdit}>Edit</Button>
        <Button onClick={onClickDelete}>Delete</Button>
      </TileButtons>
    </Tile>
  );
};
