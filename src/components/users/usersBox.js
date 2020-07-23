import React, { Component } from "react";

class UsersBox extends Component {
  render() {
    const { user, selectReciever, active, index } = this.props;

    return (
      <React.Fragment>
        <div
          key={user.id}
          className={`list-group-item list-group-item-action rounded-0 ${
            active ? "bg-dark text-white" : null
          } `}
          onClick={() => selectReciever(user.id, index)}
        >
          <div className="media m-2">
            <div className="rounded-circle border-info avatar text-dark">
              {user.initials.toUpperCase()}
            </div>
            <div className="media-body ml-4">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <h6 className="mb-0">
                  {user.firstName} {user.lastName}
                </h6>
                <small className="small font-weight-bold">{user.company}</small>
              </div>
              <small className="mb-0 text-small">{user.email}</small>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UsersBox;
