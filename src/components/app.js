import React from "react";
import ReactDOM from "react-dom";
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BuildingList from './buildingList/buildingList.js'
import BuildingSettings from './buildingSettings/buildingSettings.js'
import Workzone from './workzone/workzone.js'

import './app.css';

class App extends React.Component {
  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className="app container m-0 p-0 mw-100">
          <div className="row">
              <div className="col-md-3">
                  <div className="row">
                      <div className="col">
                          <div className="buildingList border">
                              <BuildingList/>
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col">
                          <div className="buildingSettings border">
                              <BuildingSettings />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="workzone border col-md-9">
                  <Workzone minSize={4} maxSize={16} mvtStep={100} maxMvt={1}/>
              </div>
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}

export default App;

var elements = document.getElementsByClassName('app');
var windowheight = window.innerHeight + "px";

fullheight(elements);
function fullheight(elements) {
    for(let el in elements){
        if(elements.hasOwnProperty(el)){
            elements[el].style.height = windowheight;
        }
    }
}

window.onresize = function(event){
    fullheight(elements);
};
