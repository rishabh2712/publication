import React, {Component} from 'react';
import { Link } from 'react-router';
import {user_count,insight_count,publication_count} from '../actions/index'
import "./Admin.css";

class Admin extends Component{
  constructor(props)
  {
    super(props);
  }
  componentDidMount(){
    this.props.dispatch(user_count());
    this.props.dispatch(insight_count());
    this.props.dispatch(publication_count());
  }

  render(){
    return(
          <div className="Admin">
            <div className="ui six item menu">
              <a className="item">Home</a>
              <a className="item ">Portal</a>
              <a className="item">Reports</a>
              <a className="item ">Insights</a>
              <a className="item ">Manage Users</a>
              <a className="item ">Manage Permissions</a>
            </div>
            <div className="ui segment">
              <div className="ui header">DashBoard</div>
              <div className="ui divider"></div>
              <div className="DashBoard">
                <div className="ui centered grid">
                  <div className="row">
                    <div className="five wide column">
                      <div className="ui card">
                        <div className="content">
                          <Link to="/home/admin/users">
                            <div className="ui statistic">
                                <div className="value">
                                    {this.props.user_count}
                                </div>
                            </div>
                          </Link>
                        </div>
                        <div className="ui bottom attached button">
                          Total number of Users
                        </div>
                      </div>
                    </div>
                    <div className="five wide column">
                      <div className="ui card">
                        <div className="content">
                          <div className="ui statistic">
                              <div className="value">
                                {this.props.publication_count}
                              </div>
                          </div>
                        </div>
                        <div className="ui bottom attached button">
                          Total number of Reports
                        </div>
                      </div>
                    </div>
                    <div className="five wide column">
                      <div className="ui card">
                        <div className="content">
                          <div className="ui statistic">
                              <div className="value">
                                  {this.props.publication_count}
                              </div>
                          </div>
                        </div>
                        <div className="ui bottom attached button">
                          Total number of Insights
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ui three column doubling stackable grid container">
                <div className="column">
                  <div className="ui segment">
                    <div className="header">Trending Reports</div>
                    <div className="ui divider"></div>
                    <div className="ui feed">
                      <div className="event">
                        <div className="label">
                          <img src="../../assets/image.png"/>
                        </div>
                        <div className="content">
                          <div className="date">
                            100 Views
                          </div>
                          <div className="summary">
                             Drones for Warehouse Management​​​
                          </div>
                        </div>
                      </div>
                      <div className="event">
                        <div className="label">
                            <img src="../../assets/image.png"/>
                        </div>
                        <div className="content">
                          <div className="date">
                            85 Views
                          </div>
                          <div className="summary">
                             Digital System for Citizens Societies & Government
                          </div>
                        </div>
                      </div>
                      <div className="event">
                        <div className="label">
                            <img src="../../assets/image.png"/>
                        </div>
                        <div className="content">
                          <div className="date">
                            60 Views
                          </div>
                          <div className="summary">
                             Building Energy Management Systems​​
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="ui segment">
                    <div className="header">Recent Activity</div>
                    <div className="ui divider"></div>
                    <div className="ui feed">
                      <div className="event">
                        <div className="label">
                            <img src="../../assets/image.png"/>
                        </div>
                        <div className="content">
                          <div className="summary">
                            4 new users have signed-in today.
                          </div>
                        </div>
                      </div>
                      <div className="event">
                        <div className="label">
                          <img src="../../assets/image.png"/>
                        </div>
                        <div className="content">
                          <div className="summary">
                             Today, the portal has been visited by 27 users.
                          </div>
                        </div>
                      </div>
                      <div className="event">
                        <div className="label">
                          <img src="../../assets/image.png"/>
                        </div>
                        <div className="content">
                          <div className="summary">
                            The portal has been accessed 52 times today.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="ui segment">
                    <div className="header">Trending Insights</div>
                    <div className="ui divider"></div>
                    <div className="ui feed">
                      <div className="event">
                        <div className="label">
                          <img src="../../assets/image.png"/>
                        </div>
                        <div className="content">
                          <div className="date">
                            110 Views
                          </div>
                          <div className="summary">
                             BlockChain
                          </div>
                        </div>
                      </div>
                      <div className="event">
                        <div className="label">
                            <img src="../../assets/image.png"/>
                        </div>
                        <div className="content">
                          <div className="date">
                            105 Views
                          </div>
                          <div className="summary">
                             Digital System for Citizens Societies & Government
                          </div>
                        </div>
                      </div>
                      <div className="event">
                        <div className="label">
                            <img src="../../assets/image.png"/>
                        </div>
                        <div className="content">
                          <div className="date">
                            60 Views
                          </div>
                          <div className="summary">
                             Building Energy Management Systems​​
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        );
      }
    }
export default Admin;
