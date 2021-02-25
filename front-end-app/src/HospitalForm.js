import React from 'react';

class HospitalForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: '', message: 'Your occupancy data will appear here'}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        var url = new URL("/get_occupancy"), params = {name: this.state.value}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        console.log(url)
        setTimeout(() => {
            fetch(url).then(res => res.json()).then(data => 
                {
                    this.setState(
                        {
                            message: data
                        }
                    );
                });
        }, 1500);
        alert("Data updated");
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <label>
                    Insert Hospital Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit" />
                </form>
                <p>
                    {this.state.message}
                </p>
            </div>
        );
    }
}

export default HospitalForm;