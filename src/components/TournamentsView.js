import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  fetchTournaments,
  editTournament,
  deleteTournament,
  createTournament
} from '../store';
import { ErrorView } from './ErrorView';
import { TournamentItem } from './TournamentItem';
import store from '../store';
import Input from './Input';
import Button from './Button';

class TournamentsView extends Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
  }

  componentDidMount() {
    this.props.dispatch(fetchTournaments());
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  render() {
    let { tournaments, isError } = this.props;

    const ulStyle = {
      display: 'grid',
      gridGap: '4px',
      gridTemplateColumns: 'auto auto auto'
    };

    let filteredTournaments =
      tournaments.size > 1
        ? tournaments.filter(tourney =>
            tourney
              .get('name')
              .toLowerCase()
              .includes(this.state.search.toLowerCase())
          )
        : '';

    return isError ? (
      <ErrorView onClickRetry={e => this.onRetry(e)} />
    ) : tournaments.size > 1 ? (
      <div>
        <Input
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
        ></Input>
        <Button onClick={this.createATournament.bind(this)}>
          Create Tournament
        </Button>
        <ul style={ulStyle}>
          {filteredTournaments.map(tournament => (
            <TournamentItem
              onClickEdit={e => this.onEdit(tournament, e)}
              onClickDelete={e => this.onDelete(tournament, e)}
              tournamentData={tournament}
              key={tournament.get('id')}
            />
          ))}
        </ul>
      </div>
    ) : (
      <div>loading tournaments...</div>
    );
  }

  onRetry() {
    this.props.dispatch(fetchTournaments());
  }

  createATournament() {
    let createPrompt = window.prompt('Tournament Name:');
    this.props.dispatch(createTournament(createPrompt));
  }

  onEdit(tournamentData) {
    let editPrompt = window.prompt(
      'New Tournament Name:',
      tournamentData.get('name')
    );
    this.props.dispatch(editTournament(tournamentData.get('id'), editPrompt));
  }

  onDelete(tournamentData) {
    let deletePrompt = window.confirm(
      'Do you really want to delete this tournament?'
    );
    if (deletePrompt)
      this.props.dispatch(deleteTournament(tournamentData.get('id')));
  }
}

export default connect(state => ({
  tournaments: state.tournaments,
  isError: state.fetchError
}))(TournamentsView);
