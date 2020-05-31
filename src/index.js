import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import GlobalStyle from './GlobalStyle';
import store from './store';
import Container from './components/Container';
import H4 from './components/H4';
import Input from './components/Input';
import Button from './components/Button';
import TournamentsView from './components/TournamentsView';
import SearchComponent from './components/SearchComponent';

const App = () => {
  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      {/*<SearchComponent />*/}
      {/*<Button>Create Tournament</Button>*/}
      <TournamentsView />
    </Container>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('root')
);
