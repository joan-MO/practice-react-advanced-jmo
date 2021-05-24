import { Link } from 'react-router-dom';
import T from 'prop-types';
import { connect } from 'react-redux';

import { ConfirmationButton } from '../../shared';
import { logout } from '../../../api/auth';
import { getIsLogged } from '../../../store/selectors';
import { authLogout } from '../../../store/actions';

const AuthButton = ({ handleLogout, isLogged }) => {
  const handleLogoutConfirm = async () => {
    await logout();
    handleLogout();
  };

  return isLogged ? (
    <ConfirmationButton
      confirmation="Are you sure?"
      onConfirm={handleLogoutConfirm}
    >
      Logout
    </ConfirmationButton>
  ) : (
    <Link to="/login">Login</Link>
  );
};

AuthButton.propTypes = {
  handleLogout: T.func.isRequired,
  isLogged: T.bool,
};

AuthButton.defaultProps = {
  isLogged: false,
};


const mapStateToProps = (state, ownProps) => ({ isLogged: getIsLogged(state) });

const mapDispatchProps = {
  handleLogout: authLogout,
}


export default connect(mapStateToProps, mapDispatchProps)(AuthButton);
