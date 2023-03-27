import { Button } from "components/Button/Button";
import PropTypes from 'prop-types';
import { getImages } from "components/getImages";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Component } from "react";
import { Circles } from 'react-loader-spinner';
import { ImageList } from "./ImageGallery.styled";




export class ImageGallery extends Component {

    state = {
        images: [],
        page: 1,
        error: null,
        searchImage: '',
       
        status: 'idle',
    }

    async componentDidUpdate(prevProps, prevState) {
        const searchImage = this.props.name;
   
        if (prevProps.name !== searchImage) return this.setState({ searchImage, images: [], page: 1 , status: 'pending' });
        
        if (prevState.searchImage !== this.state.searchImage || prevState.page !== this.state.page) {
            try {
                const response = await getImages(searchImage, this.state.page);

                if (!response.ok) return Promise.reject('Error');

                const newImages = await response.json();

                this.setState(prev => ({ images: [...prev.images, ...newImages.hits], status: 'resolved' }));

                } catch (error) {
                    console.error(error.message);
            };
        };
    };

    onMoreBtnClick = () => this.setState(prev => ({ page: prev.page + 1, status: 'pending' }));

    render() {
        if (this.state.images.length > 0) {
            return ( <>
                <ImageList>{this.state.images.map(
                ({ id, webformatURL, largeImageURL, tags }) => {
                    return <ImageGalleryItem
                        key={id}
                        webformatURL={webformatURL}
                        largeImageURL={largeImageURL}
                        tags={tags}
                    />
                }
            )}
            </ImageList>
                 {this.state.status === 'pending' && <Circles
                                                   height="80"
                                                   width="80"
                                                   radius="9"
                                                   color="green"
                                                   ariaLabel="loading"
                                                   wrapperStyle
                                                   wrapperClass/>
            }
                {this.state.status === 'resolved' && <Button type="button" onClick={this.onMoreBtnClick}>Load more...</Button>}
            </>) 
           
        }

        if (this.state.status === 'rejected') {
        return <p>{this.state.error.message}</p>
        }

        if (this.state.status === 'pending') {
            return <Circles
                      visible={true}
                      height="80"
                      width="80"
                      color="DEFAULT_COLOR"
                      ariaLabel="circles-loading"
                      wrapperStyle={{ marginLeft: 'calc(100% / 2.2)' }}
                      wrapperClass='circles-wrapper'/>
        }

       
    }
}
    
ImageGallery.propTypes = {
    searchImage: PropTypes.string,
};
    
