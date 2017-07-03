import React, { Component } from 'react';

import './Popup.css';

export default class Popup extends Component {

  //Function calling GalleryComponent function for closing Popup-Modal 
  
  onCloseModal() {
    this.props.closeModal();
  }

  render() {
    const modalId = this.props.id;
    const modalUrl = this.props.url;
    const modalCaption = this.props.caption;
    const modalDate = this.props.date;    

    return (
      <div id={modalId} className="overlay" onClick={this.onCloseModal.bind(this)}>
        <div className="popup">
          <button className="close" onClick={this.onCloseModal.bind(this)}>&times;</button>
          <div className="content">
            <img src={ modalUrl } className="img-responsive" alt="logo"/>
            <p className="text-center"><span className="title">Location</span>: { modalCaption }</p>
            <p className="text-center"><span className="title">Date</span>: { modalDate }</p>
          </div>
        </div>
      </div>
    );
  }
}
