import React, { Component } from 'react';
import { apiEndPoint } from '../../config';
import { Link, browserHistory } from 'react-router';
import PDFComponent from '../../common/components/PDFComponent';
import './Media.css';

class MediaView extends Component {
  constructor(props) {
    super(props);
    this.showMedia=this.showMedia.bind(this);
  }


showMedia(){
  let path = apiEndPoint+this.props.file.document_file.url;
    window.open(path);
  }

render(){
  const buttonText = () => {
    let text = "View";
    return <button className="ui secondary button button" onClick={() =>{this.showMedia()}}>{text}</button>;
  };
  return(
  <div>
  {buttonText()}
  </div>
  );
 }
}
export default MediaView;
