import { Paragraph, Table } from 'evergreen-ui'
import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { clearNominees, removeNominee, selectNominees } from '../NomineeList/nomineeListSlice'
import './NomineeList.css'

const NomineeList = () => {
    const nominees = useSelector(selectNominees)
    const dispatch = useDispatch()

    return (
        <div className="NomineeList">
            {nominees.length
            ? <div>
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
        </div>
    )
}

export default NomineeList 