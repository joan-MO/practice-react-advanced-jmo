import React from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';

import Layout from '../../layout';
import AdvertDetail from './AdvertDetail';
import {deleteAdvert } from '../../../api/adverts';
import usePromise from '../../../hooks/usePromise';
import { useDispatch, useSelector } from 'react-redux';
import { getAdvert } from '../../../store/selectors';
import { advertsDeletedAction, advertsDetailAction } from '../../../store/actions';

function AdvertPage() {
  const { advertId } = useParams();
  const history = useHistory();
  const { isPending: isLoading, error, execute} = usePromise(
    []
  );
  
  const dispatch = useDispatch();
  const advert = useSelector(state => getAdvert(state, advertId));

  React.useEffect(() => {
    dispatch(advertsDetailAction(advertId));

  }, [advertId]);

  const handleDelete = () => {
    dispatch(advertsDeletedAction(advertId));
  };

  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  if (error?.statusCode === 404) {
    return <Redirect to="/404" />;
  }

  return (
    <Layout>
      {advert && <AdvertDetail {...advert} onDelete={handleDelete} />}
    </Layout>
  );
}

export default AdvertPage;
