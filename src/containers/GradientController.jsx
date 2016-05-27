// this controls setting up the input of gradients

import React, { Component, PropTypes } from 'react';
import ColorDataOutput from '../components/ColorDataOutput';
const gradient = require('tinygradient');
import Slider from '../components/Slider';
import { addColor } from '../actions';
import { connect } from 'react-redux';

class GradientController extends Component {

    static propTypes = {
        colors: PropTypes.arrayOf(React.PropTypes.object),
        reverse: PropTypes.bool,
        addColor: PropTypes.func.isRequired,
        onChangeInterpolation: PropTypes.func.isRequired
    };

    addColor = () => {
        if (typeof this.props.currentColor !== 'undefined') this.props.addColor(this.props.currentColor);
    };

    render() {
        return (
            <div className="gradient-controller">

                <div>
                    <div>
                        {gradient}
                    </div>
                </div>

                <div className="gradient-picker">
                    <div>
                        <p>
                            Step Size - {this.props.interpolation}
                        </p>
                    </div>
                    <div>
                        <Slider min={2} max={100} defaultValue={7} onMouseUp={this.props.onChangeInterpolation} />
                    </div>
                    <button className="add-current-color" onClick={::this.addColor} >Add Color</button>
                </div>
                <ColorDataOutput className="gradient-output-colorsre" {...this.props} buttonText="Copy HEX" title={'HEX Codes'}/>
                <ColorDataOutput className="gradient-output-gradient" gradients={this.props.gradient} buttonText="Copy Gradient" title={'Gradient'} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        colors: state.colors,
        currentColor: state.currentColor
    }
}

export default connect(mapStateToProps, { addColor } )(GradientController);
