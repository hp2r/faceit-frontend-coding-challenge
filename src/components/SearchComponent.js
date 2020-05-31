import { connect } from 'react-redux';
import React, { Component } from 'react';
import {fetchTournaments, editTournament, deleteTournament} from '../store';
import {ErrorView} from './ErrorView';
import {TournamentItem} from './TournamentItem';
import Input from './Input';
import store from '../store';

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {search: ''}
  }

  componentDidMount() {

  }

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0, 20)})
  }

  render() {
    let {tournaments, isError} = this.props;
    /*
    let filteredTournaments = tournamentsArray.filter(
      (tournament) => {
        return tournament.get('name').includes(this.state.search) !== -1; 
      }
    );
    */
    //let filteredTournaments = tournaments.filter(tour => tour.get('name').includes(this.state.search))

    return (
      <div>
        <Input defaultValue="Search Tournament"
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
        ></Input>

        <ul /*style={ulStyle}*/>
            {tournaments.map(tournament =>
              <TournamentItem //onClickEdit={(e) => this.onEdit(tournament, e)}
                              //onClickDelete={(e) => this.onDelete(tournament, e)}
                              tournamentData={tournament}
                              key={tournament.get('id')}
            />)}
        </ul>
      </div>
    );
  }

}

export default connect((state) => ({
  tournaments: state.tournaments,
  isError: state.fetchError
}))(SearchComponent);