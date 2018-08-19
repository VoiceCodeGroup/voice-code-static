import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Property from './Property';

const styles = {
  tabletitle: {
    fontSize: '14pt'
  },
  tablecell: {
    fontSize: '11pt',
    height: 10
  }
};

const PropertiesSection = ({ classes, properties = {} }) => {
  return (
    <Table style={{ width: '70%' }}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.tabletitle}>Properties</TableCell>
          <TableCell className={classes.tabletitle}>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {properties.map(([key, value], id) => {
          return (
            <TableRow key={id} className={classes.tablecell}>
              <TableCell component="th" scope="row" className={classes.tablecell}>
                {key}
              </TableCell>
              <TableCell className={classes.tablecell}>{value}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default withStyles(styles)(PropertiesSection);
{
  /* <React.Fragment>
{Object.entries(properties).map(([key, value]) => {
  return <Property name={key} value={value} />;
})}
</React.Fragment> */
}
