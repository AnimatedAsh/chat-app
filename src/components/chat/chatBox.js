import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sendMessage } from "../../services/message/actions";
class ChatBox extends Component {
  state = {
    message: "",
    isEnabled: false,
  };

  handleChange = (e) => {
    const message = e.target.value;
    const isEnabled = message.length > 0 ? true : false;
    this.setState({ message, isEnabled });
  };
  doSubmit = (e) => {
    if (!this.state.isEnabled) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    const { sender, receiver } = this.props;
    //console.log(sender, receiver, this.state.message);
    this.props.sendmessages(this.state.message, sender, receiver);
    this.setState({ isEnabled: false });
    e.target.reset();
  };
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.doSubmit} className="bg-light message-form ">
          <div className="input-group">
            <input
              name="message"
              id="message"
              type="text"
              placeholder="Type a message"
              aria-describedby="button-addon2"
              className="form-control rounded-0 border-0 py-4 bg-light"
              onChange={this.handleChange}
            />
            <div className="input-group-append">
              <button
                id="button-addon2"
                type="submit"
                className="btn btn-link"
                disabled={!this.state.isEnabled}
              >
                {" "}
                <FontAwesomeIcon className="paper-plane" icon="paper-plane" />
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendmessages: (message, sender, receiver) =>
      dispatch(sendMessage(message, sender, receiver)),
  };
};

export default connect(null, mapDispatchToProps)(ChatBox);
