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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMeteor } from '@fortawesome/free-solid-svg-icons'
class App extends Component {

  state = {
    fields: {},
  };
  onSubmit = updated => {
    this.setState({ fields: updated });
  };

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
              {/* <TableCell>highlight</TableCell> */}
            </TableRow>
          </TableHead>

          {data.map((datum, index) => {
            return (
              <TableBody key={datum._gddid}>
                <TableCell>{index}</TableCell>
                <TableCell>{datum.pubname}</TableCell>
                <TableCell>{datum.publisher}</TableCell>
                {/* <TableCell>{datum._gddid}</TableCell> */}
                <TableCell>{datum.title}</TableCell>
                <TableCell>{datum.coverDate}</TableCell>
                <TableCell><a href={datum.URL} target='_blank'>{datum.URL}</a></TableCell>
                <TableCell>{datum.authors}</TableCell>
                <TableCell>{datum.hits}</TableCell>
                {/* <TableCell>{datum.highlight ? null : datum.hightlight.forEach((hl) => {
                  return hl; //bugs
                })}</TableCell> */}

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
              <span>University of Wisconsin-Madison</span>
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
