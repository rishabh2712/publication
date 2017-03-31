import React, {Component} from 'react';
import { connect } from 'react-redux';
import {change_password,change_password_invalidate} from '../actions/changePassword';
import './ChangePassword.css';

class ChangePassword extends Component{
  constructor(props){
    super(props);
    this.state = {
      oldpassword: '',
      newpassword: '',
      confirmpassword:''
    }
    this.handleoldpassword =this.handleoldpassword.bind(this);
    this.handlenewpassword =this.handlenewpassword.bind(this);
    this.handleconfirmpassword =this.handleconfirmpassword.bind(this);
    this.changeRequest=this.changeRequest.bind(this);
  }

  handleoldpassword(event){
    this.setState({oldpassword: event.target.value});
  }
  handlenewpassword(event){
    this.setState({newpassword: event.target.value});
  }
  handleconfirmpassword(event){
    this.setState({confirmpassword: event.target.value});
  }
  changeRequest(){
    this.props.dispatch(change_password(this.state.oldpassword,this.state.newpassword,this.state.confirmpassword));
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.success){
      this.setState({oldpassword: '',  newpassword: '',  confirmpassword:''})
    }
  }

  componentWillUnmount(){
    this.props.dispatch(change_password_invalidate());
  }

  render(){
    const isRequesting=this.props.isRequesting;
    const errors=this.props.errors;
    const success=this.props.success;
    const errormessage=this.props.errormessage;
    const errorsuccess=(msg)=>{
      if(errors){
      return(
          <div className="ui error message">{msg}</div>
      )}else if(success){
        return(
          <div className="ui success message">{msg}</div>
        )
      }
    }
    const message=this.props.message;
    const changeUI=(msg)=>{
      return(
        <div className="ui middle aligned center aligned grid">
          <div className="change">
            <div className="cpassheader">
                Change Password
            </div>
            <form className="ui large form error success">
              <div className="ui stacked secondary segment">
                <div className="field">
                  <div className="ui left icon input">
                      <i className="lock icon"></i>
                      <input type="password" onChange={this.handleoldpassword} placeholder="Old Password"/>
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input type="password" onChange={this.handlenewpassword} placeholder="New Password"/>
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input type="password" onChange={this.handleconfirmpassword} placeholder="Confirm Password"/>
                  </div>
                </div>
                {errorsuccess(msg)}
                <div className="ui fluid large orange submit button" onClick={this.changeRequest}>Submit</div>
              </div>
              <div className="ui error message"></div>
            </form>
          </div>
        </div>
      )
    }
    if(errors) {
      return (
        <div>
          {changeUI(errormessage)}
        </div>
      );
    } else if(isRequesting) {
      return (
        <div className="ui loading form">
          <div className="field">
            <label></label>
            <input type="email" placeholder="joe@schmoe.com"/>
          </div>
          <div className="ui submit button">Submit</div>
        </div>
      );
    }else if(success) {
      return (
        <div>
          {changeUI(message)}
        </div>
      );
    }else{
      return(
      <div>
      {changeUI()}
      </div>
      )
     }
   }
 }

const mapStateToProps = (state) => {
  return {
    isRequesting:state.home.ChangePasswordRequest.isRequesting,
    errors:state.home.ChangePasswordRequest.errors,
    success:state.home.ChangePasswordRequest.success,
    didInvalidate:state.home.ChangePasswordRequest.didInvalidate,
    errormessage:state.home.ChangePasswordRequest.errorMessage,
    message:state.home.ChangePasswordRequest.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ChangePassword);
