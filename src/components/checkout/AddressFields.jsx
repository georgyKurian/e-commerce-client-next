import { PropTypes } from 'prop-types';
import TextInput from '../inputs/TextInput';
import CountrySelect from '../inputs/CountrySelect';

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
        value={addressLine1}
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
        value={addressLine2}
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
          value={city}
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
          value={province}
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
      <CountrySelect
        name={`${name}.country`}
        label="Country"
        value={country}
        ref={register({
          required: 'This field is required!',
        })}
        error={errors?.country?.message}
      />
      {/* <select
        name={`${name}.country`}
        value={country}
        ref={register({
          required: 'This field is required!',
          validate: (value) => {
            alert(value);
          },
        })}
        error={errors?.country?.message}
      >
        <option value="">-select-</option>
        <option value="US">US</option>
        <option value="CA">US</option>
      </select> */}
      <TextInput
        name={`${name}.postalCode`}
        value={postalCode}
        label="Postal Code"
        ref={register({
          required: 'This field is required!',
          pattern: {
            value: /^[a-zA-Z][0-9][a-zA-Z]\s[0-9][a-zA-Z][0-9]$/i,
            message: 'Invalid postal code! (Example: L9B 9W5)',
          },
        })}
        error={errors?.postalCode?.message}
        onChange={formatPostalCode}
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
