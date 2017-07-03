import React, { Component } from 'react';
import axios from 'axios';

import './Gallery.css';
import Image from '../Image/Image';
import Popup from '../Popup/Popup';


export default class Gallery extends Component {
    constructor() {
        super();
        this.state = {
            imageList: [],
            modalData: {},
            openModal: false  
        }

        //Get Data from tumlr API

        this.getData = function() {
            return axios({  
              method:'get',
              url:'http://api.tumblr.com/v2/blog/passport-life.tumblr.com/posts/photo?api_key=SOiMe7M47zoEcQYKtnuzjO6Kcq2M1dAZESAQ9ipStoqvpMMYpT&notes_info=true',
              dataType:'jsonp'
            })
            .then(function(response) {
                var data = response.data.response.posts;
                var imageList = [];
                for (var i = 0; i < data.length; i++) {
                    var imageData = {};
                    imageData.id = data[i].id;
                    imageData.url = data[i].photos[0].original_size.url;
                    imageData.date = data[i].date.replace('GMT', '');
                    imageData.caption = data[i].caption.replace('<p>', '').replace('</p>', '');
                    imageList.push(imageData);
                }
                return imageList;
            })
        }

        //Set imageList array to response data 

        this.getData().then(serverImageList => {
            this.setState({imageList: serverImageList})
        });
    }

    // Function triggered by ImageComponent for openning Popup-Modal 

    onOpenModal(imageData) {
        this.setState({
            modalData: imageData,
            openModal: true
        });
    }

    // Function triggered by PopupComponent for closing Popup-Modal    

    onCloseModal() {
        this.setState({
            openModal: false
        });
    }

    render() {
        // Run over imageList array and create/render each image

        this.images = this.state.imageList.map((image, i) => 
            <Image
             key={i} 
             id={image.id} 
             url={image.url} 
             caption={image.caption} 
             date={image.date} 
             openModal={this.onOpenModal.bind(this)} 
             />)

        return (
            <div className="row text-center">
            	{this.images}
                {!this.state.openModal || 
                <Popup url={this.state.modalData.url} 
                caption={this.state.modalData.caption} 
                date={this.state.modalData.date} 
                closeModal={this.onCloseModal.bind(this)} 
                />}
            </div>
        );
    }
}
