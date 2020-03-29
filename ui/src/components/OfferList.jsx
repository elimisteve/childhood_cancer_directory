import React from 'react';
import PropTypes from 'prop-types';
import Offer from './Offer.jsx';

const OfferList = (props) => (
  <>
    {props.offers.map((offer) => (
      <div key={offer.id}>
        <Offer name={offer.name} description={offer.description} />
      </div>
    ))}
  </>
);


OfferList.propTypes = {
  offers: PropTypes.array.isRequired,
};

export default OfferList;
