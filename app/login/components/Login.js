import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import { invalidateProjects } from './../../showcase/actions';
import { connect } from 'react-redux';
import './Login.css';
import '../containers/containers.js';
import usericon from '../../../build/assets/user.png';
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.nextPathname = '/publications';
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.showErrorMessage = this.showErrorMessage.bind(this);
  }
  handleEmailChange(event){
    this.setState({email: event.target.value});
  }
  handlePassChange(event){
    this.setState({password:event.target.value});
  }

  login(e){
    e.preventDefault();
    this.props.actions.loginUser(this.state);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.isAuthenticated){
      browserHistory.push(this.nextPathname);
      this.props.dispatch(invalidateProjects());
    }
  }

  showErrorMessage() {
    if(this.props.error) {
      return (
        <div style={{marginTop: 5}}>{this.props.statusText}</div>
      );
    } else {
      return (
        <div style={{visibility: 'hidden', marginTop: 5}}>Enter your credentials.</div>
      )
    }
  }
  render() {
    let isAuthenticating=this.props.isAuthenticating;
    return (
      <div className="MainWrapper">
        <div className="Content">
          <form className="ui large form">
            <div className="Heading">
              Login to your account
            </div>
            <div className='BoxWrapper'>
              <div className="Field">
                <img
                  style={{width: 50, height: 30, paddingRight: 15}}
                  src={require('../../../build/assets/user.png')}
                  alt='user'
                />
                  <div className="Input">
                    <input type="text" placeholder="E-mail address" onChange={this.handleEmailChange}/>
                  </div>
              </div>
              <div className="Field">
              <img
                style={{width: 50, height: 30, paddingRight: 15}}
                src={require('../../../build/assets/password.png')}
                alt='password'
              />
                <div className="Input">
                  <input type="password" name="password" placeholder="Password" onChange={this.handlePassChange}/>
                </div>
              </div>
              <div>
                 <button className="Button" onClick={this.login.bind(this)}>Login</button>
              </div>
            </div>
          </form>
        </div>
        {this.showErrorMessage()}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.login.isAuthenticated,
  isAuthenticating:state.login.isAuthenticating,
  statusText : state.login.statusText,
  error: state.login.error,
  user_id:state.login.user_id
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
