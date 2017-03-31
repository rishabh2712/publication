import React, { Component } from 'react';
import { Link } from 'react-router';
import {action as toggleMenu} from 'redux-burger-menu';
import { connect } from 'react-redux';
import {browserHistory } from 'react-router';
import {invalidateRoute,currentRoute} from '../../common/components/currentRoute/actions';
import { apiEndPoint } from '../../config';
import { invalidateProjects, fetchProjectsIfNeeded } from '../../showcase/actions';
import './Navbar.css';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.logOut = this.logOut.bind(this);
    this.changePassword=this.changePassword.bind(this);
  }

  componentDidMount(){
    $(this.logout).dropdown();
  }

  componentWillReceiveProps(nextprops){
    let that = this;
    const categories = [];
    nextprops.categories.map((category) => {
      categories.push({
        id: category.id,
        title: category.name,
        description: "Sample category description"
      });
    })
    $(this.filter).search({
      source : categories,
      searchFields : [
        'title'
      ],
      searchFullText: false,
      onSelect: function(result, response) {
        that.props.dispatch(invalidateProjects());
        if(nextprops.publication_id){
          that.props.dispatch(fetchProjectsIfNeeded(nextprops.publication_id,result.id));
        }
      },
    });
  }

  toggleMenu(){
    this.props.dispatch(toggleMenu(!this.props.isMenuOpen));
  }

  logOut(){
      this.props.requestLogout();
  }

  changePassword(){

  }

  clearFilter(e){
  $('.result.content.title').val("");
    this.props.dispatch(fetchProjectsIfNeeded());
  }

  render() {
    const category_filter=(()=>{
      if(this.props.current_route=="/publications"){
      return(
        <div className="ui right aligned category search item" ref={(filter) => this.filter = filter}>
          <div className="ui transparent inverted icon input">
            <input className="prompt" type="text" placeholder="Filter Category..."/>
            <i className="filter link icon" onClick={this.clearFilter.bind(this)}></i>
          </div>
          <div className="results"></div>
        </div>
      )}
    });
    return (
      <div className="ui top fixed inverted borderless menu navbar">
        <div className="header item burgericon" onClick={this.toggleMenu}>
        <i className="content large  icon"></i>
        </div>
        <div className="brand-logo">
          <img className="logo" src="../../../assets/wishletion1.png"/>
        </div>
        <div className="right menu">
         {category_filter()}
          <div className="ui icon top right pointing dropdown item navbar-icon" ref={(tab) => this.logout = tab}>
            <div className="ui small image">
              <img src="../assets/options.png" />
            </div>
            <div className='menu'>
              <div className="item" onClick={()=>{browserHistory.push('/admin')}}>
               Admin
              </div>
              <div className="ui divider"/>
              <div className="item" onClick={this.logOut}>
                 Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.addProject.addProjectRequest.categories,
    current_route:state.currentRoute.Route,
    publication_id:state.projects_insights.showcase.publication_id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

const Navbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);

export default Navbar;
