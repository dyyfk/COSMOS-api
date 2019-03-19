import React, { Component } from 'react';
import './App.css';
import Form from './form';
import logo from './img/color-UWcrest-print.png'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMeteor } from '@fortawesome/free-solid-svg-icons'

class App extends Component {

  state = {
    fields: {},
    open: []
  };
  onSubmit = updated => {
    this.setState({ fields: updated });
  };

  // handleClick = i => {
  //   this.setState(state => ({ open[i]: !state.open[i] }));
  // };

  format = (data) => {

    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>pubname</TableCell>
              <TableCell>Publisher</TableCell>
              {/* <TableCell>_gddid</TableCell> */}
              <TableCell>Title</TableCell>
              <TableCell>Cover Date</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Authors</TableCell>
              <TableCell>Hits</TableCell>
              <TableCell>Highlight</TableCell>
            </TableRow>
          </TableHead>

          {data.map((datum, index) => {
            return (
              <TableBody key={datum._gddid}>
                <TableCell >{index}</TableCell>
                <TableCell>{datum.pubname}</TableCell>
                <TableCell>{datum.publisher}</TableCell>
                {/* <TableCell>{datum._gddid}</TableCell> */}
                <TableCell>{datum.title}</TableCell>
                <TableCell>{datum.coverDate}</TableCell>
                <TableCell><a href={datum.URL} target='_blank'>{datum.URL}</a></TableCell>
                <TableCell>{datum.authors}</TableCell>
                <TableCell>{datum.hits}</TableCell>
                <TableCell>
                  <List >

                    {!datum.highlight ? null : datum.highlight.map((hl, i) => {
                      return <ListItem key={i}> {i} <ListItemText primary={hl} /></ListItem>;
                    })}
                  </List>
                </TableCell>

              </TableBody>
            )
          })}


        </Table>
      </Paper>


    )
  }



  render() {
    const form = <Form onSubmit={fields => this.onSubmit(fields)}> </Form>;
    let data;

    if (this.state.fields.items) {
      if (this.state.fields.items.success) {
        if (this.state.fields.items.success.data.length > 0)
          data = this.format(this.state.fields.items.success.data);
        else
          data = 'Nothing found, try something else'
      }
    }


    return (
      <div className="App">
        <header>
          <h1>COSMOS <FontAwesomeIcon icon={faMeteor} /> </h1>
          <div>
            <p>
              <span>University of Wisconsin-Madison &nbsp;</span>
              <br />Department of Astronomy
            </p>
            <img src={logo} />
          </div>



        </header>
        {form}
        {data}
        <p>
        </p>
      </div>
    );
  }
}

export default App;
