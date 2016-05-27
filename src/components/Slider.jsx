import React, { Component } from 'react';

class Slider extends Component {
    render () {
        return(<input type="range" {...this.props} />)
    }
}

export default Slider;
