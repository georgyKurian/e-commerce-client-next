import { PropTypes } from 'prop-types';

const OrderSummery = ({ numberOfItems, totalAmount }) => (
  <div>
    <div className="flex flex-col lg:flex-row-reverse">
      <div className="flex flex-col items-center justify-around mb-2 p-2 bg-gray-200 lg:px-4 lg:mx-4 lg::w-4/12">
        <span className="font-semibold">{`Cart Total (${numberOfItems} ${(numberOfItems === 1 ? 'item' : 'items')})`}</span>
        <span className="font-bold text-orange-600 text-3xl">
          {totalAmount}
        </span>
      </div>
    </div>
  </div>
);

OrderSummery.propTypes = {
  numberOfItems: PropTypes.number.isRequired,
  totalAmount: PropTypes.string.isRequired,
};

export default OrderSummery;
