import React, { Component } from 'react';
import {addproject,fetchcategory,invalidateaddproject,fetchorg,addMedia,addreferences} from '../actions/index.js'
import { Link, browserHistory } from 'react-router';
import FieldArraysForm from './reduxform';
import {invalidateRoute,currentRoute} from '../../common/components/currentRoute/actions';

import './StartProject.css';

class StartProject extends Component {
  constructor(props){
    super(props);
    this.state={
      title:'',
      category:'',
      description:'',
      filedata:'',
      imagePreviewUrl:'',
      document_file:'',
      name:'Choose File',
      size:'',
      format:'',
      references:'',
      publication_id:''
    }
    this.handletitle=this.handletitle.bind(this);
    this.handleimage=this.handleimage.bind(this);
    this.handledescription=this.handledescription.bind(this);
    this.handlecategory=this.handlecategory.bind(this);
    this.requestsave=this.requestsave.bind(this);
    this.getCategoryHtml = this.getCategoryHtml.bind(this);
    this.closebutton=this.closebutton.bind(this);
    this.handlemedia=this.handlemedia.bind(this);
    this.handlepublication=this.handlepublication.bind(this);
  }

  componentWillMount(){
  }

  componentDidMount(){
    $('.special.cards .image').dimmer({on: 'hover'});
    $('.ui.dropdown').dropdown();
    this.props.dispatch(fetchcategory());
    this.props.dispatch(currentRoute(this.props.location.pathname));
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.success){
      if(this.state.document_file!=''){
        let media_file={
          project_id:nextProps.project_id ,
          name: this.state.name,
          document_file: this.state.document_file,
          size:this.state.size,
          format:this.state.format
        }
        this.props.dispatch(addMedia(media_file));
      }
      if(nextProps.references.hasOwnProperty('values')){
        addreferences(nextProps.references.values.references,nextProps.project_id,this.props.token);
      }
      browserHistory.push("/publications/addTeam");
      this.props.dispatch(invalidateaddproject());
   }
 }

  handletitle(e){
    this.setState({title:e.target.value});
  }

  handlecategory(e){
    this.setState({category:e.target.value});
  }

  handledescription(e){
   this.setState({description:e.target.value});
  }

  handlepublication(e){
   this.setState({publication_id:e.target.value});
  }

  handlemedia(e){
    e.preventDefault();
     let mediareader = new FileReader();
     let file = e.target.files[0];
     mediareader.onload = (e) => {
       this.setState({
         document_file: e.target.result,
       });
     }
     mediareader.onloadend = (e) => {
       this.setState({
         name: file.name,
         size: file.size,
         format: file.type
       });
     }
     mediareader.readAsDataURL(file);
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
    let project={
      title:this.state.title,
      category_id:this.state.category,
      publication_id:this.state.publication_id,
      description: this.state.description,
      project_picture:this.state.filedata,
      user_id:this.props.user_id
    }
    this.props.dispatch(addproject(project));
  }

  gotohome(){
    browserHistory.push("/publications");
  }

  closebutton(){
    $(this).closest('.message').transition('fade');
    this.props.dispatch(invalidateaddproject());
  }

  getCategoryHtml(cat){
    return(
           <option value={cat.id} key={cat.id}>{cat.name}</option>
         )
    }

  getPublicationHtml(cat){
    return(
           <option value={cat.id} key={cat.id}>{cat.title}</option>
         )
    }


  render(){
    let fields=[];
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img className="projimage" src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<img className="projimage" src="./../../assets/image.png"/>);
    }
    let success=this.props.success;
    let successmessage=this.props.successmessage;
    let errors=this.props.errors;
    let errormessage=this.props.errormessage;
    let isrequesting=this.props.isrequesting;
    let refcount=0;

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
    })
    const errorflag=((errors,errormessage)=>{
      if(errors){
        return(
          <div className="ui error message">
            <i className="close icon" onClick={this.closebutton}></i>
            <div className="header">
              {errormessage}
            </div>
          </div>
        )
      }
    })
    const addPublication=((successmessage,errormessage,errors,success)=>{
        return(
          <div className="add_project">
            <div className="project_wrapper">
              <div className="ui grid">
                <div className="ui centered aligned four wide column">
                  <div className="publication_header">
                    <div className="ui header">
                      Add Publication
                    </div>
                  </div>
                </div>
              </div>
              <div className="ui grid">
                <div className="seven wide column">
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
              </div>
              <div className="ui grid">
                <div className="nine wide column">
                  <div className="publication_title">
                    <div className="ui fluid input">
                     <input type="text" placeholder="Title" value={this.state.title} onChange={this.handletitle}/>
                    </div>
                  </div>
                </div>
                <div className="seven wide column">
                  <button className="ui right floated right aligned ui secondary button" onClick={this.requestsave}>
                    Save
                  </button>
                </div>
              </div>
              <div className="ui grid">
                <div className="nine wide column">
                  <div className="ui form">
                    <div className="field">
                      <textarea rows="3" onChange={this.handledescription} value={this.state.description} placeholder="Desciption"></textarea>
                    </div>
                  </div>
                </div>
                <div className="seven wide column">
                  <button className="ui right floated right aligned button" onClick={this.gotohome}>
                    Cancel
                  </button>
                </div>
              </div>
              <div className="ui grid">
                <div className="four wide column">
                  <select className="ui fluid selection dropdown" onChange={this.handlecategory} value={this.state.category_id}>
                         <option value="">Category</option>
                        {this.props.categories.map(category => this.getCategoryHtml(category))}
                  </select>
                </div>
                <div className="four wide column">
                  <select className="ui fluid selection dropdown" onChange={this.handlepublication} value={this.state.publication_id}>
                         <option value="">Publication</option>
                        {this.props.publications.map(publication => this.getPublicationHtml(publication))}
                  </select>
                </div>
              </div>
              <div className="ui grid">
                <div className="four wide column">
                  <div className="fileUpload ui button" onChange={(e)=>this.handlemedia(e)}>
                      <span> Add Publication</span>
                      <input id="uploadBtn" type="file" className="upload" />
                  </div>
                </div>
                <div className="five wide column">
                  <div className="ui focus fluid input">
                    <input type="text" disabled="disabled" value={this.state.name}/>
                  </div>
                </div>
              </div>
              <div className="ui grid">
                <div className="twelve wide column">
                 <FieldArraysForm />
                </div>
              </div>
              {errorflag(errors,errormessage)}
              {successbox(success,successmessage)}
            </div>
          </div>
          )
        }
      )
    if(isrequesting){
      return(
      <div>
        <div className="ui active dimmer">
          <div className="ui large text loader">Requesting submission </div>
        </div>
        {addPublication(successmessage,errormessage,errors,success)}
      </div>
      )
    }else{
    return(
      <div>
       {addPublication(successmessage,errormessage,errors,success)}
      </div>
     )
   }
  }
}
export default StartProject;
