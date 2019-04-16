import React from "react";
import ReactDOM from "react-dom";
import {DropTarget} from 'react-dnd'

import './workzone.css'
import Building from "../building/building";
import {BuildingType} from "../building/buildingTypes";

/*
* Define row & col by size ? => Get perfect square ?
* Something better for the grid ?
*/

// Drag&Drop Part
const workzoneTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const mousePos = monitor.getClientOffset();
    const componentRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
    // compute this here ?
    component.createElem({
      x: Math.floor((mousePos.x - componentRect.x) / (componentRect.width / component.state.columnCount)),
      y: Math.floor((mousePos.y - componentRect.y) / (componentRect.height / component.state.rowCount))
    }, item.color, item.index)
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}


class Workzone extends React.Component {
  constructor(props) {
    super(props);

    // states
    this.state = {
      elements: [],
      offsetX: 0,
      offsetY: 0,
      rowCount: 10,
      columnCount: 10,
      mouseDown: false
    };

    // bindings
    this.createElem = this.createElem.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    // attributes
    this.dstX = 0; // state ?
    this.dstY = 0; // state ?
  }

  // Events
  onKeyDown(e) {
    //e.preventDefault()
    console.log('Key down workzone');
    //console.log(e);
    console.log(e.key);
    let stepX = 0;
    let stepY = 0;
    if (e.key === 'ArrowUp') {
      stepY -= 1;
    }
    if (e.key === 'ArrowDown') {
      stepY += 1;
    }
    if (e.key === 'ArrowLeft') {
      stepX -= 1;
    }
    if (e.key === 'ArrowRight') {
      stepX += 1;
    }
    if (stepX !== 0 || stepY !== 0) {
      this.setState(prevState => ({
        offsetX: prevState.offsetX + stepX,
        offsetY: prevState.offsetY + stepY
      }));
    }
  }

  onMouseMove(e) {
    // add max move ?
    if (this.state.mouseDown === true) {
      const {mvtStep, maxMvt} = this.props;
      //e.preventDefault();
      console.log('Mouse move (and clicked) workzone');
      //console.log(e);
      this.dstX += e.movementX;
      this.dstY += e.movementY;
      console.log(this.dstX, this.dstY);
      let stepX = 0;
      if (Math.abs(this.dstX) > mvtStep) {
        stepX = this.dstX % mvtStep;
        this.dstX -= stepX * mvtStep;
        //stepX = Math.abs(stepX) > maxMvt ? Math.sign(stepX) * maxMvt : stepX;
      }
      let stepY = 0;
      if (Math.abs(this.dstY) > mvtStep) {
        stepY = this.dstY % mvtStep;
        this.dstY -= stepY * mvtStep;
        //stepY = Math.abs(stepY) > maxMvt ? Math.sign(stepY) * maxMvt : stepY;
      }
      if (stepX !== 0 || stepY !== 0) {
        this.setState(prevState => ({
          offsetX: prevState.offsetX + stepX,
          offsetY: prevState.offsetY + stepY
        }));
      }
    }
  }

  onWheel(e) {
    console.log('Wheel workzone');
    //console.log(e.deltaY);
    let zoomValue = (e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0) * Math.abs(e.deltaY / 100);
    const {minSize, maxSize} = this.props;

    // valid => currently row = column size
    // zoom in
    if (zoomValue < 0 && (this.state.rowCount + zoomValue) < minSize) {
      zoomValue = this.state.rowCount - minSize;
    } else if (zoomValue > 0 && (this.state.rowCount + zoomValue) > maxSize) { // zoom out
      zoomValue = maxSize - this.state.rowCount;
    }

    if (zoomValue !== 0) {
      this.setState((prevState, props) => {
        return {
          rowCount: prevState.rowCount + zoomValue,
          columnCount: prevState.columnCount + zoomValue
        }
      });
    }
  }

  onMouseDown(e) {
    //e.preventDefault();
    console.log('Mouse down workzone');
    //console.log(e);
    this.setState({mouseDown: true});
  }

  onMouseUp(e) {
    // add mouse out
    //e.preventDefault();
    console.log('Mouse up workzone');
    //console.log(e);
    console.log(this.dstX, this.dstY);
    this.dstX += 0;
    this.dstY += 0;
    this.setState({mouseDown: false});
  }

  onMouseLeave(e) {
    //e.preventDefault();
    console.log('Leave workzone');
    this.dstX = 0;
    this.dstY = 0;
    this.setState({mouseDown: false});
  }

  // Functions
  createElem(position, color, index) {
    console.log(position);

    let offsetPos = {
      x: position.x + this.state.offsetX,
      y: position.y + this.state.offsetY
    };

    let element = {
      position: offsetPos,
      color: color,
      index: index
    };
    this.setState((prevState, props) => {
      return {elements: [...prevState.elements, element]};
    });
  }


  hasElementAt(x, y) {
    let hasElem = null;
    this.state.elements.forEach((elem, index) => {
      if (elem.position.x === x && elem.position.y === y) {
        hasElem = elem;
      }
    });
    return hasElem;
  }

  render() {
    const {isOver, connectDropTarget} = this.props;

    // Create grid
    let content = [];
    let gridColStyle = '';
    let gridRowStyle = '';
    for (let i = 0; i < this.state.rowCount; ++i) {
      gridColStyle += 'auto ';
      gridRowStyle += 'auto ';
      for (let j = 0; j < this.state.columnCount; ++j) {
        let cell = null;
        // ok just using offset here ?
        const elem = this.hasElementAt(j + this.state.offsetX, i + this.state.offsetY);
        if (elem !== null) {
          cell = <Building index={elem.index} color={elem.color} inWorkzone/>;
        }
        content.push(<div key={i.toString() + '-' + j.toString()} className="workzoneCell">{cell}</div>);
      }
    }

    const style = {
      gridTemplateColumns: gridColStyle,
      gridTemplateRows: gridRowStyle,
      cursor: this.state.mouseDown === true ? 'move' : 'default'
    };

    return connectDropTarget(
      <div
        onMouseLeave={this.onMouseLeave}
        onWheel={this.onWheel}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove}
        onKeyDown={this.onKeyDown}
        className="workzoneGrid"
        style={style}
        tabIndex={0}
      >
        {content}
      </div>
    );
  }
}

export default DropTarget(BuildingType.BUILDING, workzoneTarget, collect)(Workzone);
