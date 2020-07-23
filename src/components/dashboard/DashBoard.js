import React, { Component } from "react";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import ContactForm from "../contact/contactForm";
import UsersBox from "../users/usersBox";
import ChatBox from "../chat/chatBox";
import MessageCard from "../chat/messageCard";
class DashBoard extends Component {
  state = {
    show: false,
    receiver: "",
    sender: "",
    activeIndex: null,
  };
  toggleModalShow = (show) => {
    this.setState({ show });
  };
  componentDidMount() {
    this.setState({ sender: this.props.match.params.id, activeIndex: null });
  }
  static getDerivedStateFromProps(props, state) {
    if (props.match.params.id !== state.sender) {
      return {
        receiver: "",
        activeIndex: null,
      };
    }
    return null;
  }

  selectReciever = (id, index) => {
    this.setState({
      sender: this.props.match.params.id,
      receiver: id,
      activeIndex: index,
    });
  };
  render() {
    const { users } = this.props;

    const { sender, receiver, activeIndex } = this.state;

    const id = this.props.match.params.id;
    let newUserList = [];
    if (users && users !== undefined) {
      newUserList = users.filter((u) => u.id !== id);
    }
    const links =
      receiver.length > 0 && sender.length > 0 ? (
        <ChatBox sender={sender} receiver={receiver} />
      ) : (
        <div className="chat-info text-center text-white font-weight-bold">
          Select a contact to message.
        </div>
      );
    const messageBox =
      sender && receiver ? (
        <MessageCard sender={sender} receiver={receiver} />
      ) : (
        ""
      );
    const contactModal = this.state.show ? (
      <ContactForm
        show={this.state.show}
        onHide={() => this.toggleModalShow(false)}
        formtitle="Add Contact"
      />
    ) : (
      ""
    );
    return (
      <React.Fragment>
        <div className="row my-3">
          <div className="d-block w-100">
            <button
              className="btn btn-dark"
              onClick={() => this.toggleModalShow(true)}
            >
              Add Contact
            </button>
            {contactModal}
          </div>
        </div>
        <div className="row rounded-lg overflow-hidden shadow">
          <div className="col-lg-5 col-md-5  col-sm-12 px-0 user-container my-auto">
            <div className="bg-white">
              <div className="bg-gray px-4 py-2 bg-light">
                <p className="h5 mb-0 py-1">Contact Info</p>
              </div>
              {/* User's Box */}
              <div className="users-box">
                <div className="list-group rounded-0">
                  {newUserList &&
                    newUserList.map((user, i) => {
                      return (
                        <UsersBox
                          active={activeIndex === i}
                          index={i}
                          key={`user${i}`}
                          user={user}
                          selectReciever={this.selectReciever}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>{" "}
          {/* Chat Box */}
          <div className="d-flex flex-column  col-lg-7 col-md-7  col-sm-12 px-0 chat-container my-auto">
            {messageBox}
            {links}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.firestore.ordered.users,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "users" }])
)(DashBoard);
