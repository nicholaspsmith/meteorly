import React, { Component } from 'react';

class LinkCreate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: ''
    }
  }
  handleSubmit(e) {
    e.preventDefault()

    const url = this.refs.input.value
    Meteor.call('links.insert', url, error => {
      if (error) {
        this.setState({ error: "Please enter a valid URL" })
      } else {
        this.setState({ error: '' })
        this.refs.input.value = ''
      }
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label>Link to shorten</label>
          <input ref="input" type="text" className="form-control"/>
        </div>
        <div className="text-danger">{this.state.error}</div>
        <button className="btn btn-primary">go!</button>
      </form>
    );
  }
}

export default LinkCreate
