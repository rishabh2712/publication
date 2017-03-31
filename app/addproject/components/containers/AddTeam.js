import { connect } from 'react-redux';
import StartTeam from '../StartTeam';

const mapStateToProps = (state) => {
  return {
    isAddTeamRequesting:state.addProject.addteamrequest.isAddTeamRequesting,
    isRequesting:state.addProject.addteamrequest.isRequesting,
    errors:state.addProject.addteamrequest.errors,
    success:state.addProject.addteamrequest.success,
    didInvalidate:state.addProject.addteamrequest.didInvalidate,
    errorflag:state.addProject.addteamrequest.errorflag,
    successmessage:state.addProject.addteamrequest.successmessage,
    project_id:state.addProject.addProjectRequest.project_id,
    team:state.addProject.addteamrequest.team
 };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const AddTeam = connect(
  mapStateToProps,
  mapDispatchToProps
)(StartTeam);

export default AddTeam;
