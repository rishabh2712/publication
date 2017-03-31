import { connect } from 'react-redux';
import PublicationDetails from '../PublicationDetails';


const mapStateToProps = (state) => {
  return {
   user_id:state.login.user_id,
   like_status:state.publication_details_update.publicationDetails.like_status,
   details:state.publication_details_update.publicationDetails.details,
   isFetching: state.publication_details_update.publicationDetails.isFetching,
   didInvalidate:state.publication_details_update.publicationDetails.didInvalidate,
   error: state.publication_details_update.publicationDetails.error,
   initialized: state.publication_details_update.publicationDetails.initialized,
   success_delete:state.publication_details_update.updatepublicationDetails.success_delete,
   success_delete_message:state.publication_details_update.updatepublicationDetails.success_delete_message
  };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch,

});

const PublicationContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicationDetails);

export default PublicationContent;
