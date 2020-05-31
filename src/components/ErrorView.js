import { connect } from 'react-redux';
import React, { Component } from 'react';
import {fetchTournaments} from '../store';

export const ErrorView = () => {
  return (
    <div>Something went wrong. Add retry button here</div>
  );
}