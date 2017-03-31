import React, { Component } from 'react';
import PublicationTeam from './PublicationTeam.js';
import { apiEndPoint } from '../../config';
import './PublicationTeam.css';

class TeamMemberItem extends Component{

  fetchteamImage(){
    this.teamimg.src=apiEndPoint+ this.props.user.team_member_picture.url;
  }

  componentDidMount(){
    this.fetchteamImage();
  }

render()
{
  return(
      <div className="four wide column">
        <div className="associate_content">
          <img className="associate_image" src="../../assets/image.png"  ref={(teamimg)=> this.teamimg = teamimg}/>
          <a className="associate_name">{this.props.user.first_name} {this.props.user.last_name}</a>
          <div className="meta">
            {this.props.user.email}
          </div>
          <div className="associate_role">{this.props.user.role}</div>
        </div>
      </div>
      );
    }
  }

export default TeamMemberItem;
