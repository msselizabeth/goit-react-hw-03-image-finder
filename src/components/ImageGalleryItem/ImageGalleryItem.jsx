import { Component } from "react";
import PropTypes from 'prop-types';
import { Modal } from "components/Modal/Modal";
import { GalleryItem, GalleryItemImage } from "./ImageGalleryItem.styled";

export class ImageGalleryItem extends Component{
    
    state = {
        showModal: false,
    }

    toggleModal = () => {
    return this.setState(({showModal}) => ({
           showModal: !showModal
       }))
    }

    render() {
        const { largeImageURL, webformatURL, tags } = this.props;
        
        
        return (
         <GalleryItem>
                <GalleryItemImage src={webformatURL} alt={tags} onClick={this.toggleModal}/>
                {this.state.showModal &&
                    <Modal onClose={this.toggleModal}>
                     <img src={largeImageURL} alt={tags} />
                   </Modal>}
         </GalleryItem>
            
        )
    }
}

ImageGalleryItem.propTypes = {
    largeImageURL: PropTypes.string,
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
};