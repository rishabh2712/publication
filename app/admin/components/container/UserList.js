import { connect } from 'react-redux';
import ManageAssociates from '../ManageAssociates'
import {invalidateUsers,fetchUser} from '../../actions'

const mapStateToProps = (state) => {
  return {
    users: state.user_fetch.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    refresh: () => {
      dispatch(invalidateUsers());
      dispatch(fetchUser());
    }
  };
}

const ProjectList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageAssociates);

export default UserList;
