import React, {Component} from 'react';

class Page extends Component {
    constructor(props){
        super(props);
        this.state ={};
    }
render() {
    return (
      <div className="Navbar">
        <ul>
          <li>Home</li>
          <li>Contact</li>
          <li>Galery</li>
        </ul>
        <h2>{this.props.mensaje}</h2>

      </div>
    );
  }
}

export default Page