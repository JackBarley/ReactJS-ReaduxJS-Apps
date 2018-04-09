import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    // Create action creator to sign up user
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <string>Oops!</string> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name='email' type='email' label='Email:' component={renderField} />
        <Field name='password' type='password' label='Password:' component={renderField} />
        <Field name='passwordConfirm' type='password' label='Confirm Password:' component={renderField} />
        {this.renderAlert()}
        <button className='btn btn-primary' action='submit'>Sign up!</button>
      </form>
    );
  }
}

const renderField = ({
  name,
  type,
  label,
  input,
  meta: { touched, error }
}) => (
  <fieldset className='form-group'>
    <label>{label}</label>
    <div>
      <input {...input} name={name} type={type} validate={validate} className='form-control'></input>
      {touched && error && <div className='error'>{error}</div>}
    </div>
  </fieldset>
)

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
})(Signup));
