import React from 'react';
import Button from './Button';

export const ErrorView = ({ onClickRetry }) => {
  return (
    <div>
      Something went wrong.
      <Button onClick={onClickRetry}>RETRY</Button>
    </div>
  );
};
