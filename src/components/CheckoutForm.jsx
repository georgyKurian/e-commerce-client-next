import React, { Component } from 'react';
import Form from './Form';
import TextInput from './inputs/TextInput';
import { PrimaryButton } from './Button';

export default class CheckoutForm extends Component {
  render() {
    if (this.props.values.successMessage) {
      return (
        <div>
          <h3 style={{ color: 'mediumaquamarine' }}>Success!</h3>
          <p>{this.props.values.successMessage}</p>
        </div>
      );
    }
    return (
      <div>
        <Form onSubmit={this.props.submitOrder}>
          <TextInput
            label="Full Name"
            name="contact.fullName"
            value={this.props.values.contact.fullName || ''}
            onChange={this.props.handleChange}
          />
          <TextInput
            label="Phone Number"
            name="contact.phoneNumber"
            value={this.props.values.contact.phoneNumber || ''}
            onChange={this.props.handleChange}
          />
          <TextInput
            label="Country"
            name="billingAddress.country"
            value={this.props.values.billingAddress.country || ''}
            onChange={this.props.handleChange}
          />
          <TextInput
            label="City"
            name="billingAddress.city"
            value={this.props.values.billingAddress.city || ''}
            onChange={this.props.handleChange}
          />
          <TextInput
            label="Address Line 1"
            name="billingAddress.addressLine1"
            value={this.props.values.billingAddress.addressLine1 || ''}
            onChange={this.props.handleChange}
          />
          <TextInput
            label="Address Line 2"
            name="billingAddress.addressLine2"
            value={this.props.values.billingAddress.addressLine2 || ''}
            onChange={this.props.handleChange}
          />
          <TextInput
            label="Postal Code"
            name="billingAddress.postalCode"
            value={this.props.values.billingAddress.postalCode || ''}
            onChange={this.props.handleChange}
          />
          <PrimaryButton disabled={this.props.isLoading}>
            Place Order
          </PrimaryButton>
          {this.props.values.errorMessage && (
          <p style={{ color: 'crimson' }}>this.props.values.errorMessage</p>
          )}
        </Form>
      </div>
    );
  }
}
