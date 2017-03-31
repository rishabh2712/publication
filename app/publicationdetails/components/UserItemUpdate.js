import React, { Component } from 'react';
import { apiEndPoint } from '../../config';
import {selectedUser} from '../../addproject/actions/addteam.js';
import { connect } from 'react-redux';

class UserItemUpdate extends Component{
  constructor(props) {
    super(props);
}
  componentDidMount(){
    this.userimg.src = apiEndPoint + this.props.user.team_member_picture.url;
  }

 render(){
   return (
       <div className="five wide column">
         <div className="ui fluid card">
           <div className="image">
             <img src="./../../assets/image.png" ref={(userimg) => this.userimg = userimg}/>
           </div>
           <div className="content">
             <a className="header" onClick={()=>{this.props.dispatch(selectedUser(this.props.user.id))}}>{this.props.user.first_name} {this.props.user.last_name}</a>
           </div>
         </div>
       </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {

  };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch,

});


export default connect(mapStateToProps,mapDispatchToProps)(UserItemUpdate);
