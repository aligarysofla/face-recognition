import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';


const app = new Clarifai.App({
  apiKey: '8e49e31d404b44a68e7a6513c11e48fd'
 });

const particlesOptions = {
  particles: {
    number:{
      value:100,
      density:{
        enable:true,
        value_area:800
      }
    },
    shape:{
      type: 'circle'
    },
    size:{
      value:30,
      random: true,
      anim:{
        enable: true,
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state ={
      input:'',
      imageUrl:'',
      box:{}
    }
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box
  }

  
  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl : this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then((response) => this.calculateFaceLocation(response))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
              params={particlesOptions}
              
            />
        <Navigation /> 
        <Logo />
        <Rank />
        <ImageLinkForm  onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        
        <FaceRecognition imageUrl={this.state.imageUrl} />
        
      </div>
    );
  }
}

export default App;
