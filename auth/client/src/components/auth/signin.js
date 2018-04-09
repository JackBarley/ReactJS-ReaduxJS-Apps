import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    console.log(email, password);
    // Need to do something to log user in
    this.props.signinUser({email, password});
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    // comes from reduxForm
    const { handleSubmit, fields: { email, password }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className='form-group'>
          <label>Email:</label>
          <Field className='form-control' name='email' component='input' />
          {/* <input {...email} className='form-control' /> => old redux-form version*/}
        </fieldset>
        <fieldset className='form-group'>
          <label>Password:</label>
          <Field className='form-control' name='password' type='password' component='input' />
          {/* <input {...password} className='form-control' /> => old redux-form version*/}
        </fieldset>
        {this.renderAlert()}
        <button action='submit' className='btn btn-primary'>Sign in</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(Signin));
