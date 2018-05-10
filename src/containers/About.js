import React, { Component } from 'react';

export default class Fetch extends Component {
  state = { data: "This is what we're all about" };

  constructor(props) {
    super(props);
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(json => this.hasData('Hi'));
  }
  hasData = data => {
    this.setState({ data });
  };

  render() {
    console.log(this.state.data);
    return (
      <div>
        <h1>{this.state.data}</h1>
        <p>React, static sites, performance, speed. It's the stuff that makes us tick.</p>
      </div>
    );
  }
}
