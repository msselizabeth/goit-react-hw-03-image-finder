import { Component } from "react";
import { Toaster } from 'react-hot-toast';
import { ImageGallery } from "./ImageGallery/ImageGallery";



import { Searchbar } from "./Searchbar/Searchbar";

export class App extends Component {

  state = {
    imageName: '',
  }
  
  handleFormSubmit = pictureName => {
    this.setState({ imageName: pictureName })

  }

  render() {
    return (<div>
      <Searchbar onSubmit={this.handleFormSubmit} />
      <ImageGallery name={this.state.imageName}/>
      

    
    <Toaster/>
    </div>)
  }
}
