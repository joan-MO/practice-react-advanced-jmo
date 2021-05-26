import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../../store/actions';
import usePromise from '../../../hooks/usePromise';
import LoginForm from './LoginForm';
import { getUi } from '../../../store/selectors'

function LoginPage() {
  const { isPending: isLoading, resetError } = usePromise();
  const dispatch = useDispatch();
  const { error } = useSelector(getUi);
  const handleSubmit = credentials => {
    dispatch(loginAction(credentials));
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
      {isLoading && <p>...login in nodepop</p>}
      {error && (
        <div onClick={resetError} style={{ color: 'red' }}>
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
