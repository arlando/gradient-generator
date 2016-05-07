import React, { Component } from 'react';
import GradientController from '../containers/GradientController';
import ColorPicker from '../containers/ColorPicker';

// the big she-bang, the head honcho
class Honcho extends Component {

    render() {
        return (<div>
                <ColorPicker />
                <GradientController />
            </div>
        )
    }
}

export default Honcho
