import React, { Component } from "react";
import "./App.css";
import Confirm from "../Confirm/Confirm";
import PageHeader from "../PageHeader/PageHeader";
import PageBody from "../PageBody/PageBody";

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
    const renderCount = {
      renderCount: this.renderCount
    };
    console.log(
      "componentDidUpdate",
      prevProps,
      prevState,
      snapshot,
      renderCount
    );
  }

  public componentWillUnmount() {
    clearInterval(this.timer);
  }

  public render() {
    return (
      <div className="App">
        <PageHeader />
        <PageBody
          confirmMessage={this.state.confirmMessage}
          confirmVisible={this.state.confirmVisible}
          confirmOpen={this.state.confirmOpen}
          countDown={this.state.countDown}
          handleConfirmClick={this.handleConfirmClick}
          handleCancelConfirmClick={this.handleCancelConfirmClick}
          handleOkConfirmClick={this.handleOkConfirmClick}
        />
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
