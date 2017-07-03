import React, { Component } from 'react';

import './Image.css';


export default class Image extends Component {
 
  //Function calling GalleryComponent function for openning Popup-Modal
  
  onOpenModal() {
    this.props.openModal(this.props);
  }

  render() {
    const imageUrl = this.props.url;
    
    return (
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 text-center"> 
          <button type="button" className="image-box" onClick={this.onOpenModal.bind(this)}>
            <img src={ imageUrl } className="img-thumbnail" alt="logo"/>
          </button>
        </div>
    );
  }
}

