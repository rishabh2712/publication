import React, {Component} from 'react';
import { Link,browserHistory} from 'react-router';
import { connect } from 'react-redux';
import { processDemo } from '../actions';
import { apiEndPoint } from '../../config';
import "./ProjectGridItem.css";

class ProjectGridItem extends Component {
  constructor(props){
    super(props);
    this.getImage = this.getImage.bind(this);
  }

  getImage() {
    let imageUrl = apiEndPoint + this.props.project.project_picture.url;
    return imageUrl;
  }

  componentDidMount() {
    $(this.dimmer).dimmer({
      on: 'hover'
    });
  }

  render() {
    let link = "/publications/publication/" + this.props.project.id;
    const image_dimmer=(()=>{
    if(this.props.project.media_files.length!=0){
    let report_url=apiEndPoint+this.props.project.media_files[0].document_file.url;
      return(
        <div className="center">
            <div className="ui inverted button" onClick={()=>{browserHistory.push(link)}}>View Details</div>
          <div className="ui inverted button" onClick={()=>{window.open(report_url)}}>View Report</div>
        </div>
      )
    }else{
      return(
        <div className="center">
            <div className="ui inverted button" onClick={()=>{browserHistory.push(link)}}>View Details</div>
        </div>
      )
     }
    })
    return(
      <div className="column">
        <div className="ui raised card">
          <div className="blurring dimmable image" ref={(dimmer) => this.dimmer = dimmer}>
            <div className="ui dimmer">
              <div className="content">
                  {image_dimmer()}
              </div>
            </div>
            <img className="project-image" src= {this.props.project.project_picture.url === null ? "../assets/image.png" : this.getImage() }/>
          </div>
          <div className="content left aligned">
            <span className="right floated">
              <i className="thumbs up  outline icon"></i>
              {this.props.project.likes_count}
            </span>
            <div className="card-title">
              <a onClick={()=>{browserHistory.push(link)}}><h3> {this.props.project.title} </h3></a>
            </div>
            <div className="description">
              {this.props.project.description}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectGridItem;
