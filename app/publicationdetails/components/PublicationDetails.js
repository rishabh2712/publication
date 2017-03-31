import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import PublicationDescription from './PublicationDescription';
import { apiEndPoint } from '../../config';
import PublicationTeam from './PublicationTeam';
import Comments from './Comments';
import References from './References';
import Media from './Media';
import {invalidateRoute,currentRoute} from '../../common/components/currentRoute/actions'
import { fetchpublicationDetailsIfNeeded, fetchpublicationDetails,invalidatepublicationDetails,delete_publication,request_publication_delete_invalidate} from '../actions';
import './PublicationDescription.css';
import './PublicationDetails.css';


class PublicationDetails extends Component {
  constructor(props) {
    super(props);
    this.firebutton=this.firebutton.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(invalidatepublicationDetails(parseInt(this.props.params.id)));
  }

  componentDidMount() {
    this.props.dispatch(currentRoute(this.props.location.pathname));
    this.props.dispatch(fetchpublicationDetailsIfNeeded(this.props.params.id));
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.success_delete){
        this.success_delete_modal(nextProps.success_delete_message)
    }
  }

  success_delete_modal(msg){
    $('.ui.basic.successfuldelete.modal').modal('show');
  }

  successfullydeleted(){
  this.props.dispatch(request_publication_delete_invalidate(this.props.params.id));
   browserHistory.push('/publications');
  }

  componentWillUnmount(){
    this.props.dispatch(invalidatepublicationDetails(this.props.params.id));
  }

  firebutton(){
    let id=this.props.params.id;
    browserHistory.push('/publications/publication/'+id+'/edit');
  }

  firedelete(){
    let id=this.props.params.id;
    this.props.dispatch(delete_publication(id))
  }

  showmodal(){
      $('.ui.basic.request.modal').modal('show');
  }

  render() {
    const isFetching = this.props.isFetching;
    const error = this.props.error;
    const initialized = this.props.initialized;
    const basicmodal=(()=>{
      return(
        <div className="ui basic request modal">
          <div className="ui icon header">
            <i className="archive icon"></i>
            Delete Publication
          </div>
          <div className="content">
            <p>Do you want to delete this publication?</p>
          </div>
          <div className="actions">
            <div className="ui red basic cancel inverted button">
              <i className="remove icon"></i>
              No
            </div>
            <div className="ui green ok inverted button" onClick={this.firedelete.bind(this)}>
              <i className="checkmark icon"></i>
              Yes
            </div>
          </div>
        </div>
      );
    });
    const successdelete=(()=>{
      return(
        <div className="ui basic successfuldelete modal">
          <div className="ui icon header">
            <i className="archive icon"></i>
            Successfully Deleted
          </div>
          <div className="content">
            <p>The publication has been successfully deleted</p>
          </div>
          <div className="actions">
            <div className="ui green ok inverted button" onClick={this.successfullydeleted.bind(this)}>
              <i className="checkmark icon"></i>
              Close
            </div>
          </div>
        </div>
      );
    })
    if(isFetching) {
      return (
        <div className="content">
          <div className="center">
            <div className="ui active text loader">Loading</div>
          </div>
        </div>
      );
    } else if(error) {
      return (
        <div className="content">
          <div className="center">
            <div className="ui icon negative message">
              <i className="refresh icon" onClick={this.props.refresh}></i>
              <div className="content">
                <div className="header">
                  Unable to fetch Publications.
                </div>
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }else if(!initialized) {
        return (
          <div className="content">
            <div className="center">
              <div className="ui active text loader">Initializing</div>
            </div>
          </div>
        );
      } else {
      return(
        <div className="publicationDetails">
          <div className="publicationDetails_wrapper">
                {basicmodal()}
                {successdelete()}
            <PublicationDescription firebutton={this.firebutton} showmodal={this.showmodal}/>
            <h4 className="ui horizontal divider header">
              <i className="tag icon"></i>
                Publications
            </h4>
            <Media files={this.props.details.media_files}/>
            <h4 className="ui horizontal divider header">
              <i className="tag icon"></i>
                Contributors
            </h4>
            <PublicationTeam team_members={this.props.details.team_members} />
            <h4 className="ui horizontal divider header">
              <i className="tag icon"></i>
                References
            </h4>
            <References references={this.props.details.references}/>
          </div>
        </div>
      );
    }
  }
}

export default PublicationDetails;
