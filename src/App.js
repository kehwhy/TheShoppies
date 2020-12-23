import { Button, Position, SideSheet } from 'evergreen-ui';
import React, { useState } from 'react';
import './App.css';
import Banner from './features/Banner/Banner'
import NomineeFinder from './features/NomineeFinder/NomineeFinder';
import NomineeList from './features/NomineeList/NomineeList';
import title from './title.png'

function App() {

  const [isShown, setIsShown] = useState(false)
  
  return (
    <div className="App">
      <Banner />
      <img className="App_heading" src={title} alt="The Shoppies"></img>
      <SideSheet
        position={Position.RIGHT}
        isShown={isShown}
        onCloseComplete={() => setIsShown(false)}
      >
        <NomineeList/>
      </SideSheet>
      <div className="App_review_button_wrapper">
      <Button
      height={38}
      className="App_review_button"
      onClick={() => setIsShown(true)}>
        Review the Nominees
      </Button>
      </div>
      <NomineeFinder />
    </div>
  );
}

export default App;
