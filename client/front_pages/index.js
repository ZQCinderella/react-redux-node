/*
 * Created by sheng.yu on 2018-05-01 01:43:37. 
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './sass/index.scss';

class Hello extends Component {
  constructor(props) {
    super(props);
    fetch('/api/user').then( response => {
      return response.json();
    }).then( json => {
      console.log(json);
    });
    console.log('constructor');
  }
  render() {
    console.log('father');
    return (
      <div className="main-div">哈</div>
    );
  }
}

ReactDOM.render(<Hello />, document.getElementById('main'));

