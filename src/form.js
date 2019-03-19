import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const butStyle = {
    marginLeft: '5px',
    verticalAlign: 'bottom'
}

export default class Form extends React.Component {

    state = {
        searchTerm: '',
        isLoaded: null,
        items: [],
        error: false
    };


    change = e => {
        // this.props.onChange({ [e.target.name]: e.target.value });
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        if (this.state.searchTerm.trim().length === 0) {
            this.setState({
                error: true
            });
            return;
        } else {
            this.setState({
                error: false
            });
        }

        this.getAPI(this.state.searchTerm);

        this.setState({
            isLoaded: false,
            searchTerm: '',
        });
    };
    getAPI = async term => {
        const url = "https://geodeepdive.org/api/snippets?term=" + term + "&article_limit=100";

        const res = await fetch(url);
        const json = await res.json();
        this.setState({
            isLoaded: true,
            items: json
        });
        this.props.onSubmit({
            items: json
        });


        // fetch(url)
        //     .then(res => res.json())
        //     .then(json => {
        //         this.setState({
        //             isLoaded: true,
        //             items: json
        //         });
        //     });
    }

    render() {
        return (
            <form>
                <TextField

                    required
                    error={this.state.error ? true : null}
                    name='searchTerm'
                    id={this.state.error ? "standard-error" : "standard-with-placeholder"}
                    label={!this.state.error ? "Search in archive" : 'Input cannot be empty'}
                    placeholder="Go Badger !"
                    margin="normal"
                    value={this.state.searchTerm}
                    onChange={e => this.change(e)}
                />

                <Button style={butStyle} variant="contained" color="primary" type='submit' onClick={e => this.onSubmit(e)}><FontAwesomeIcon icon={faSearch} /> Search &nbsp;
                {this.state.isLoaded === false ? <FontAwesomeIcon icon={faSpinner} /> : null}
                </Button>

                <div>
                </div>
            </form>

        );
    }


}