import React, { Component } from 'react';
import { apiEndPoint } from '../../config';
import {like_status,post_like,fetchpublicationDetails,invalidate_like_status} from '../actions';
import { connect } from 'react-redux';
import './PublicationDescription.css';

class PublicationDescription extends Component {
  constructor(props) {
    super(props);
      this.doLike=this.doLike.bind(this);
      this.postlike=this.postlike.bind(this)
    }
    componentWillUnmount(){
      this.props.dispatch(invalidate_like_status());
    }

  componentDidMount() {
    this.fetchPublicationImage(this.props.details.project_picture.url);
    this.props.dispatch(like_status(this.props.details.likes,this.props.details.likes_count,this.props.user_id));
  }

  fetchPublicationImage(url) {
    let imageUrl = apiEndPoint + url;
    this.PublicationImage.src =imageUrl;
    }

  postlike(){
   this.props.dispatch(post_like(this.props.details.id));
  }

  doLike(){
  let active=this.props.like_status;
  let count= this.props.count;
    if(active){
      return(
      <div>
        <div className="ui left labeled button">
          <a className="ui basic label">
            {count}
          </a>
          <div className="ui icon button" onClick={() => {this.postlike()}}>
            <i className="thumbs up icon" ></i>
          </div>
        </div>
        <div className="like_label">
         You liked this
        </div>
      </div>
      )
    }else{
      return(
        <div className="ui left labeled button">
          <a className="ui basic label">
            {count}
          </a>
          <div className="ui icon button" onClick={() => {this.postlike()}}>
            <i className="thumbs up outline icon" ></i>
          </div>
        </div>
       )
     }
   }

render(){
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
  return(
    <div className="pub_description">
      <div className="ui grid">
        <div className="ui six wide column">
          <img className="ui image" src="./../../assets/image.png" ref={(PublicationImage) => this.PublicationImage = PublicationImage}/>
        </div>
        <div className="ui left floated left aligned six wide column">
          <h1 className="ui header">
            {this.props.details.title}
            <div className="sub header">by {this.props.details.user.first_name} {this.props.details.user.last_name}</div>
          </h1>
          <div className="category">
            <div className="ui grid">
              <div className="left floated left aligned eight wide column">
                <div>{this.props.details.category.name}</div>
              </div>
            </div>
          </div>
          <div className="right floated right aligned eight wide column">
            {this.doLike()}
          </div>
        </div>
        <div className="four wide column">
          <div className="ui right floated buttons">
          <button className="ui button" onClick={this.props.firebutton}>Edit</button>
          <div className="or"></div>
          <button className="ui secondary button" onClick={this.props.showmodal}>Delete</button>
          </div>
        </div>
      </div>
      <div className="ui grid">
        <div className="left aligned sixteen wide column">
          {this.props.details.description}
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
return {
details:state.publication_details_update.publicationDetails.details,
like_status:state.publication_details_update.publicationDetails.like_status,
count:state.publication_details_update.publicationDetails.count,
user_id:state.login.user_id
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps,mapDispatchToProps)(PublicationDescription);
