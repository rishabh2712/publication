import { connect } from 'react-redux';
import InsightShowcase from '../InsightShowcase';
import {fetchInsights,invalidateinsights} from '../../actions/Insights';


const mapStateToProps = (state) => {
  return {
    isAuthenticated:state.login.isAuthenticated,
    insights: state.projects_insights.insights.items,
    isFetching: state.projects_insights.insights.isFetching,
    error: state.projects_insights.insights.error,
    success:state.projects_insights.insights.success,
    errorflag:state.projects_insights.insights.errorflag,
    successmessage:state.projects_insights.insights.successmessage,
    errormessage:state.projects_insights.insights.errormessage,
    isrequesting:state.projects_insights.insights.isrequesting,
    user_id:state.login.user_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    refresh: () => {
      dispatch(invalidateinsights());
      dispatch(fetchInsights());
    }
  };
}

const InsightList = connect(
  mapStateToProps,
  mapDispatchToProps
)(InsightShowcase);

export default InsightList;
