import React, { Component, PropTypes } from 'react';
const { Hue } = require('react-color/lib/components/common/Hue');
const { Saturation } = require('react-color/lib/components/common/Saturation');
import { CustomPicker } from 'react-color';
import GradientView from '../components/GradientView';
import { connect } from 'react-redux';
import { setColor } from '../actions';


class ColorPicker extends Component {

    static defaultProps = {
        currentColor: PropTypes.func.isRequired
    };

    constructor (props) {
        super(props);

        this.props.setColor(this.props.hex);

        this.state = {
            gradient: []
        }
    }

    onChangeComplete = (color) => {

        if (typeof this.props.hex !== 'undefined') this.props.setColor(this.props.hex);

        this.props.onChange(color)
    };


    updateGradient(colors, interpolation) {

        interpolation = interpolation || this.state.interpolation;

        if (colors && colors.length > 1) {
            let gradientColors = colors.map(color => {
                return '#' + color.color
            });
            return gradient(gradientColors).rgb(interpolation)
        } else {
            return []
        }
    }


    render () {

        let saturationStyle = {
            width: '300px',
            height: '300px',
            position: 'relative'
        };

        let hueStyle = {
            height: '10px',
            width: '300px',
            position: 'relative'
        };

        return (
            <div>
                <p>Saturation</p>
                <div style={saturationStyle}>
                    < Saturation {...this.props} onChange={::this.onChangeComplete} />
                </div>
                <p>Hue</p>
                <div style={hueStyle}>
                    < Hue {...this.props} onChange={::this.onChangeComplete} />
                </div>
                <GradientView gradient={this.state.gradient} />
            </div>
        )
    }
}

export default connect(null, { setColor })(CustomPicker(ColorPicker))
