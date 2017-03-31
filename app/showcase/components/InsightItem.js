import React, {Component} from 'react';
import { apiEndPoint } from '../../config';
import {currentRoute} from '../../common/components/currentRoute/actions';
import './InsightList.css';

class InsightItem extends Component {
  constructor(props){
    super(props);
  }

componentDidMount(){

      }


render(){
  let temp = JSON.stringify(this.props.insight.created_at).slice(1,11);
  let requestDate = new Date (temp);
  let url=apiEndPoint+this.props.insight.insight_image.url;
  let selected_class=(this.props.url== url ? "card_item selected" : "card_item");
  return(
    <div className={selected_class}>
      <div className="ui list">
        <div className="item">
        <i className="map marker icon"></i>
          <div className="content">
            <a className="header" onClick={()=>{this.props.openImage(this.props.insight.insight_image.url)}}>{this.props.insight.title}</a>
            <div className="description">Uploaded by {this.props.insight.user.first_name} {this.props.insight.user.last_name} on {requestDate.toString().slice(8,10)}-{requestDate.toString().slice(4,7)}-{requestDate.toString().slice(11,15)}</div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default InsightItem;
