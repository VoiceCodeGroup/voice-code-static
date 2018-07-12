import React from 'react';
import Button from '@material-ui/core/Button';

export default ({ onClick, children }) => (
  <Button onClick={onClick} variant="contained" color="primary">
    {children}
  </Button>
);
