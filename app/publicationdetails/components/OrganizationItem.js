import React, { Component } from 'react';
import { apiEndPoint } from '../../config';
import './OrganizationItem.css';

class OrganizationItem extends Component{

  fetchOrganisationImage(id){
    let imageUrl = apiEndPoint + "media/organizations/"+id ;
    fetch(imageUrl, {
      headers: {
        'Authorization': this.props.authToken
      }
    })
    .then(response => response.blob())
    .then(imageBlob => {
      this.orgimg.src = URL.createObjectURL(imageBlob);
    })
    .catch(error => console.log(error));
  }

  componentDidMount(){
    this.fetchOrganisationImage(this.props.organization.id);
  }

 render(){
   return (
     <div className="two wide column">
          <img className="item_image" src="./../../assets/image.png" ref={(orgimg)=> this.orgimg = orgimg}/>
          <div className="customerpartnerheader">{this.props.organization.name}</div>
     </div>
    );
  }
}

export default OrganizationItem;
