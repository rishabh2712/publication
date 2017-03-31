import React, { Component } from 'react';
import { apiEndPoint } from '../../config';
import './StartTeam.css';

class UserItem extends Component{

  fetchImage(id){
    let imageUrl = apiEndPoint + "team_members/" + id ;
    fetch(imageUrl)
    .then(response => response.blob())
    .then(imageBlob => {
      this.userimg.src = this.props.user.team_member_picture.url;
    })
    .catch(error => console.log(error));
  }

  componentDidMount(){
    this.userimg.src = apiEndPoint + this.props.user.team_member_picture.url;
    console.log(this.userimg.src);
  }

 render(){
   return (
       <div className="five wide column">
         <div className="ui fluid card">
           <div className="image">
             <img src="./../../assets/image.png" ref={(userimg) => this.userimg = userimg}/>
           </div>
           <div className="content">
             <a className="header">{this.props.user.first_name} {this.props.user.last_name}</a>
           </div>
         </div>
       </div>
    );
  }
}

export default UserItem;
