import React, {Component} from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkFrom from './components/imageLinkFrom/ImageLinkFrom';
import Rank from './components/rank/Rank';
import './App.css';
import Particle from './components/particle/Particle';
import Clarifai from 'clarifai';
import FaceRecognition from './components/faceRecognition/FaceRecognition';

const app = new Clarifai.App({
  apiKey: 'f3937a65c4b64e30a06d30199079b856'
 });

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  calculateFaceLocation = (data) =>  {
    console.log(data);
    const clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(clarifaiFace);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box}); 
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  render(){
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkFrom onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <Particle />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
