import React, {Component} from 'react';
import {currentRoute} from '../../common/components/currentRoute/actions';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import {addInsight,invalidateaddinsight} from '../actions/Insights';
import './Addinsight.css';

class AddInsight extends Component {
  constructor(props){
    super(props);
    this.state={
      title:'',
      description:'',
      filedata:'',
      imagePreviewUrl:'',
    }

    this.handletitle=this.handletitle.bind(this);
    this.handleimage=this.handleimage.bind(this);
    this.requestsave=this.requestsave.bind(this);
  }

  componentWillReceiveProps(nextProps){

  }

  componentDidMount() {
      this.props.dispatch(currentRoute(this.props.location.pathname));
      $('.special.cards .image').dimmer({on: 'hover'});
  }

  componentWillUnmount(){
    this.props.dispatch(invalidateaddinsight());
  }

  handletitle(e){
  this.setState({title:e.target.value});
  }

  handleimage(e){
  e.preventDefault();
   let reader = new FileReader();
   let file =e.target.files[0];
   reader.onload = (e) => {
     this.setState({
       filedata: e.target.result,
     });
   }
   reader.onloadend = () => {
     this.setState({
       imagePreviewUrl: reader.result
     });
   }
   reader.readAsDataURL(file);
  }

  requestsave(){
  this.props.dispatch(invalidateaddinsight());
  let insight={
    title:this.state.title,
    insight_image:this.state.filedata,
    user_id:this.props.user_id
  }
    this.props.dispatch(addInsight(insight));
  }

  closebutton(){
    $(this).closest('.message').transition('fade');
    browserHistory.push('/insights');
    this.props.dispatch(invalidateaddinsight());
  }

  render(){
    let isrequesting=this.props.isrequesting;
    let success=this.props.success;
    let successmessage=this.props.successmessage;
    let errormessage=this.props.errormessage;
    let errorflag=this.props.errorflag;
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    const errorbox=((errors,errormessage)=>{
      if(errors){
        return(
          <div className="ui error message">
            <div className="header">
              {errormessage}
            </div>
          </div>
        )
      }
    });
    const successbox=((success,successmessage)=>{
      if(success){
      return(
        <div className="ui success message">
          <i className="close icon" onClick={this.closebutton.bind(this)}></i>
          <div className="header">
            Success
          </div>
          <p>{successmessage}</p>
        </div>
        );
      }
    });
    if (imagePreviewUrl) {
      $imagePreview = (<img className="projimage" src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<img className="projimage" src="./../../assets/image.png"/>);
    }
    if(isrequesting){
      return(
           <div className="ui active text loader">Requesting Submission</div>
      )
    }
    else{
      return(
        <div className="addinsight">
            <div className="addwrapper">
              <div className="ui grid">
                <div className="left floated seven wide column">
                  <div className="ui special cards">
                    <div className="card">
                      <div className="blurring dimmable big image">
                        <div className="ui dimmer">
                          <div className="content">
                            <div className="center">
                             <input type="file" className="ui button"  onChange={(e)=>this.handleimage(e)}/>
                            </div>
                          </div>
                        </div>
                      {$imagePreview}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right floated eight wide column">
                  <div className="eight wide column">
                    <div className="ui fluid input">
                      <input type="text" placeholder="Title" value={this.state.title} onChange={this.handletitle}/>
                    </div>
                  </div>
                  <div className="eight wide column">
                    <div className="save_insight_button">
                      <div className="ui right floated buttons">
                        <button className="ui button" onClick={()=>{browserHistory.push('/insights')}}>Cancel</button>
                        <button className="ui primary button" onClick={this.requestsave}>Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {errorbox(errorflag,errormessage)}
              {successbox(success,successmessage)}
            </div>
        </div>
      )
    }
  }
}


const mapStateToProps = (state) => {
  return {
    isAuthenticated:state.login.isAuthenticated,
    success:state.projects_insights.insights.success,
    errorflag:state.projects_insights.insights.errorflag,
    successmessage:state.projects_insights.insights.successmessage,
    errormessage:state.projects_insights.insights.error,
    isrequesting:state.projects_insights.insights.isrequesting,
    user_id:state.login.user_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(AddInsight);
