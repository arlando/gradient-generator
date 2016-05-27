import React, { Component } from 'react';
import GradientController from './GradientController';
import ColorPicker from './ColorPicker';
import { connect } from 'react-redux';
import { removeColor } from '../actions';
const gradient = require('tinygradient');

// app is a class holding the components together
class App extends Component {

    constructor(props) {
        super(props);

        this.state =  {
            interpolation:  7,
            colors: [],
            gradient: []
        }
    }

    changeInterpolation (e) {
        let value = e.target.value;

        this.setState({
            interpolation: value,
            gradient: this.updateGradient(this.props.colors, value)
        });
    }

    componentWillReceiveProps(newProps) {
        if (newProps.colors && newProps.colors.length && this.state.interpolation >= newProps.colors.length) {
            this.setState({
                gradient: this.updateGradient(newProps.colors)
            });
        } else if (!newProps.colors.length) {
            this.setState({
                gradient: []
            });
        }

    }

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

    removeGradient (key) {
        // removes a color from the props
        this.props.removeColor(key)
    }

    render() {

        let currentColorStyle = {
            backgroundColor: this.props.currentColor,
            minWidth: '20px',
            minHeight: '20px',
            borderRadius: '50%',
            display: 'inline-block'
        };

        let gradientStyle = {

        }

        let selectedColors = this.props.colors.map((color) => {

            let _color = color.color;
            let style = {
                background: _color,
                height: '10px',
                cursor: 'pointer'
            };

            return <div className='gradient-controller-interpolation'
                        key={color.id}
                        onClick={this.removeGradient.bind(this, color.id)}
                        style={style}>{_color.hex}</div>
        });

        let selectedGradients =  this.state.gradient.map((gradient, id) => {

            let style = {
                background: '#' + gradient.toHex(),
                height: '10px'
            };

            return <div
                key={id}
                style={style}></div>
        });

        return (<div className="app">
                <div className="half">
                    <ColorPicker />
                    <GradientController {...this.state} onChangeInterpolation={::this.changeInterpolation} />
                </div>
                <div className="half">
                    <p>Current Color - <span style={currentColorStyle}>&nbsp;</span> - {this.props.currentColor}</p>
                    <p>Selected Colors</p>
                    <p className="mini-text">Click a color to remove it.</p>
                    {selectedColors}
                    <p>Sample Gradient</p>
                    {selectedGradients}
                </div>
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

export default connect(mapStateToProps, { removeColor })(App);
