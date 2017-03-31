import React, { Component } from 'react';
import { apiEndPoint } from '../../config';
import MediaView from './MediaView';
import { Link, browserHistory } from 'react-router';
import './Media.css';

class MediaItem extends Component {

  constructor(props) {
    super(props);
    this.mediaWindow = null;
  }


  componentDidMount(){
    //this.fetchUserImage(this.props.file.id , this.props.projectId);
  }

  componentWillUnmount() {
    this.mediaWindow = null;
  }


  render(){
      return(
        <div className="five wide column">
          <div className="ui divided items">
            <div className="item">
              <div className="content">
                <div className="fileheader">{this.props.file.name}</div>
                <div className="extra">
                <MediaView file={this.props.file} mediaId={this.props.mediaId}/>
                </div>
                <a href="" download="" style={{display:"none"}} ref={downloadContainer => this.downloadContainer = downloadContainer}></a>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
export default MediaItem;
