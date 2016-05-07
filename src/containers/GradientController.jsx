// this controls setting up the input of gradients

import React, { Component, PropTypes } from 'react';
import ColorDataOutput from '../components/ColorDataOutput';
import GradientView from '../components/GradientView.jsx';
const gradient = require('tinygradient');
const Slider = require('rc-slider');
import { removeColor, addColor } from '../actions';
import { connect } from 'react-redux';
const sliderStyle = {
    width: 400,
    margin: 50
};

class GradientController extends Component {

    static propTypes = {
        colors: PropTypes.arrayOf(React.PropTypes.object),
        reverse: PropTypes.bool
    };

    static defaultProps = {
        removeColor: PropTypes.func.isRequired,
        addColor: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            interpolation: 7,
            gradient: []
        }
    }

    changeInterpolation (e) {
        this.setState({
            interpolation: e,
            gradient: this.updateGradient(this.props.colors, e)
        });
    }

    updateGradient(colors, interpolation) {

        interpolation = interpolation || this.state.interpolation;

        if (colors && colors.length > 1) {
            let gradientColors = colors.map(color => {
                return '#' + color.color.hex
            });
            return gradient(gradientColors).rgb(interpolation)
        } else {
            return []
        }
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

    removeGradient (key) {
        // removes a color from the props
        this.props.removeColor(key)
    }

    addColor = () => {
        if (typeof this.props.currentColor.hex !== 'undefined') this.props.addColor(this.props.currentColor);
    };

    render() {
        let currentColorStyle;
        if (this.props.currentColor.hex) {
            currentColorStyle = {
                background: '#' + this.props.currentColor.hex
            }
        } else {
            currentColorStyle = {
                background: '#' + this.props.currentColor
            }
        }


        let gradient = this.props.colors.map((color) => {
            let _color = color.color;
            let style = { background: '#' + _color.hex };

            return <div className='gradient-controller-interpolation'
                        key={color.id}
                        onClick={this.removeGradient.bind(this, color.id)}
                        style={style}>{_color.hex}</div>
        });

        return (
            <div className="gradient-controller half">

                <div>
                    <div>
                        {gradient}
                    </div>
                </div>

                <div className="gradient-picker">
                    <div className="current-color" style={currentColorStyle}>'foo'</div>
                    <button className="add-current-color" onClick={::this.addColor}>Add Color</button>
                    <div style={sliderStyle}>
                        <Slider onAfterChange={::this.changeInterpolation}/>
                        steps {this.state.interpolation}
                    </div>
                </div>

                <GradientView gradient={this.state.gradient} />
                <ColorDataOutput className="gradient-output-colorsre" {...this.props} />
                <ColorDataOutput className="gradient-output-gradient" gradients={this.state.gradient} buttonText="Copy Gradients" />
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

export default connect(mapStateToProps, { removeColor, addColor } )(GradientController);
