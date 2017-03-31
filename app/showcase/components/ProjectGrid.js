import React, {Component} from 'react';
import ProjectGridItem from './ProjectGridItem';
import { fetchProjectsIfNeeded, invalidateProjects,fetchPublications} from '../actions';
import {fetchcategory,fetchorg} from '../../addproject/actions/index';
import {currentRoute} from '../../common/components/currentRoute/actions';
import { apiEndPoint } from '../../config';
import $ from 'jquery';
import "./ProjectGrid.css";

class ProjectGrid extends Component {
  constructor(props){
    super(props);
    this.showReports=this.showReports.bind(this);
  }

  componentDidMount() {
      if(this.props.isAuthenticated){
      this.props.dispatch(fetchcategory());
      this.props.dispatch(fetchPublications());
      this.props.dispatch(currentRoute(this.props.location.pathname));
    }
      this.props.dispatch(fetchProjectsIfNeeded(this.props.publication_id));
  }

  getImage(url) {
    let imageUrl = apiEndPoint + url;
    return imageUrl;
  }

  showReports(id){
      this.props.dispatch(fetchProjectsIfNeeded(id));
  }

  render() {
    let selected_class="";
    const isFetching = this.props.isFetching;
    const error = this.props.error;
    const publicationItem=((publication)=>{
      selected_class=(publication.id==this.props.publication_id ? "publication-card selected" : "publication-card" )
      return(
        <div className="column" key={publication.id}>
          <div className={selected_class}>
            <div className="ui items">
              <div className="item">
                <div className="image">
                  <img src= {publication.display_image.url === null ? "../assets/image.png" : this.getImage(publication.display_image.url)}/>
                </div>
                <div className="content">
                  <a className="header publication_title" onClick={()=>{this.showReports(publication.id)}}>{publication.title}</a>
                  <div className="extra tagline">
                    "{publication.tagline}"
                  </div>
                  <div className="description">
                    <p>{publication.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
      })
    const reportsItem=(()=>{
      if(error) {
        return (
            <div className="content">
              <div className="center">
                <div className="ui icon negative message">
                  <i className="refresh icon" onClick={this.props.refresh}></i>
                  <div className="content">
                    <div className="header">
                      Unable to fetch projects.
                    </div>
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        } else if(isFetching) {
          return (
            <div className="showcase-container">
              <div className="showcase-loader">
                <div className="ui active text loader">Loading</div>
              </div>
            </div>
          );
        } else if(this.props.projects.length=== 0) {
          return (
            <div className="content">
              <div className="center">
                <div className="ui message">
                  <div className="header">
                    No publications found under this category.
                  </div>
                </div>
              </div>
            </div>
          );
        } else{
          return(
            <div className="showcase-container">
              <div className="ui three column wide stackable grid padded">
                {this.props.projects.map((project, idx) =>
                  <ProjectGridItem key={project.id} project={project} authToken={this.props.authToken}/>
                )}
              </div>
            </div>
          )
        }
      })
      return(
        <div>
          <div className="ui three column wide stackable grid padded">
          {this.props.publications.map((publication)=>publicationItem(publication))}
          </div>
          <div className="ui divider"/>
            {reportsItem()}
        </div>
      );
    }
  }

export default ProjectGrid;
