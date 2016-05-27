// view spiffy gradients
import React, { Component } from 'react';

class GradientView extends Component {

    // just displays the current gradient
    static defaultProps = {
        colors: [],
        gradient: []
    };
    
    shouldComponentUpdate(newProps) {
        return typeof newProps.gradient !== 'undefined'
    }

    render() {

        let bigGradient = this.props.gradient.map((color, i) => {
            let leStyle = {
                background: '#' + color.toHex()
            };
            return  <div className="gradient-view-color"
                         key={i}
                         style={leStyle} >&nbsp;</div>
        });

        return (
            <div className="gradient-view">
                {bigGradient}
            </div>
        )
    }
}

export default GradientView

