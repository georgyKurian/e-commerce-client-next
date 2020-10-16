import PropTypes from 'prop-types';

const Features = ({ featureList }) => {
  if (!Array.isArray(featureList)) { return null; }
  const midSize = Math.ceil(featureList.length / 2);
  const featureElements = [[], []];

  featureList.forEach((feature, index) => {
    const featureElementsIndex = (index < midSize) ? 0 : 1;
    featureElements[featureElementsIndex].push(<li className="mb-4" key={feature}>{feature}</li>);
  });

  return (
    <>
      <ul className="flex-1 ml-4 list-disc">
        {featureElements[0]}
      </ul>
      <ul className="flex-1 ml-4 list-disc">
        {featureElements[1]}
      </ul>
    </>
  );
};

Features.propTypes = {
  featureList: PropTypes.arrayOf(PropTypes.string),
};

Features.defaultProps = {
  featureList: null,
};

export default Features;
