import { Dialog, Paragraph, Position } from 'evergreen-ui';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import ConfettiContainer from './features/ConfettiContainer/ConfettiContainer'
import NomineeFinder from './features/NomineeFinder/NomineeFinder';
import NomineeList from './features/NomineeList/NomineeList';
import { closeDialog, openDialog, selectIsDialogShown } from './features/NomineeList/nomineeListSlice';
import title from './title.png'

function App() {
  // dispatch to store
  const dispatch = useDispatch()

  // selecting data from store
  const isShown = useSelector(selectIsDialogShown)

  return (
    <div className="App">
      <ConfettiContainer />
      <img className="App_heading" src={title} alt="The Shoppies"></img>
      <div className="App_review_button_wrapper">
      <button
      height={38}
      className="App_review_button"
      onClick={() => dispatch(openDialog())}>
        <Paragraph className="App_review_button_text" size={500}>Review the Nominees</Paragraph>
      </button>
      </div>
      <NomineeFinder />
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
    </div>
  );
}

export default App;
