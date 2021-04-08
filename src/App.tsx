import './App.css';
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import Drawer from './components/drawer';
import challenge1 from './challenges/1';
import {
  Link,
  useParams,
  useLocation,
  Route
} from "react-router-dom";
import React, { useEffect } from 'react';

const pages = Array.from(Array(10).keys())

interface ParamTypes {
  number: string
}

function App() {

  return (
    <div>
      <div>Make variable type string</div>

      <Drawer>
        <div className="numbers">
          {pages.map(number => <Link to={`/exercise/${number}`} key={`number-${number}`}>
            <div className="numbers--item">{number}</div>
          </Link>)}
        </div>
        <Route path={`/exercise/:number`}>
          <Inside/>
        </Route>
      </Drawer>

    </div>
  );
}

function Inside() {
  function usePageViews() {
    let location = useLocation()

    useEffect(
      () => {
        this.forceUpdate()
      },
      [location]
    )
  }

  let {number = 1} = useParams<ParamTypes>();
  const importString = require(`./challenges/${number}`).default
  console.log(importString)
  console.log(number)

  function handleEditorValidation(markers: monaco.editor.IMarker[]) {
    // model markers
    markers.forEach(marker => {
      console.log("onValidate:", marker.message)
    });
  }

  function handleEditorChange(value: string | undefined) {
    // console.log(value)
  }
  usePageViews()
  return (<Editor
    height="40vh"
    defaultLanguage="typescript"
    defaultValue={importString}
    onChange={handleEditorChange}
    onValidate={handleEditorValidation}
  />)
}


export default App;
