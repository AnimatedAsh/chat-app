import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import SenderMessage from "../../common/senderMessage";
import ReceiverMessage from "../../common/receiverMessage";

class MessageCard extends Component {
  componentDidUpdate() {
    const objDiv = document.getElementById("chat-box");
    objDiv.scrollTop = objDiv.scrollHeight;
  }
  render() {
    const { messages, sender, receiver, senderObj, receiverObj } = this.props;

    return (
      <div
        className="px-4 py-5 chat-box bg-white"
        id="chat-box"
        key={`${sender}${receiver}`}
      >
        {messages &&
          messages.map((message) => {
            if (
              sender &&
              receiver &&
              ((message.sender == receiver && message.receiver == sender) ||
                (message.sender == sender && message.receiver == receiver))
            ) {
              const messageType =
                message.sender == sender ? (
                  <SenderMessage
                    message={message}
                    initial={senderObj.initials}
                    key={message.id}
                  />
                ) : (
                  <ReceiverMessage
                    message={message}
                    initial={receiverObj.initials}
                    key={message.id}
                  />
                );

              return (
                <React.Fragment key={`msg${message.id}`}>
                  {messageType}
                </React.Fragment>
              );
            }
          })}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { sender, receiver } = ownProps;
  const users = state.firestore.data.users;
  const senderObj = users ? users[sender] : null;
  const receiverObj = users ? users[receiver] : null;

  return {
    senderObj: senderObj,
    receiverObj: receiverObj,
    messages: state.firestore.ordered.messages,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (!props.sender && !props.receiver) return [];
    return (
      [{ collection: "users" }],
      [
        {
          collection: "messages",
          where: [["sender", "in", [props.sender, props.receiver]]],
          where: [["receiver", "in", [props.sender, props.receiver]]],

          orderBy: ["createdAt", "asc"],
        },
      ]
    );
  })
)(MessageCard);
