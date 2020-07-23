import React from "react";
import Joi from "joi-browser";
import { connect } from "react-redux";
import Form from "../../common/form";
import Modal from "react-bootstrap/Modal";
import { addContact } from "../../services/contact/actions";
class ContactForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      title: "",
      company: "",
    },
    errors: {},
    show: true,
  };
  schema = {
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().required().email().label("Email"),
    title: Joi.string().allow("").label("Title"),
    company: Joi.string().required().label("Company"),
  };

  doSubmit = (e) => {
    console.log("Submitted Add Contact");
    this.props.adduser(this.state.data);
    this.props.onHide();
    e.target.reset();
  };

  render() {
    return (
      <React.Fragment>
        {" "}
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            closeButton
            bsPrefix="app-theme text-white modal-header"
          >
            <Modal.Title id="contained-modal-title-vcenter">
              {this.props.formtitle}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-xl-6 col-lg-7 col-md-9 col-sm-11 mx-auto form p-4">
                <div className="px-2">
                  <form onSubmit={this.handleSubmit}>
                    {this.renderInput("firstName", "First Name")}
                    {this.renderInput("lastName", "Last Name")}

                    {this.renderInput("email", "Email")}
                    {this.renderInput("title", "Title")}
                    {this.renderInput("company", "Company")}
                    {this.renderButton("Save")}
                  </form>
                </div>
              </div>
            </div>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer> */}
        </Modal>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    adduser: (contact) => dispatch(addContact(contact)),
  };
};

export default connect(null, mapDispatchToProps)(ContactForm);
