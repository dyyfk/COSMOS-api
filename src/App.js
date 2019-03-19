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
    open: [],
    index: 10,
    formatted: null
  };
  onSubmit = updated => {
    this.setState({ fields: updated, index: 10 });


    if (this.state.fields.items) {
      if (this.state.fields.items.success) {
        if (this.state.fields.items.success.data.length > 0)
          this.setState({ formatted: this.format(this.state.fields.items.success.data) });
        else
          this.setState({ formatted: 'Nothing found, try something else' });
      }
    }
  };

  // handleClick = i => {
  //   this.setState(state => ({ open[i]: !state.open[i] }));
  // };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  isBottom(el) {
    if (el)
      return el.getBoundingClientRect().bottom <= window.innerHeight + 300; // this is when loading should happen
  }

  handleScroll = () => {

    const wrappedElement = document.getElementById('table');
    if (this.isBottom(wrappedElement)) {
      document.removeEventListener('scroll', this.handleScroll);
      this.state.index += 5;
    }
    this.setState({ formatted: this.format(this.state.fields.items.success.data) });
  }




  format = (data) => {
    let end = this.state.index;
    const formatted =
      data.map((datum, index) => {
        if (index < end) {
          return (
            <TableRow key={datum._gddid}>
              <TableCell >{index + 1}</TableCell>
              <TableCell>{datum.pubname}</TableCell>
              <TableCell>{datum.publisher}</TableCell>
              {/* <TableCell>{datum._gddid}</TableCell> */}
              <TableCell>{datum.title}</TableCell>
              <TableCell>{datum.coverDate}</TableCell>
              <TableCell><a href={datum.URL} target='_blank'>Link</a></TableCell>
              <TableCell>{datum.authors}</TableCell>
              {/* <TableCell>{datum.hits}</TableCell> */}
              <TableCell>
                <List>
                  {!datum.highlight ? null : datum.highlight.map((hl, i) => {
                    return <ListItem key={i}><ListItemText primary={hl} /></ListItem>;
                  })}
                </List>
              </TableCell>
            </TableRow >
          )


        } else {
          return null;
        }

      })
    return (
      <Paper id="table" >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Publication Name</TableCell>
              <TableCell>Publisher</TableCell>
              {/* <TableCell>_gddid</TableCell> */}
              <TableCell>Title</TableCell>
              <TableCell>Cover Date</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Authors</TableCell>
              {/* <TableCell>Hits</TableCell> */}
              <TableCell>Highlight(Hits)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formatted}
          </TableBody>

        </Table >
      </Paper >
    )
  }



  render() {
    const form = <Form onSubmit={fields => this.onSubmit(fields)}> </Form>;

    return (
      <div className="App" >
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
        {this.state.formatted}

      </div>
    );
  }
}

export default App;
