import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";

class AppNavbar extends Component {
  state = {
    loggedInUser: "",
  };
  handleSelect = (user) => {
    this.setState({ loggedInUser: user });
  };
  render() {
    const { users } = this.props;
    //console.log(users);

    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand bsPrefix="font-weight-bold text-muted">
            DoodleBlue Task
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ml-auto">
              <NavDropdown title="User" id="basic-nav-dropdown" drop="left">
                {users &&
                  users.map((user) => {
                    const username = user.firstName + " " + user.lastName;
                    return (
                      <NavDropdown.Item key={`li${user.id}`}>
                        <Link
                          className="dropdown-item"
                          to={`/chat/${user.id}`}
                          onClick={() => this.handleSelect(username)}
                        >
                          {username}
                        </Link>
                      </NavDropdown.Item>
                    );
                  })}
              </NavDropdown>
              <Nav.Link>
                <Nav.Item>{this.state.loggedInUser}</Nav.Item>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
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
)(AppNavbar);
