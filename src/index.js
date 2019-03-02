import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from './Spinner';

class App extends React.Component {
  // ONLY TIME WE DIRECTLY CHANGE STATE (Initializing)
  state = { lat: null, errorMessage: '' };

  // LifeCycle Method - DataLoading initial
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        // We called setState to update
        this.setState({ lat: position.coords.latitude });
      },
      err => {
        this.setState({ errorMessage: err.message });
      }
    );
  }

  // Helper function
  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />
    }

    return <Spinner message="Please accept location request..." />;
  }

  // React says we have to define render!!
  render() {
    return (
      <div className="border red">
        {this.renderContent()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
