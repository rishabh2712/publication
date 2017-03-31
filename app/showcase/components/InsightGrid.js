import React, {Component} from 'react';
import {currentRoute} from '../../common/components/currentRoute/actions';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import InsightItem from './InsightItem';
import './InsightList.css';

class InsightGrid extends Component {
  constructor(props){
    super(props);
  }

  componentWillReceiveProps(nextProps){

  }

  // componentDidMount() {
  //     // this.props.dispatch(currentRoute(this.props.location.pathname));
  //     this.props.refresh();
  // }


  render(){
    let insights=this.props.insights;
    let isFetching=this.props.isFetching;
    let error=this.props.error;
    if(error) {
      return (
        <div className="content">
          <div className="center">
            <div className="ui icon negative message">
              <i className="refresh icon" onClick={this.props.refresh}></i>
              <div className="content">
                <div className="header">
                  Unable to fetch insights.
                </div>
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if(isFetching) {
      return (
        <div className="content">
          <div className="center">
            <div className="ui active text loader">Loading</div>
          </div>
        </div>
      );
    }else{
      return(
        <div className="insights">
          <div className="insights_list">
            {this.props.insights.map((insight)=><InsightItem insight={insight} key={insight.id} url={this.props.url} openImage={this.props.openImage}/>)}
          </div>
        </div>
      )
    }
  }
}

export default InsightGrid;
