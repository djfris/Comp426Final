import Game from './Components/Game';
import React, { Component, useEffect, use } from "react";
import { render } from "react-dom";
import Wrapper from './Components/Layout/Wrapper';
import Main from './Components/Main';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {

      });
    }
  }

  

  render() {
    return (
      <Wrapper>
        <Main />
      </Wrapper>
    );
  }
}

render(<App />, document.getElementById("root"));


 App = () => <Game />;

export default App;