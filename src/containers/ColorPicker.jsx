import React, { Component, PropTypes } from 'react';
import { ChromePicker } from 'react-color';
import { connect } from 'react-redux';
import { setColor } from '../actions';


class ColorPicker extends Component {

    static defaultProps = {
        currentColor: PropTypes.func.isRequired
    }

    constructor (props) {
        super(props);
        let hex = 'd51c1c';

        this.state = {
            color: {
                r: '213',
                g: '28',
                b: '28'
            },
            colorObject: {
                hex: hex
            }
        }
    }

    onChangeComplete = (color) => {
        this.setState({
            color: color.rgb,
            colorObject: color
        });

        if (typeof this.state.colorObject.hex !== 'undefined') this.props.setColor(this.state.colorObject);
    };

    render () {

        let currentColorHEX = this.state.colorObject.hex;
        let currentColorStyle = {
            background: '#' + currentColorHEX
        };

        return (
            <div>
                <ChromePicker color={ this.state.color } onChangeComplete={::this.onChangeComplete}/>
            </div>
        )
    }
}

export default connect(null, { setColor })(ColorPicker)
