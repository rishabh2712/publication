import React, { Component } from 'react';
import Navbar from './Navbar.js';
import Menu from './Menu';
import {logoutUser} from '../actions/logout.js'
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import {invalidateRoute,currentRoute} from '../../common/components/currentRoute/actions';
import {action as toggleMenu} from 'redux-burger-menu';
import ProjectList from '../../showcase/components/containers/ProjectList';
import './burger.css';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.currentRoute !== nextProps.currentRoute) {
      if(this.props.isMenuOpen) {
        this.props.dispatch(toggleMenu(!this.props.isMenuOpen));
      }
      if(nextProps.currentRoute=="/publications"){
        this.reapplyStyle("#publications");
      }else if(nextProps.currentRoute=="/publications/add"){
        this.reapplyStyle("#createPublication");
      }else if(nextProps.currentRoute=="/insights/add"){
        this.reapplyStyle("#addInsight");
      }else{
        $('#publications').removeClass('menu-item-active');
        $('#publications').children().removeClass('hover');
        $('#publications').siblings().removeClass('menu-item-active');
        $('#publications').siblings().children().removeClass('hover');
      }
    }
    if(nextProps.logout.isLoggedOut){
      browserHistory.push('/login');
      history.pushState(null, null,nextProps.router.replace('/login'));
      window.addEventListener('popstate', function () {
      history.pushState(null, null,nextProps.router.replace('/login'));
      });
    }
  }

  componentWillMount(){
    if(!this.props.isAuthenticated){
      browserHistory.push('/login');
    }
  }
  componentDidMount(){
    if(!this.props.isAuthenticated){
      browserHistory.push('/login');
    }
  }

  reapplyStyle(el) {
    $(el).addClass('menu-item-active').siblings().removeClass('menu-item-active');
    $(el).children().addClass('hover');
    $(el).siblings().children().removeClass('hover');
  }

  onMenuItemClick(e) {
    e.preventDefault();
    let el = e.target;
    browserHistory.push(el.dataset.url);
    this.reapplyStyle(el);
  }

  renderCreatePublicationItem() {
      return (
        <a id="createPublication" className="clickable menu-item" data-url="/publications/add" onClick={(e) => this.onMenuItemClick(e)}>
          <div className="invitee_img" />
          Create and Publish
        </a>
      );
  }

  render(){
    return(
      <div className="home-container">
        <Navbar isMenuOpen={this.props.isMenuOpen} requestLogout={this.props.requestLogout}/>
        <Menu isOpen={this.props.isMenuOpen} customBurgerIcon={ false } width={ 215 } customCrossIcon={ false }>
          <a id="publications" className="clickable menu-item" data-url="/publications" onClick={(e) => this.onMenuItemClick(e)}>
            <div className="showcase_img"/>
              Publications
          </a>
          {this.renderCreatePublicationItem()}
          <a id="addInsight" className="clickable menu-item" data-url="/insights/add" onClick={(e) => this.onMenuItemClick(e)}>
            <div className="demo_img"></div>
            Add Insights
          </a>
          <a id="about" className="clickable menu-item" data-url="/publications" onClick={(e) => this.onMenuItemClick(e)}>
            <div className="about_img"/>
            About Us
          </a>
        </Menu>
        {this.props.children}
      </div>
     );
   }
}

const mapStateToProps = (state) => {
  return {
    isMenuOpen:state.burgerMenu.isOpen,
    logout: state.home.logout,
    currentRoute:state.currentRoute.Route,
    isAuthenticated:state.login.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    requestLogout: ()=>{
      dispatch(logoutUser());
    }
  };
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeContainer;
