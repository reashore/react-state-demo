import React, { Component } from "react";
import Confirm from "../Confirm/Confirm";

interface IPageBodyProps {
  confirmMessage: string;
  confirmVisible: boolean;
  confirmOpen: boolean;
  countDown: number;
  handleConfirmClick: () => void;
  handleCancelConfirmClick: () => void;
  handleOkConfirmClick: () => void;
}

const PageBody: React.FunctionComponent<IPageBodyProps> = props => (
  <div>
    <p>{props.confirmMessage}</p>
    {props.confirmVisible && (
      <button onClick={props.handleConfirmClick}>Confirm</button>
    )}
    {props.countDown > 0 && (
      <Confirm
        open={props.confirmOpen}
        title="React and TypeScript"
        content="Use React and TypeScript?"
        cancelCaption="No"
        okCaption="Yes"
        onCancelClick={props.handleCancelConfirmClick}
        onOkClick={props.handleOkConfirmClick}
      />
    )}
  </div>
);

export default PageBody;
