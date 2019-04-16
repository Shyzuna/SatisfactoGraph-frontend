import React from "react";
import ReactDOM from "react-dom";
import {DragSource} from "react-dnd";
import {BuildingType} from "./buildingTypes";
import images from './../../resources/images.js'

import './building.css';

// Drag&Drop Part
const buildingSrc = {
  beginDrag(props){
    console.log(props);
    return {
      color: props.color,
      index: props.index
    };
  }
};

function collect(connect, monitor){
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Building extends React.Component {
    render() {
        const {connectDragSource, isDragging, inWorkzone} = this.props;

        let style = {};

        if (inWorkzone === true){
          style.width = '100%';
          style.height = '100%';
        }

        return connectDragSource(
            <div className="building" style={style}>
                <img src={images['miner']} />
            </div>
        );
    }
}

export default DragSource(BuildingType.BUILDING, buildingSrc, collect)(Building);
