import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import AddressFields from './AddressFields';
import { PrimaryButton } from '../Button';
import Form from '../Form';

const Step1 = ({ onSubmit, billingAddress }) => {
  const { handleSubmit, register, errors } = useForm();

  const formSubmit = (data) => {
    const newBillingAddress = { ...data.billing };
    newBillingAddress.postalCode = data.billing.postalCode.replace(/\s+/, '');
    onSubmit(newBillingAddress);
  };

  return (
    <div className="lg:w-1/2 lg:float-left lg:pr-6">
      <div className="px-4 py-4">
        <Form className="w-full overflow-hidden" onSubmit={handleSubmit(formSubmit)}>
          <h2>Billing Address</h2>
          <AddressFields name="billing" address={billingAddress} errors={errors?.billing} register={register} />
          <PrimaryButton type="submit" className="w-full">Continue to Payment</PrimaryButton>
        </Form>
      </div>
    </div>
  );
};

Step1.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  billingAddress: PropTypes.shape({
    addressLine1: PropTypes.string,
    addressLine2: PropTypes.string,
    city: PropTypes.string,
    province: PropTypes.string,
    country: PropTypes.string,
    postalCode: PropTypes.string,
  }).isRequired,
};

export default Step1;
