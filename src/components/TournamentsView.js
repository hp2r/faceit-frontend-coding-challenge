import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  fetchTournaments,
  editTournament,
  deleteTournament,
  createTournament
} from '../middlewares/TournamentsMiddleware';
import { ErrorView } from './ErrorView';
import { TournamentItem } from './TournamentItem';
import Input from './Input';
import Button from './Button';
import GridUL from './GridUL';
import TopPanel from './TopPanel';
import LoadingText from './LoadingText';

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
        <TopPanel>
          <Input
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          ></Input>
          <Button onClick={this.createATournament.bind(this)}>
            Create Tournament
          </Button>
        </TopPanel>
        <GridUL>
          {filteredTournaments.map(tournament => (
            <TournamentItem
              onClickEdit={e => this.onEdit(tournament, e)}
              onClickDelete={e => this.onDelete(tournament, e)}
              tournamentData={tournament}
              key={tournament.get('id')}
            />
          ))}
        </GridUL>
      </div>
    ) : (
      <div style={{ width: '100%' }}>
        <LoadingText>loading tournaments...</LoadingText>
      </div>
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
    if (editPrompt)
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
