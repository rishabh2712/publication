import { connect } from 'react-redux';
import ManageAssociates from '../ManageAssociates';
import {invalidateUsers,fetchUser} from '../../actions/fetch_users';
import {changestatus} from '../../actions/enable_disable';


const mapStateToProps = (state) => {
  return {
    users: state.associates.user_fetch.items,
    isFetchingUser:state.associates.user_fetch.isFetching,
    user_fetch_error:state.associates.user_fetch.errorFlag,
    user_fetch_success:state.associates.user_fetch.success,
    isRequesting:state.associates.enable.isRequesting,
    changestatuserror:state.associates.enable.error,
    user_id:state.associates.enable.user_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    refresh: () => {
      dispatch(invalidateUsers());
      dispatch(fetchUser());
    },
    enableStatus:(status,id)=>{
      dispatch(changestatus(status,id));
    }
  };
}

const UserList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageAssociates);

export default UserList;
