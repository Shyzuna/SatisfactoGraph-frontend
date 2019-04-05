import React from "react";
import ReactDOM from "react-dom";

import images from './../../resources/images.js'

import './building.css';

class Building extends React.Component {
    render() {
        return (
            <div className="building">
                <img src={images['miner']} />
            </div>
        );
    }
}

export default Building;
