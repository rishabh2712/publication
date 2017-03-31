import React, {Component} from 'react';
import { apiEndPoint } from '../../config';
import InsightGrid from './InsightGrid';
import {currentRoute} from '../../common/components/currentRoute/actions';
import './InsightList.css';

class InsightShowcase extends Component {
  constructor(props){
    super(props);
    this.state={
      imageUrl:""
    }
    this.openImage=this.openImage.bind(this);
  }

  componentDidMount() {
      this.props.dispatch(currentRoute(this.props.location.pathname));
      this.props.refresh();
  }

openImage(url1)
{
  this.setState({imageUrl:apiEndPoint + url1});
}

render(){
  const insight_content=(()=>{
    if(this.state.imageUrl!="")
    {
      return(
        <div className="insight-image">
          <div className="ui fluid image">
            <img src={this.state.imageUrl}/>
          </div>
        </div>
      )
    }else {
      return(
          <div className="emptydiv">
            <div className="emptydiv-content">
              Select an item to view
            </div>
          </div>
          )
        }
      })
  return(
    <div className="insight-wrapper">
      <div className="ui grid">
        <div className="five wide column">
          <div className="insight-list">
            <InsightGrid insights={this.props.insights} isFetching={this.props.isFetching} error={this.props.error} openImage={this.openImage} url={this.state.imageUrl}/>
          </div>
        </div>
        <div className="verticalLine"></div>
        <div className="ten wide column">
          {insight_content()}
        </div>
      </div>
    </div>
    )
  }
}
export default InsightShowcase;
