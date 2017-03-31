import React, { Component } from 'react';

class References extends Component {
  constructor(props){
    super(props);
  }

  render()
  {
    const references=((reference)=>{
        return(
          <a onClick={()=>{ location.assign("www.gooogle.com")}}><li>{reference.reference}</li></a>
        )
    })

    return(
      <div className="ui grid">
        <div className="ten wide column">
          <ul className="ui list">
          {this.props.references.map((reference)=> references(reference))}
          </ul>
        </div>
      </div>
    )
  }
}
export default References;
