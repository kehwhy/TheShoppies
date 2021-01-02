import React from 'react'
import { AddIcon, Badge, Button, Table } from 'evergreen-ui'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchResults } from "./searchResultsSlice";
import { selectNominees, addNominee, openDialog } from "../NomineeList/nomineeListSlice"
import "./SearchResultsTable.css"

const SearchResultTable = () => {
    // dispatch to store
    const dispatch = useDispatch()

    // selecting from store
    const results = useSelector(selectSearchResults)
    const nominees = useSelector(selectNominees)
    
    /**
     * Add a movie to the list of nominees
     * @param {Object} movie 
     */
    const nominateMovie = (movie) => {
        if (nominees.length === 4) {
            dispatch(addNominee(movie))
            // delay to allow confetti to fall before popup
            setTimeout(() => {
                dispatch(openDialog())
            }, 1000)     
        }
        else {
            dispatch(addNominee(movie))
        }
        
    }

    return (
        results && results.length
        ? <div className="SearchResultTable">
            <Table className="SearchResultTable_table">
                <Table.Head height={45} className="search_result_table_header">
                    <Table.TextHeaderCell textProps={{size: 400}} flex="45%">
                    Movie Title
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell textProps={{size: 400}} flex="20%">
                    Year of Release
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell flex="35%"/>
                </Table.Head>
                <Table.Body textProps={{size: 400}}>
                    {results.map(movie => (
                    <Table.Row height={45} className="search_result_table_row" key={movie.imdbID}>
                        <Table.TextCell textProps={{size: 400}} flex="45%">{movie.Title}</Table.TextCell>
                        <Table.TextCell textProps={{size: 400}} flex="20%">{movie.Year}</Table.TextCell>
                        <Table.Cell flex="35%">
                            {(!!nominees.filter(nominee => nominee.imdbID === movie.imdbID).length)
                            ? <Badge color="blue">Nominated</Badge>
                            : <Button 
                            className="add_button" 
                            onClick={(e) => nominateMovie(movie)} 
                            iconBefore={AddIcon} 
                            height={24} 
                            disabled={nominees.length >= 5}
                            appearance='minimal' 
                            >Nominate</Button>}
                        </Table.Cell>
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
        : <div></div>
    )
}

export default SearchResultTable