import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Confirm from "../Confirm/Confirm";

interface IState {
  confirmOpen: boolean;
  confirmMessage: string;
  confirmVisible: boolean;
  countDown: number;
}

class App extends Component<{}, IState> {
  public static getDerivedStateFromProps(props: {}, state: IState) {
    console.log("getDerivedStateFromProps", props, state);
    return null;
  }

  private timer: number = 0;
  private renderCount = 0;

  public constructor(props: {}) {
    super(props);
    this.state = {
      confirmMessage: "Please hit the confirm button",
      confirmOpen: false,
      confirmVisible: true,
      countDown: 10
    };
  }

  public componentDidMount() {
    this.timer = window.setInterval(() => this.handleTimerTick(), 1000);
  }

  public getSnapshotBeforeUpdate(prevProps: {}, prevState: IState) {
    this.renderCount += 1;
    console.log("getSnapshotBeforeUpdate", prevProps, prevState, {
      renderCount: this.renderCount
    });
    return this.renderCount;
  }

  public componentDidUpdate(
    prevProps: {},
    prevState: IState,
    snapshot: number
  ) {
    console.log("componentDidUpdate", prevProps, prevState, snapshot, {
      renderCount: this.renderCount
    });
  }

  public componentWillUnmount() {
    clearInterval(this.timer);
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>{this.state.confirmMessage}</p>
        {this.state.confirmVisible && (
          <button onClick={this.handleConfirmClick}>Confirm</button>
        )}
        {this.state.countDown > 0 && (
          <Confirm
            open={this.state.confirmOpen}
            title="React and TypeScript"
            content="Use React and TypeScript?"
            cancelCaption="No way"
            okCaption="Yes please!"
            onCancelClick={this.handleCancelConfirmClick}
            onOkClick={this.handleOkConfirmClick}
          />
        )}
      </div>
    );
  }

  private handleConfirmClick = () => {
    this.setState({ confirmOpen: true });
    clearInterval(this.timer);
  };

  private handleCancelConfirmClick = () => {
    this.setState({
      confirmMessage: "Take a break",
      confirmOpen: false
    });
    clearInterval(this.timer);
  };

  private handleOkConfirmClick = () => {
    this.setState({
      confirmMessage: "Keep reading!",
      confirmOpen: false
    });
    clearInterval(this.timer);
  };

  private handleTimerTick() {
    this.setState(
      {
        confirmMessage: `Please hit the confirm button ${
          this.state.countDown
        } seconds remaining`,
        countDown: this.state.countDown - 1
      },
      () => {
        if (this.state.countDown <= 0) {
          clearInterval(this.timer);
          this.setState({
            confirmMessage: "Too late to confirm",
            confirmVisible: false
          });
        }
      }
    );
  }
}

export default App;