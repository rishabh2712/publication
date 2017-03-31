import React, { Component } from 'react';
import TeamMemberItem from './TeamMemberItem.js'
import { apiEndPoint } from '../../config';
import './PublicationTeam.css';

class PublicationTeam extends Component {
  constructor(props){
    super(props);
  }
  render()
  {
    return(
      <div>
        <div className="associate">
          <div className="ui grid">
            <div className="row">
              {this.props.team_members.map((user )=>
              <TeamMemberItem user={user} key={user.id}/>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PublicationTeam;
