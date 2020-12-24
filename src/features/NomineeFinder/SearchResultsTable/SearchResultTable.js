import React from 'react'
import { AddIcon, Badge, Button, IconButton, Table } from 'evergreen-ui'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchResults } from "../searchResultsSlice";
import { selectNominees, addNominee, openDialog } from "../../NomineeList/nomineeListSlice"
import "./SearchResultsTable.css"

const SearchResultTable = () => {
    const dispatch = useDispatch()
    const results = useSelector(selectSearchResults)
    const nominees = useSelector(selectNominees)
    
    const nominateMovie = (movie) => {
        dispatch(addNominee(movie))
        
        setTimeout(() => {
            if (nominees.length === 4) {
                dispatch(openDialog())
            }
        }, 1000)
        
    }

    return (
        results && results.length
        ? <div className="SearchResultTable">
            <Table className="SearchResultTable_table">
                <Table.Head height={45} className="search_result_table_header">
                    <Table.TextHeaderCell textProps={{size: 500}} flex="50%">
                    Movie Title
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell textProps={{size: 500}}>
                    Year of Release
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell />
                </Table.Head>
                <Table.Body textProps={{size: 500}}>
                    {results.map(movie => (
                    <Table.Row height={45} className="search_result_table_row" key={movie.imdbID}>
                        <Table.TextCell textProps={{size: 500}} flex="50%">{movie.Title}</Table.TextCell>
                        <Table.TextCell textProps={{size: 500}}>{movie.Year}</Table.TextCell>
                        <Table.Cell >
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