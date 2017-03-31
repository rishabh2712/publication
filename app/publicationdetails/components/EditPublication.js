import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import {fetchcategory} from '../../addproject/actions/index.js';
import { apiEndPoint } from '../../config';
import {updatepublication,updateMedia,invalidate_publication_update,updateRef} from '../actions';
import './EditPublication.css';


class EditPublication extends Component {
  constructor(props) {
    super(props);
    this.state={
      title:this.props.details.title,
      category_id:this.props.details.category.id,
      description:this.props.details.description,
      filedata:'',
      imagePreviewUrl:apiEndPoint+this.props.details.project_picture.url,
      document_file:'',
      publication_name:'',
      size:'',
      format:'',
      docurl:'',
      media_id:"",
      status:'',
      user_id:this.props.user_id,
      references:this.props.details.references,
      editReferences:this.props.details.references,
      editref:false,
      changefile:false
    }
    this.requestsave=this.requestsave.bind(this);
    this.handletitle=this.handletitle.bind(this);
    this.handleimage=this.handleimage.bind(this);
    this.handledescription=this.handledescription.bind(this);
    this.handlecategory=this.handlecategory.bind(this);
    this.getCategoryHtml = this.getCategoryHtml.bind(this);
    this.handlemedia=this.handlemedia.bind(this);
    this.gotodetails=this.gotodetails.bind(this);
    this.closebutton=this.closebutton.bind(this);
    this.handlerefe=this.handlerefe.bind(this);
  }
  componentWillUnmount(){
    this.props.dispatch(invalidate_publication_update());
  }

  componentWillMount(){
    this.props.dispatch(fetchcategory());
  }

  componentDidMount(){
    if(this.props.details.media_files.length!=0){
      this.setState({docurl:apiEndPoint+this.props.details.media_files[0].document_file.url,
        publication_name:this.props.details.media_files[0].name,  media_id:this.props.details.media_files[0].id})
    }else{
      this.setState({status:'empty'});
    }
    $('.special.cards .image').dimmer({on: 'hover'});
    $('.ui.dropdown').dropdown();
    this.props.dispatch(fetchcategory());
  }

  handletitle(e){
    this.setState({title:e.target.value});
  }

  handlecategory(e){
    this.setState({category_id:e.target.value});
  }

  handledescription(e){
   this.setState({description:e.target.value});
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
         publication_name: file.name,
         size: file.size,
         format: file.type,
         changefile:true
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

  getCategoryHtml(cat){
    return(
           <option value={cat.id} key={cat.id}>{cat.name}</option>
         )
    }

  handlerefe(e){
    e.preventDefault();
    let refs=this.state.editReferences;
    refs.map((ref)=>{
    if(e.target.id==ref.id)
    {
      ref.reference=e.target.value;
    }}
  )
    this.setState({
      editReferences:refs,
      editref:true
    })
  }

  requestsave(){
    if(this.state.filedata!=""){
      let project={
        title:this.state.title,
        category_id:this.state.category_id,
        description: this.state.description,
        project_picture:this.state.filedata,
        user_id:this.state.user_id
      }
        this.props.dispatch(updatepublication(project,this.props.details.id));
    }
    else{
      let project={
        title:this.state.title,
        category_id:this.state.category_id,
        description: this.state.description,
        user_id:this.state.user_id,
        }
        this.props.dispatch(updatepublication(project,this.props.details.id));
      }

      let media_file={
        project_id:this.props.details.id ,
        name: this.state.publication_name,
        document_file: this.state.document_file,
        size:this.state.size,
        format:this.state.format
      }
      if(this.state.changefile){
        if(this.state.status!='empty'){
        this.props.dispatch(updateMedia(media_file,this.props.details.media_files[0].id,this.state.status));
        }else{
          this.props.dispatch(updateMedia(media_file,this.state.status));
        }
      }
      if(this.state.editref){
        updateRef(this.state.editReferences,this.props.details.id,this.props.token);
      }
  }

  gotodetails(){
    browserHistory.push("/publications/publication/"+this.props.details.id)
  }

  closebutton(){
    $('.message .close').on('click', function() {
    $(this).closest('.message').transition('fade');
      });
    this.props.dispatch(invalidate_publication_update());
  }

  render(){
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
    const refe=((reference)=>{
      return(
      <div className="ui grid">
        <div className="eight wide column">
          <div className="ui fluid input">
            <input type="text" value={reference.reference} id={reference.id} onChange={this.handlerefe}/>
          </div>
        </div>
      </div>
    )});
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
    const errorbox=((errors,errormessage)=>{
      if(errors){
      return(
        <div className="ui negative message">
          <i className="close icon" onClick={this.closebutton.bind(this)}></i>
          <div className="header">
            Error
          </div>
          <p>{errormessage}</p>
        </div>
        );
      }
    })

    const updateform=((success,successmessage,errors,errormessage)=>{
      return(
        <div className="project_wrapper">
          <div className="ui grid">
            <div className="ui centered aligned four wide column">
              <div className="publication_header">
                <div className="ui header">
                  Edit Publication
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
            <div className="nine wide column">
              <div className="ui four wide right floated column">
                <div className="ui right floated right aligned button" onClick={()=>{browserHistory.push("/publications/publication/"+this.props.details.id+"/edit/contributors")}}>Edit Contributors</div>
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
              <button className="ui right floated right aligned ui secondary button button" onClick={this.requestsave}>
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
              <button className="ui right floated right aligned button" onClick={this.gotodetails}>
                Cancel
              </button>
            </div>
          </div>
          <div className="ui grid">
            <div className="nine wide column">
              <select className="ui fluid selection dropdown" onChange={this.handlecategory} value={this.state.category_id}>
                    {this.props.categories.map(category => this.getCategoryHtml(category))}
              </select>
            </div>
          </div>
          <div className="ui grid">
            <div className="five wide column">
             Edit Publication <i className="attachment icon"></i>
            </div>
            <div className=" eight wide column">
              <a onClick={()=>{window.open(this.state.docurl)}}>{this.state.publication_name}</a>
              <input type="file" className="hidden-new-file"  onChange={(e)=>this.handlemedia(e)}/>
            </div>
          </div>
          {this.props.details.references.map((reference)=>refe(reference))}
          {errorbox(errors,errormessage)}
          {successbox(success,successmessage)}
        </div>
      )
    })
    return(
      <div className="editPublication">
        {updateform(success,successmessage,errors,errormessage)}
      </div>
    )
  }
}

export default EditPublication;
