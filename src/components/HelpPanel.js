import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import CodeEditor from './CodeEditor';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const Wrapper = styled(Paper)`
  width: 31%;
  height: 80vh;
  margin: 12px;
  border: ${props => (props.inFocus ? '2px solid #33dddd' : '')};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.p`
  margin: 7px;
`;

const styles = theme => ({
    cardHelp:{
        width:'100%',
        height:'2em',
        "font-size": '16px',
    }
});
let id = 0;
function createData(action, command) {
  id += 1;
  return { id, action, command};
}
    const htmlData = [
        createData('Go to HTML', 'HTML'),
        createData('Insert element', 'Create element [element name]'),
        createData('Add property', 'Set [property] to [value]'),
    ];
    const cssData = [
        createData('Go to CSS', 'CSS'),
        createData('Insert style', 'Create style for [id]'),
        createData('Add attribute', 'Set [attribute] to [value]'),
    ];
    const jsData = [
        createData('Go to JavaScript', 'Js'),
        createData('Insert listener', 'Create [type] listener to [id]'),
        createData('Add style logic', 'Set [property] to [value]'),
    ];

const HelpPanel = ({ classes, inFocus, label, mode, ...other }) => {
    const height = inFocus ? 15 : 2;
    let data = null;
    if(mode=="html"){
        data = htmlData;
    }else if(mode=="css"){
        data = cssData;
    }else{
        data = jsData;
    }
    return (
    <Wrapper elevation={height} inFocus={inFocus}>
        <Label>{label}</Label>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Command</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell component="th" scope="row">
                    {n.action}
                  </TableCell>
                  <TableCell>{n.command}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
    </Wrapper>
  );
};

export default withStyles(styles)(HelpPanel);
