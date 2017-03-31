import React, {Component} from 'react';
import { Link } from 'react-router';
import "./Admin.css";

class AddAssociate extends Component{
  constructor(props)
  {
    super(props);
  }
  render(){
    return(
      <div className="ui container">
        <div className="ui basic segment">
          <div className="ui header">Add Associate</div>
            <div className="ui divider"></div>
              <div className="ui big form">
                <div className="field ">
                  <label>User ID</label>
                  <input type="text" placeholder="mail@site.com"/>
                </div>
                <div className="fields">
                  <div className="field">
                  <label>First Name</label>
                    <input type="text" placeholder="First Name"/>
                  </div>
                  <div className="field">
                  <label>Last Name</label>
                    <input type="text" placeholder="Last Name"/>
                  </div>
                </div>
                <div className="three wide column field">
                  <label>User Role</label>
                  <select className="ui dropdown">
                    <option value="">Role</option>
                    <option value="Incubator">Incubator</option>
                    <option value="EIR">EIR</option>
                    <option value="Customer">Customer</option>
                    <option value="Sales Lead">Sales Lead</option>
                  </select>
                </div>
                <button className="ui secondary button">
                  Save
                </button>
                <button className="ui button">
                  Cancel
                </button>
              </div>
        </div>
      </div>
    );
  }
}

export default AddAssociate;
