import React, {useState, useEffect} from 'react';
import {
  Link,
  useRouteMatch,
} from 'react-router-dom';
import Loader from './Loader.jsx';
import Offer from './Offer.jsx';
import api from '../api';

const OfferList = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/offers').then((response) => {
      setOffers(response.data);
      setLoading(false);
    }).catch((error) => {
    });
  }, []);

  const { url } = useRouteMatch();
  return (
    <>
      <Link to={`${url}/new`}>Create Offer</Link>
          {!loading
            ? offers.map((offer) => (
              <div key={offer.id}>
                <Offer name={offer.name} description={offer.description} />
              </div>
            ))
            : <Loader />
        }
    </>
  );
};


OfferList.propTypes = {
};

export default OfferList;
