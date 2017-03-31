import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';

class TabsObject extends Component {

  componentDidMount(){
    $(this.showCaseTab).tab();
    $(this.insights).tab();
  }

  render(){
    return(
      <div>
        <div className="ui secondary pointing menu">
          <IndexLink to="/publications" activeClassName="active" className="item" data-tab="tab-content" ref={(tab) => this.showCaseTab = tab}>
            Publications
          </IndexLink>
          <Link to="/insights" activeClassName="active" className="item" data-tab="tab-content" ref={(tab) => this.insights= tab}>
            Insights
          </Link>
        </div>
        <div className="ui active tab" data-tab="tab-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {

  };
};

const Tabs = connect(
  mapStateToProps
)(TabsObject);

export default Tabs;
