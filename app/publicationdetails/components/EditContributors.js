import React, { Component } from 'react';
import {addteam,fetchusers,invalidateaddteam} from '../../addproject/actions/addteam.js';
import {updateteam , update_contributor_invalidate} from '../actions';
import UserItemUpdate from './UserItemUpdate';
import { apiEndPoint } from '../../config';
import { Link, browserHistory } from 'react-router';

class StartTeam extends  Component {
  constructor(props){
    super(props);
    this.state={
      firstname:'',
      lastname:'',
      role:'',
      email:'',
      filedata:'',
      filestring:'',
      imagePreviewUrl:'',
      user_id:''
    }
    this.teamcard=this.teamcard.bind(this);
    this.handlefirstname=this.handlefirstname.bind(this);
    this.handlelastname=this.handlelastname.bind(this);
    this.handlerole=this.handlerole.bind(this);
    this.handleemail=this.handleemail.bind(this);
    this.handlephone=this.handlephone.bind(this);
    this.updateresquest=this.updateresquest.bind(this);
    this.handleimage=this.handleimage.bind(this);

  }

componentWillReceiveProps(nextProps){
  if(nextProps.selected_id){
    nextProps.team.map((user)=>{
      if(user.id==nextProps.selected_id){
        this.setState({
          firstname:user.first_name,
          lastname:user.last_name,
          role:user.role,
          email:user.email,
          imagePreviewUrl:apiEndPoint+user.team_member_picture.url,
          user_id:user.id
          });
        }
      })
    }
    if(nextProps.success){
      this.props.dispatch(fetchusers(this.props.project_id));
    }
  }

componentDidMount(){
  $('.special.cards .image').dimmer({on: 'hover'});
  this.props.dispatch(fetchusers(this.props.project_id));
}

handlefirstname(e){
this.setState({firstname:e.target.value})
}

handlelastname(e){
  this.setState({lastname:e.target.value})
}

handlerole(e){
  this.setState({role:e.target.value})
}

handleemail(e){
this.setState({email:e.target.value})
}

handlephone(e){
this.setState({phone:e.target.value})
}

handleimage(e){
  e.preventDefault();
   let reader = new FileReader();
   let file =e.target.files[0];
   reader.onload = (e) => {
     this.setState({
       filedata: e.target.result,
     });
   }
   reader.onloadend = () => {
     this.setState({
       filename:reader.name,
       imagePreviewUrl: reader.result
     });
   }
   reader.readAsDataURL(file);
}

updateresquest(){
  if(this.state.filedata!=""){
    let team_members={
      first_name:this.state.firstname,
      last_name:this.state.lastname,
      email: this.state.email,
      role: this.state.role,
      project_id:this.props.project_id,
      team_member_picture:this.state.filedata
    }
    this.props.dispatch(updateteam(team_members,this.state.user_id));
  }else{
    let team_members={
      first_name:this.state.firstname,
      last_name:this.state.lastname,
      email: this.state.email,
      role: this.state.role,
      project_id:this.props.project_id
    }
   this.props.dispatch(updateteam(team_members,this.state.user_id));
  }
}

skiptohome(){
  browserHistory.push("/publications");
}

gotoedit(){
  browserHistory.push("/publications/publication/"+this.props.project_id+"/edit");
}

teamcard(errorflag,errors,success,successmessage){
let {imagePreviewUrl} = this.state;
let $imagePreview = null;
if (imagePreviewUrl!="") {
  $imagePreview = (<img className="projimage" src={imagePreviewUrl} />);
} else {
  $imagePreview = (<img className="projimage" src="./../../assets/image.png"/>);
}
return(
  <div className="ui centered grid">
    <div className="eight wide column">
      <div className="ui special cards">
        <div className="card">
          <div className="blurring dimmable image">
            <div className="ui dimmer">
              <div className="content">
                <div className="center">
                  <input type="file" className="ui button" value={this.state.filename} onChange={(e)=>this.handleimage(e)}/>
                </div>
              </div>
            </div>
          {$imagePreview}
          </div>
          <div className="content">
            <div className="description">
              <div className="ui fluid input">
                <input type="text" placeholder="First Name" value={this.state.firstname} onChange={this.handlefirstname}/>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="description">
              <div className="ui fluid input">
                <input type="text" placeholder="Last Name" value={this.state.lastname} onChange={this.handlelastname}/>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="description">
              <div className="ui fluid input">
                  <input type="text" placeholder="Role" value={this.state.role} onChange={this.handlerole}/>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="description">
              <div className="ui fluid input">
                <input type="text" placeholder="Email" value={this.state.email} onChange={this.handleemail}/>
              </div>
            </div>
          </div>
          {this.errorflags(errorflag,errors)}
          {this.successflags(success,successmessage)}
          <div className="extra content">
          <div className="ui fluid two bottom attached buttons">
              <div className="ui secondary button" onClick={this.updateresquest}>Save</div>
              <div className="ui button" onClick={this.gotoedit.bind(this)}>Cancel</div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}

closeButton(){
  $('.message .close').on('click', function() {
  $(this).closest('.message').transition('fade');
    });
    this.props.dispatch(update_contributor_invalidate());
  }

  successflags(success,successmessage){
    if(success){
      return(
        <div className="ui success message">
            <i className="close icon" onClick={this.closeButton()}></i>
          <div className="header">
          Success
          </div>
          <p>{successmessage}</p>
        </div>
      )
    }
  }

  errorflags(errorflag,errors)
  {
    if(errors){
      return(
        <div className="ui negative message">
          <i className="close icon" onClick={this.closeButton()}></i>
          <div className="header">
          Error
          </div>
          <p>{errorflag}</p>
        </div>
      )
    }
  }

render(){
  let errors=this.props.errors;
  let isRequesting=this.props.isRequesting;
  let success=this.props.success;
  let errorflag=this.props.errormessage;
  let successmessage=this.props.successmessage;
  let isAddTeamRequesting=this.props.isAddTeamRequesting;

  return(
    <div className="teampage">
      <div className="page_header">
        Add members to your team
      </div>
      <div className="ui internally celled grid">
        <div className="eight wide column">
          <div className="ui grid">
            <div className="row">
            {this.props.team.map((user)=><UserItemUpdate user={user} key={user.id}/>)}
            </div>
          </div>
        </div>
        <div className="eight wide column">
          <div className="addteam">
              {this.teamcard(errorflag,errors,success,successmessage)}
          </div>
        </div>
      </div>
    </div>
    )
  }
}
export default StartTeam;
