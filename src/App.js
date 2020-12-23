import { Dialog, Position, SideSheet } from 'evergreen-ui';
import React, { useState } from 'react';
import './App.css';
import ConfettiContainer from './features/ConfettiContainer/ConfettiContainer'
import NomineeFinder from './features/NomineeFinder/NomineeFinder';
import NomineeList from './features/NomineeList/NomineeList';
import title from './title.png'

function App() {

  const [isShown, setIsShown] = useState(false)
  
  return (
    <div className="App">
      <ConfettiContainer />
      <img className="App_heading" src={title} alt="The Shoppies"></img>
      <Dialog
        className="App_dialogue"
        title="Nominees"
        position={Position.RIGHT}
        isShown={isShown}
        onCloseComplete={() => setIsShown(false)}
        hasFooter={false}
        hasHeader={false}
      >
        <NomineeList/>
      </Dialog>
      <div className="App_review_button_wrapper">
      <button
      height={38}
      className="App_review_button"
      onClick={() => setIsShown(true)}>
        Review the Nominees
      </button>
      </div>
      <NomineeFinder />
    </div>
  );
}

export default App;
