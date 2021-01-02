import { Heading, Paragraph, Table } from 'evergreen-ui'
import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { clearNominees, removeNominee, selectNominees } from '../NomineeList/nomineeListSlice'
import { saveNominees } from '../../app/localstorage'
import './NomineeList.css'

const NomineeList = () => {
    // selecting data from the store
    const nominees = useSelector(selectNominees)

    // dispatch to the store
    const dispatch = useDispatch()

    return (
        <div className="NomineeList">
            {
            // contidionally renders table or message to user
            nominees.length
            ? <div>
                <Heading size={400}>{`You have nominated ${nominees.length}/5 movies!`} </Heading>
                <Table className="NomineeList_table">
                <Table.Body>
                {nominees.map(nominee => (
                    <Table.Row key={nominee.imdbID}>
                        <Table.TextCell>{nominee.Title}</Table.TextCell>
                        <Table.TextCell>{nominee.Year}</Table.TextCell>
                        <Table.TextCell >
                            <div className="NomineeList_remove_button_wrapper">
                                <button 
                                className="NomineeList_remove_button"
                                onClick={() => dispatch(removeNominee(nominee))}
                                >Remove</button>
                            </div>
                        </Table.TextCell>
                    </Table.Row>))}
                </Table.Body>
            </Table> 
            <div className="NomineeList_clear_button_wrapper">
                <button 
                className="NomineeList_clear_button"
                onClick={()=> dispatch(clearNominees())}
                > Clear Nominee List</button>
            </div>
            </div>
            : <Paragraph className="NomineeList_empty" size={800}>Nominate movies for The Shoppies using the search bar and list.</Paragraph>}
            <div className="NomineeList_save_button_wrapper">
                <button 
                className="NomineeList_save_button"
                onClick={()=> saveNominees(nominees)}
                > Save Nominee List</button>
            </div>
        </div>
    )
}

export default NomineeList 