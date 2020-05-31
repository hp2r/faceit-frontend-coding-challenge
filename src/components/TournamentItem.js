import React, { Component } from 'react';
import Tile from './Tile';
import Button from './Button';
import H4 from './H4';
import TileButtons from './TileButtons';

export const TournamentItem = ({tournamentData, onClickEdit, onClickDelete}) => {
  return (
    <Tile>
      <H4>{tournamentData.get('name')}</H4>
      <TileButtons>
        <Button onClick={onClickEdit}>Edit</Button><Button onClick={onClickDelete}>Delete</Button>
      </TileButtons>
    </Tile>
  );
}