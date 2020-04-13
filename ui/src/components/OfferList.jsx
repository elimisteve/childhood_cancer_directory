import React, {useState, useEffect} from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom';
import Offer from './Offer.jsx';
import CreateOffer from './CreateOffer.jsx';
import api from '../api';

const OfferList = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/offers').then((response) => {
      setOffers(response.data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const { path, url } = useRouteMatch();
  return (
    <>
      <Link to={`${url}/new`}>Create Offer</Link>
      <Switch>
        <Route exact path={path}>
          {!loading
            ? offers.map((offer) => (
              <div key={offer.id}>
                <Offer name={offer.name} description={offer.description} />
              </div>
            ))
            : <div>loading</div>
        }
        </Route>
        <Route path={`${path}/new`}>
          <CreateOffer/>
        </Route>
      </Switch>
    </>
  );
};


OfferList.propTypes = {
};

export default OfferList;
