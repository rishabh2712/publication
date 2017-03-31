import React, {Component} from 'react';
import pdfjsLib from 'pdfjs-dist';

class PDFComponent extends Component {
  renderPDFPage(page) {
    let viewport = page.getViewport(2.0);
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    this.canvasContainer.appendChild(canvas);
    page.render(renderContext);
  }
  renderPDF(pdfDoc) {
    for(let num = 1; num <= pdfDoc.numPages; num++) {
      pdfDoc.getPage(num).then((page) => this.renderPDFPage(page));
    }
  }
  componentDidMount() {
    pdfjsLib.PDFJS.workerSrc = 'assets/pdf.worker.bundle.js';
    pdfjsLib.getDocument(this.props.path).promise.then((pdfDoc) => this.renderPDF(pdfDoc)).catch(error => console.log("Error: " + error));
  }
  render() {
    return(
      <div ref={canvasContainer => this.canvasContainer = canvasContainer}>
      </div>
    );
  }
}
export default PDFComponent;
