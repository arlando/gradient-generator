// copy your gradient data and do whatever your heart desires

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ColorDataOutput extends Component {

    // just displays the current gradient
    static defaultProps = {
        colors: []
    };

    constructor (props) {
        super(props)

        this.state = {
            hexes: '[]'
        }
    }

    copyGradientToClipboard() {
        ReactDOM.findDOMNode(this.refs.hexes).select();
        try {
            document.execCommand('copy');
            ReactDOM.findDOMNode(this.refs.hexes).blur();
        } catch (e) {
            console.log('could not copy your grad use ctrl / cmd + c')
        }
    }

    componentWillReceiveProps (newProps) {
        let hexes;

        if (newProps.colors) {
            hexes = newProps.colors.map((color) => {
                return '#' + color.color.hex
            });
        }

        if (newProps.gradients) {
            hexes = newProps.gradients.map((gradient) => {
                return '#' + gradient.toHex()
            });
        }

        try {
            hexes = JSON.stringify(hexes);
        } catch (e) {
            console.log('could not stringify the hex code: ', hexes);
            hexes = [];
        }

        this.setState({
            hexes: hexes
        })
    }

    render() {

        let buttonText = this.props.buttonText || 'Copy HEX';
        return (
            <div className="gradient-output half">
                <textarea ref="hexes" value={this.state.hexes}/>
                <button onClick={::this.copyGradientToClipboard} readOnly={true}>{buttonText}</button>
            </div>
        )
    }
}

export default ColorDataOutput
