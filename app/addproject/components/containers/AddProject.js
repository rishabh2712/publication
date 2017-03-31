import { connect } from 'react-redux';
import StartProject from '../StartProject';

const mapStateToProps = (state) => {
  return {
  isrequesting:state.addProject.addProjectRequest.isRequesting,
  categories:state.addProject.addProjectRequest.categories,
  errors:state.addProject.addProjectRequest.errors,
  errormessage:state.addProject.addProjectRequest.errorflag,
  success:state.addProject.addProjectRequest.success,
  successmessage:state.addProject.addProjectRequest.successmessage,
  project_id:state.addProject.addProjectRequest.project_id,
  user_id:state.login.user_id,
  references:state.form.fieldArrays,
  token:state.login.token,
  publications:state.projects_insights.showcase.publications,
 };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const AddProject = connect(
  mapStateToProps,
  mapDispatchToProps
)(StartProject);

export default AddProject;
