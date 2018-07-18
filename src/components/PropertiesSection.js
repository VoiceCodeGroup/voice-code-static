import React from 'react';
import Property from './Property';

const PropertiesSection = ({ properties = {} }) => {
  return (
    <React.Fragment>
      {Object.entries(properties).map(([key, value]) => {
        return <Property name={key} value={value} />;
      })}
    </React.Fragment>
  );
};

export default PropertiesSection;
