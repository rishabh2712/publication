import React, { Component } from 'react';
import PDFComponent from '../../common/components/PDFComponent';

class PDFViewer extends Component {
  render() {
    const path = "http://172.17.122.210:4040/media/projects/1/media/2";
    return(
      <div>
        <PDFComponent path={path}/>
      </div>
    );
  }
}
export default PDFViewer;
