import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useForm } from 'react-hook-form';
import TextInput from '../inputs/TextInput';

const AddressFields = ({
  address: {
    addressLine1, addressLine2, city, province, country, postalCode,
  },
  name,
  register,
  errors,
}) => (
  <>
    <TextInput
      name={`${name}.addressLine1`}
      label="Street Address"
      ref={register({
        required: 'Required',
        pattern: {
          value: /^\d+\s[A-z|\s]+$/i,
          message: 'Invalid format. Should be like "64 Humber St"',
        },
      })}
    />
    {errors.addressLine1 && errors.addressLine1.message}
    <TextInput
      name={`${name}.addressLine2`}
      label="Apt/Unit Number"
      ref={register({
        pattern: {
          value: /^[#.0-9a-zA-Z\s-/]+$/i,
        },
        maxLength: {
          value: 20,
          message: 'Too long! It should be less than 20 characters', // <p>error message</p>
        },
      })}
    />
    <TextInput
      name={`${name}.city`}
      label="City"
    />
    <TextInput
      name={`${name}.province`}
      label="Province"
    />
    <TextInput
      name={`${name}.country`}
      label="Country"
    />
    <TextInput
      name={`${name}.postalCode`}
      label="Postal Code"
      ref={register({
        required: true,
        pattern: {
          value: /^[#.0-9a-zA-Z\s-/]+$/i,
        },
      })}
    />
  </>
);

AddressFields.propTypes = {
  address: PropTypes.shape({
    addressLine1: PropTypes.string,
    addressLine2: PropTypes.string,
    city: PropTypes.string,
    province: PropTypes.string,
    country: PropTypes.string,
    postalCode: PropTypes.string,
  }),
};


AddressFields.defaultProps = {
  address: {
    addressLine1: '',
    addressLine2: '',
    city: '',
    province: '',
    country: '',
    postalCode: '',
  },
};

export default AddressFields;
