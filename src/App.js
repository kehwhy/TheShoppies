import { Dialog, Position } from 'evergreen-ui';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import ConfettiContainer from './features/ConfettiContainer/ConfettiContainer'
import NomineeFinder from './features/NomineeFinder/NomineeFinder';
import NomineeList from './features/NomineeList/NomineeList';
import { closeDialog, openDialog, selectIsDialogShown, selectNominees } from './features/NomineeList/nomineeListSlice';
import title from './title.png'

function App() {
  const dispatch = useDispatch()
  const isShown = useSelector(selectIsDialogShown)
  return (
    <div className="App">
      <ConfettiContainer />
      <img className="App_heading" src={title} alt="The Shoppies"></img>
      <Dialog
        className="App_dialog"
        background="blueTint"
        title="Nominees"
        position={Position.RIGHT}
        isShown={isShown}
        onCloseComplete={() => dispatch(closeDialog())}
        hasFooter={false}
        hasHeader={true}
      >
        <NomineeList/>
      </Dialog>
      <div className="App_review_button_wrapper">
      <button
      height={38}
      className="App_review_button"
      onClick={() => dispatch(openDialog())}>
        Review the Nominees
      </button>
      </div>
      <NomineeFinder />
    </div>
  );
}

export default App;
