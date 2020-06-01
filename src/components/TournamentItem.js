import React from 'react';
import Tile from './Tile';
import TileButton from './TileButton';
import { pad } from '../utils/pad';
import TileButtonsHolder from './TileButtonsHolder';
import TournamentTitle from './TournamentTitle';

export const TournamentItem = ({
  tournamentData,
  onClickEdit,
  onClickDelete
}) => {
  let formattedDate, day, month, year, hours, minutes, seconds;
  let startDate = new Date(tournamentData.get('startDate'));

  day = pad(startDate.getDay());
  month = pad(startDate.getMonth() + 1);
  year = startDate.getFullYear();
  hours = pad(startDate.getHours());
  minutes = pad(startDate.getMinutes());
  seconds = pad(startDate.getSeconds());
  formattedDate =
    ' ' +
    day +
    '/' +
    month +
    '/' +
    year +
    ' ' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds;

  return (
    <Tile>
      <TournamentTitle>{tournamentData.get('name')}</TournamentTitle>
      <div
        className="itemList"
        style={{ display: 'flex', justifyContent: 'flex-start' }}
      >
        <ul style={{ listStyleType: 'none', paddingLeft: '15px' }}>
          <li>Organizor: {tournamentData.get('organizer')}</li>
          <li>Game: {tournamentData.get('game')}</li>
          <li>
            Participants: {tournamentData.get('participants').get('current')} /{' '}
            {tournamentData.get('participants').get('max')}
          </li>
          <li>Start:{formattedDate}</li>
        </ul>
      </div>
      <TileButtonsHolder>
        <TileButton onClick={onClickEdit}>Edit</TileButton>
        <TileButton onClick={onClickDelete}>Delete</TileButton>
      </TileButtonsHolder>
    </Tile>
  );
};
