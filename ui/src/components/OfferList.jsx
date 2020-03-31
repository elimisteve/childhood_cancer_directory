import React from 'react';
import PropTypes from 'prop-types';
import Offer from './Offer.jsx';
import CreateOffer from './CreateOffer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

const OfferList = (props) => {
  let {path, url} = useRouteMatch();
  return (
    <>
      <Link to={`${url}/new`}>Create Offer</Link>
      <Switch>
        <Route exact path={path}>
          {props.offers.map((offer) => (
            <div key={offer.id}>
              <Offer name={offer.name} description={offer.description} />
            </div>
          ))}
        </Route>
        <Route path={`${path}/new`}>
          <CreateOffer/>
        </Route>
      </Switch>
    </>
  )
};


OfferList.propTypes = {
  offers: PropTypes.array.isRequired,
};

export default OfferList;
