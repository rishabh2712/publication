import { connect } from 'react-redux';
import EditContributors from '../EditContributors';

const mapStateToProps = (state) => {
  return {
    user_id:state.login.user_id,
    selected_id:state.addProject.addteamrequest.selected_user,
    project_id:state.publication_details_update.publicationDetails.details.id,
    errors:state.publication_details_update.updatecontributorsDetails.errors,
    success:state.publication_details_update.updatecontributorsDetails.success,
    team:state.addProject.addteamrequest.team,
    successmessage:state.publication_details_update.updatecontributorsDetails.successmessage,
    errormessage:state.publication_details_update.updatecontributorsDetails.errormessage
  };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const PublicationContributorsEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditContributors);

export default PublicationContributorsEdit;
