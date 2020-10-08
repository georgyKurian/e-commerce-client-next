import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import DropDown from './DropDown';
import { updateSorting } from '../../redux/actions/productsPage';
import TextOption from './DropDownOptions/TextOption';
import useRoveFocus from '../customHooks/useRoveFocus';

const options = [
  {
    name: 'Price [low - high]',
    value: 'price-low-to-high',
  },
  {
    name: 'Newtest',
    value: 'newest',
  },
  {
    name: 'Price [high - low]',
    value: 'price-high-to-low',
  },
];

const ProductSortBy = () => {
  const currentValue = useSelector((state) => state.productsPage.sortBy);
  const dispatch = useDispatch();
  const [focus, elementRef, setFocus] = useRoveFocus(options ? options.length : 0);

  const currentSortBy = options.find((sort) => sort.value === currentValue);

  const handleSortByChange = useCallback((sortValue, index) => {
    dispatch(updateSorting(sortValue));
    setFocus(index);
  }, [dispatch, updateSorting, setFocus]);

  const optionElements = options.map((option, index) => {
    const isSelected = !!((currentValue && currentValue.includes(option.value)));
    const isFocussed = focus === index;
    return (
      <TextOption
        key={option.value}
        index={index}
        name={option.name}
        value={option.value}
        handleChange={handleSortByChange}
        isFocussed={isFocussed}
        isSelected={isSelected}
      />
    );
  });

  return (
    <ul>
      <DropDown isRight={false} buttonText={!currentSortBy ? 'Sort By' : currentSortBy.name}>
        <ul className="" ref={elementRef}>
          {optionElements}
        </ul>
      </DropDown>
    </ul>
  );
};

export default ProductSortBy;
