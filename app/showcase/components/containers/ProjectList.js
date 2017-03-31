import { connect } from 'react-redux';
import ProjectGrid from '../ProjectGrid';
import {fetchProjectsIfNeeded, invalidateProjects} from '../../actions';


const mapStateToProps = (state) => {
  return {
    publication_id:state.projects_insights.showcase.publication_id,
    publications:state.projects_insights.showcase.publications,
    isAuthenticated:state.login.isAuthenticated,
    projects: state.projects_insights.showcase.items,
    isFetching: state.projects_insights.showcase.isFetching,
    error: state.projects_insights.showcase.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    refresh: () => {
      dispatch(invalidateProjects());
      dispatch(fetchProjectsIfNeeded());
    }
  };
}

const ProjectList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectGrid);

export default ProjectList;
