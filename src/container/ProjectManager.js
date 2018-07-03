import React,{Component} from 'react';
import Columns from '../container/Columns';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const ProjectManagerPage = () =>
  <div>
    <h1>Project Manager Page</h1>
    <DragDropContextProvider backend={HTML5Backend}>
      <div className="row"> 
        <Columns/> 
      </div>
    </DragDropContextProvider>
  </div>

export default ProjectManagerPage;
