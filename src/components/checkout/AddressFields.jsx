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
}) => {
  const formatPostalCode = (e) => {
    e.target.value = e.target.value.toUpperCase();
    if (e.target.value.length >= 3 && e.target.value.charAt(2) !== ' ') {
      const cleanedPostalCode = e.target.value.replace(/\s+/, '');
      e.target.value = `${cleanedPostalCode.substring(0, 3)} ${cleanedPostalCode.substring(3, cleanedPostalCode.length)}`;
    }
  };
  return (
    <>
      <TextInput
        name={`${name}.addressLine1`}
        label="Street Address"
        ref={register({
          required: 'This field is required!',
          pattern: {
            value: /^\d+\s[A-z|\s]+$/i,
            message: 'Invalid format! It should be like "64 Humber St"',
          },
        })}
        error={errors?.addressLine1?.message}
      />
      <TextInput
        name={`${name}.addressLine2`}
        label="Apt/Unit Number"
        className="mb-0"
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
      <div className="float-left w-1/2">
        <TextInput
          name={`${name}.city`}
          label="City"
          ref={register({
            required: 'This field is required!',
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
      </div>
      <div className="float-right w-1/2">
        <TextInput
          name={`${name}.province`}
          label="Province"
          ref={register({
            required: 'This field is required!',
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
      </div>
      <TextInput
        name={`${name}.country`}
        label="Country"
        ref={register({
          required: 'This field is required!',
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
          required: 'This field is required!',
          pattern: {
            value: /^[a-zA-Z][0-9][a-zA-Z]\s[0-9][a-zA-Z][0-9]$/i,
            message: 'Invalid postal code! (Example: L9B 9W5)',
          },
        })}
        error={errors?.postalCode?.message}
        onKeyUp={formatPostalCode}
        maxLength={7}
      />
    </>
  );
};

AddressFields.propTypes = {
  address: PropTypes.shape({
    addressLine1: PropTypes.string,
    addressLine2: PropTypes.string,
    city: PropTypes.string,
    province: PropTypes.string,
    country: PropTypes.string,
    postalCode: PropTypes.string,
  }),
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.string),
  ),
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
  errors: {},
};

export default AddressFields;
