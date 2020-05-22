import { useForm } from 'react-hook-form';
import AddressFields from './AddressFields';
import { PrimaryButton } from '../Button';
import Form from '../Form';

const Step1 = () => {
  const { handleSubmit, register, errors } = useForm();

  const formSubmit = (data) => {
    alert(JSON.stringify(data));
    console.log(JSON.stringify(data));
  };

  return (
    <div className="lg:w-1/2 lg:float-left lg:pr-6">
      <div className="px-4 py-4">
        <Form className="w-full overflow-hidden" onSubmit={handleSubmit(formSubmit)}>
          <h2>Billing Address</h2>
          <AddressFields name="billing" errors={errors?.billing} register={register} />
          <PrimaryButton type="submit" className="w-full">Continue to Payment</PrimaryButton>
        </Form>
      </div>
    </div>
  );
};

export default Step1;
