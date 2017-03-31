import { connect } from 'react-redux';
import Admin from '../Admin';


const mapStateToProps = (state) => {
  return {
    user_count:state.admin_portal.portal_count.user_count,
    insight_count:state.admin_portal.portal_count.insight_count,
    publication_count:state.admin_portal.portal_count.publication_count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
      }
}

const AdminContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);

export default AdminContainer;
