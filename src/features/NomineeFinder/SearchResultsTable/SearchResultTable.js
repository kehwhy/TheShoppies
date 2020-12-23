import React from 'react'
import { AddIcon, IconButton, Table } from 'evergreen-ui'
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
        if (nominees.length === 5) {
            dispatch(openDialog())
        }
    }

    return (
        results && results.length
        ? <div className="SearchResultTable">
            <Table className="SearchResultTable_table">
                <Table.Head className="search_result_table_header">
                    <Table.TextHeaderCell>
                    Movie Title
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell>
                    Year of Release
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell width={100} flex="none"/>
                </Table.Head>
                <Table.Body>
                    {results.map(movie => (
                    <Table.Row className="search_result_table_row" key={movie.imdbID} onSelect={() => alert(movie.Title)}>
                        <Table.TextCell>{movie.Title}</Table.TextCell>
                        <Table.TextCell>{movie.Year}</Table.TextCell>
                        <Table.Cell width={100} flex="none">
                            <IconButton 
                            disabled={!!nominees.filter(nominee => nominee.imdbID === movie.imdbID).length} 
                            onClick={(e) => nominateMovie(movie)} 
                            icon={AddIcon} 
                            height={24} 
                            appearance='minimal' />
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