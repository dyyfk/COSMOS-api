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
        firstName: '',
        isLoaded: false,
        items: []
    };


    change = e => {
        // this.props.onChange({ [e.target.name]: e.target.value });
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        this.getAPI(this.state.firstName);
        this.props.onSubmit({
            items: this.state.items
        });
        this.setState({
            isLoaded: false,
            firstName: '',
        });

    };
    getAPI = async (term) => {
        const url = "https://geodeepdive.org/api/snippets?term=" + term + "&article_limit=100";

        const res = await fetch(url);
        const json = await res.json();
        this.setState({
            isLoaded: true,
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
                    name='firstName'
                    id="standard-with-placeholder"
                    label="Enter your name"
                    placeholder="First name"
                    margin="normal"
                    value={this.state.firstName}
                    onChange={e => this.change(e)}
                />

                <Button style={butStyle} variant="contained" color="primary" type='submit' onClick={e => this.onSubmit(e)}><FontAwesomeIcon icon={faSearch} /> Search

                </Button>

                <div>{
                    this.state.isLoaded ? <FontAwesomeIcon icon={faSpinner} /> : null}
                </div>
            </form>

        );
    }


}