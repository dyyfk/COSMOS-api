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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMeteor, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'


import moment from 'moment';
import orderBy from 'lodash/orderBy';

const invertDic = {
  asc: 'desc',
  desc: 'asc'
}

class App extends Component {

  state = {
    fields: {},
    open: [],
    index: 10,
    formatted: null,
    columnToSort: null,
    sortDirection: 'desc'
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
      this.setState({
        index: this.state.index + 5
      })
    }
    this.setState({ formatted: this.format(this.state.fields.items.success.data) });
  }

  handleSort = columnName => {
    this.setState({
      sortDirection:
        this.state.columnToSort === columnName ? invertDic[this.state.sortDirection] : 'asc'
    });
    this.state.columnToSort = columnName; // TODO: this hack forces a sync call
  }


  format = (data) => {
    let end = this.state.index;
    data.forEach(element => {
      element.coverDate = moment(element.coverDate).format('YYYY/MM');
    });
    data = orderBy(data, [this.state.columnToSort], [this.state.sortDirection]);

    let formatted =
      data.map((datum, index) => {
        if (index < end) {
          return (
            <TableRow key={datum._gddid}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{datum.pubname}</TableCell>
              <TableCell>{datum.publisher}</TableCell>
              {/* <TableCell>{datum._gddid}</TableCell> */}
              <TableCell>{datum.title}</TableCell>
              <TableCell>{datum.coverDate}</TableCell>
              <TableCell><a href={datum.URL} rel="noopener noreferrer" target='_blank'>Link</a></TableCell>
              <TableCell>{datum.authors}</TableCell>
              {/* <TableCell>{datum.hits}</TableCell> */}
              <TableCell>
                <List>
                  {!datum.highlight ? null : datum.highlight.map((hl, i) => {
                    return <ListItem key={i}><ListItemText primary={hl} /></ListItem>;
                  })}
                </List>
              </TableCell>
            </TableRow>
          )


        } else {
          return null;
        }

      })

    const header = [
      ['pubname', 'Publication'],
      ['publisher', 'Publisher'],
      ['title', 'Title'],
      ['coverDate', 'Date'],
      ['URL', 'URL'],
      ['authors', 'Authors'],
      ['hits', 'Highlight(Hits)']
    ]
    return (
      <Paper id="table" >
        <Table>
          <colgroup>
            <col style={{ width: '5%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '5%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '20%' }} />
          </colgroup>

          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              {header.map((dict, i) => {
                return <TableCell key={dict[0]} onClick={
                  () => {
                    this.handleSort(dict[0]);
                    this.setState({
                      formatted: this.format(this.state.fields.items.success.data)
                    });
                  }} >
                  {dict[1]}&nbsp;{dict[0] === this.state.columnToSort ? (this.state.sortDirection === 'asc' ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />) : null}</TableCell>
              })}

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
            <img src={logo} alt="UW-Madison logo" />
          </div>

        </header>
        {form}
        {this.state.formatted}

      </div>
    );
  }
}

export default App;
