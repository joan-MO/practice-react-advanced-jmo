import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import T from 'prop-types';
import { Redirect } from 'react-router-dom';

import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';
import { getUi } from '../../../store/selectors'
import { advertsCreateAction } from '../../../store/actions';

function NewAdvertPage({ history }) {
  const dispatch = useDispatch();
  const { error } = useSelector(getUi);

  const handleSubmit = newAdvert => {
    dispatch(advertsCreateAction(newAdvert)).then(({ id }) =>
      history.push(`/adverts/${id}`)
    );
  };

  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  return (
    <Layout>
      <NewAdvertForm onSubmit={handleSubmit} />
    </Layout>
  );
}

NewAdvertPage.propTypes = {
  history: T.shape({
    push: T.func.isRequired,
  }).isRequired,
};

export default NewAdvertPage;
