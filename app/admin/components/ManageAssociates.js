import React, {Component} from 'react';
import { Link } from 'react-router';
import {invalidateRoute,currentRoute} from '../../common/components/currentRoute/actions';
import {invalidateUsers,fetchUser, requestuser} from '../actions/fetch_users';
import {change_status_invalidate} from '../actions/enable_disable';
import "./Admin.css";

class ManageAssociates extends Component{
  constructor(props)
  {
    super(props);
    this.status= '';
    this.statusid='';
    this.changeStatusrequest= this.changeStatusrequest.bind(this);
  }

  componentDidMount(){
    this.props.dispatch(requestuser());
    this.props.dispatch(fetchUser());
    $('ui.selection.dropdown').dropdown();
  }

  changeStatusrequest(e){
    this.status =e.target.value;
    this.statusid =e.target.id;
    this.props.enableStatus(this.status,this.statusid);
  }

  componentWillMount(){
    this.props.dispatch(currentRoute(this.props.location.pathname));
    this.props.dispatch(change_status_invalidate());
  }

  render(){
      const isFetchingUser=this.props.isFetchingUser;
      const error=this.props.user_fetch_error;
      const success=this.props.user_fetch_success;
      const changestatuserror=this.props.changestatuserror;
      const isReq=this.props.isRequesting;
      const user_id=this.props.user_id;
      const statusdropdown=(user,isReq,changestatuserror,user_id)=>{
        if(isReq && user_id==user.id){
          return(
            <td>
              <div className="ui loading selection dropdown">Changing Status
                <i className="dropdown icon"></i>
              </div>
            </td>
          )
        }
        else if(changestatuserror && user_id==user.id){
          return(
               <td className="negative">Unable to change status</td>
             );
           }
        else if(user.access){
            return(
              <td>
                <button className="ui negative basic button" value="false" onClick={this.changeStatusrequest} id={user.id}>Disable</button>
              </td>
            )
        }
        else if(!user.access){
            return(
              <td>
                <button className="ui positive basic button" onClick={this.changeStatusrequest} id={user.id} value="true">Enable</button>
              </td>
            )
          }
        }
      const userdata=this.props.users.map((user)=>{
        return(
        <tr key={user.id}>
          <td>{user.first_name} {user.last_name}</td>
          <td>{user.email}</td>
          <td>{user.permission.role}</td>
            {statusdropdown(user,isReq,changestatuserror,user_id)}
        </tr>
        )
      });
      if(error) {
        return (
          <div className="content">
            <div className="center">
              <div className="ui icon negative message">
                <i className="refresh icon" onClick={this.props.refresh}></i>
                <div className="content">
                  <div className="header">
                    Unable to fetch users list
                  </div>
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        );
      } else if(isFetchingUser){
        return (
          <div className="content">
            <div className="center">
              <div className="ui active text loader">Loading</div>
            </div>
          </div>
        );
      }else{
      return(
          <div className="ui basic clearing segment">
          <h3 className="ui right floated header">
          <Link to="/home/admin/manageassociates/addassociate"><button className="ui primary button">
            Add Associate
          </button></Link>
          </h3>
          <h3 className="ui left floated header">
            Manage Associates
          </h3>
            <table className="ui fixed table">
              <thead>
                  <tr>
                    <th>Associates Name</th>
                    <th>Email Id</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                {userdata}
              </tbody>
            </table>
          </div>
      );
    }
  }
}
export default ManageAssociates;
