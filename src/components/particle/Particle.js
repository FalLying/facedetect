import React from 'react';
import Particles from 'react-particles-js';
import './Particle.css';

const particleConfig = {
    particles: {
        number: {
            value: 30,
            density:{
                enable: true,
                value_area: 800
            }
        }
    }
}

const Particle = () => {
    return (
        <Particles className='back' 
            params={{particleConfig}          
        }/>
    );
}

export default Particle;