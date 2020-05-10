import { PropTypes } from 'prop-types';
import TextInput from '../inputs/TextInput';

const AddressFields = ({
  address: {
    addressLine1, addressLine2, city, province, country, postalCode,
  },
}) => {
  const x = 1;
  return (
    <>
      <TextInput name="addressLine1" label="Street Address" value={addressLine1} />
      <TextInput name="addressLine2" label="Apt/Unit Number" value={addressLine2} />
      <TextInput name="city" label="City" value={city} />
      <TextInput name="province" label="Province" value={province} />
      <TextInput name="country" label="Country" value={country} />
      <TextInput name="postalCode" label="Postal Code" value={postalCode} />
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
