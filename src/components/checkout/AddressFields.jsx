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
      error={errors?.addressLine1?.message}
    />
    <TextInput
      name={`${name}.addressLine2`}
      label="Apt/Unit Number"
      ref={register({
        pattern: {
          value: /^[#0-9a-zA-Z\s.-/]+$/i,
          message: 'Invalid character found! ( Use: letters, digits, #, .,-, / )',
        },
        maxLength: {
          value: 20,
          message: 'Too long! It should be less than 20 characters', // <p>error message</p>
        },
      })}
      error={errors?.addressLine2?.message}
    />
    <TextInput
      name={`${name}.city`}
      label="City"
      ref={register({
        pattern: {
          value: /^[a-zA-Z\s-.]+$/i,
          message: 'Invalid character found! ( Use: letters, ., - )',
        },
        maxLength: {
          value: 15,
          message: 'Too long! It should be less than 15 characters', // <p>error message</p>
        },
      })}
      error={errors?.city?.message}
    />
    <TextInput
      name={`${name}.province`}
      label="Province"
      ref={register({
        pattern: {
          value: /^[a-zA-Z\s-.]+$/i,
          message: 'Invalid character found! ( Use: letters, ., - )',
        },
        maxLength: {
          value: 15,
          message: 'Too long! It should be less than 15 characters', // <p>error message</p>
        },
      })}
      error={errors?.province?.message}
    />
    <TextInput
      name={`${name}.country`}
      label="Country"
      ref={register({
        pattern: {
          value: /^[a-zA-Z\s-.]+$/i,
          message: 'Invalid character found! ( Use: letters, ., - )',
        },
        maxLength: {
          value: 15,
          message: 'Too long! It should be less than 15 characters', // <p>error message</p>
        },
      })}
      error={errors?.country?.message}
    />
    <TextInput
      name={`${name}.postalCode`}
      label="Postal Code"
      ref={register({
        required: true,
        pattern: {
          value: /^[a-zA-Z][0-9][a-zA-Z]\s[0-9][a-zA-Z][0-9]$/i,
          message: 'Invalid postal code! (Example: L9B 9W5)',
        },
      })}
      error={errors?.postalCode?.message}
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
