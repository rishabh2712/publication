import { connect } from 'react-redux';
import EditPublication from '../EditPublication';

const mapStateToProps = (state) => {
  return {
    user_id:state.login.user_id,
    categories:state.addProject.addProjectRequest.categories,
    details:state.publication_details_update.publicationDetails.details,
    isrequesting:state.publication_details_update.updatepublicationDetails.isrequesting,
    didInvalidate:state.publication_details_update.updatepublicationDetails.didInvalidate,
    publicationId:state.publication_details_update.updatepublicationDetails.publicationId,
    success:state.publication_details_update.updatepublicationDetails.success,
    errors:state.publication_details_update.updatepublicationDetails.errors,
    successmessage:state.publication_details_update.updatepublicationDetails.successmessage,
    errormessage:state.publication_details_update.updatepublicationDetails.errormessage,
    token:state.login.token
  };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const EditPublicationContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPublication);

export default EditPublicationContent;
