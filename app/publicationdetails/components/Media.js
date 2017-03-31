import React, { Component } from 'react';
import MediaItem from './MediaItem';
import './Media.css';

class Media extends Component {

render()
{
  const files=(()=>{
    if(this.props.files.length){
      return(
        <div className="row">
          {this.props.files.map((file)=>
            <MediaItem file={file} key={file.id} mediaId={file.id}/>
          )}
        </div>
      )
    }else{
      return(
        <div className="nofilepresent">
          No files present
        </div>
      )
    }
  })
  return(
    <div className="pub_media">
      <div className="ui grid">
        {files()}
      </div>
    </div>
    );
  }
}
export default Media;
