import React from 'react'
import { useState} from 'react';
import { useDispatch, useSelector } from "react-redux"
import { IconButton, Paragraph, SearchIcon, TextInput } from 'evergreen-ui';
import { clearSearchResults, addSearchResults, setTotalResults, selectSearchTotal, setSearchResults } from "../SearchResultsTable/searchResultsSlice"
import SearchResultTable from '../SearchResultsTable/SearchResultsTable';
import './NomineeFinder.css'

/**
 * NomineesFinder contains search bar and results table to find nominees
 */
const NomineesFinder = () => {
    // selecting data from the store
    const totalResults = useSelector(selectSearchTotal)

    // dispatch to store
    const dispatch = useDispatch()

    // local state values
    const [errorMessage, setErrorMessage] = useState("Please enter at least 3 characters to begin searching.")
    const [pageNumber, setPageNumber] = useState(1)
    const [searchValue, setSearchValue] = useState("")

    /**
     * Updates the search results in the store
     * @param {String} searchParams value to search for in OMDB
     */
    const updateSearchList = (searchParams) => {

        fetch(`https://www.omdbapi.com/?apikey=793ba15b&type=movie&s=${searchParams}`)
        .then(res => res.json())
        .then((data) => {

            setPageNumber(1)

            if (!data.Search){
                setErrorMessage("No Results Found.")
                dispatch(clearSearchResults())
            }
            else {
                setErrorMessage("")
                dispatch(setSearchResults(data.Search))
                dispatch(setTotalResults(data.totalResults))
            }
        })
    }

    /**
     * Loads the next page of search results
     */
    const loadNextPage = () => {
        fetch(`https://www.omdbapi.com/?apikey=793ba15b&type=movie&s=${searchValue}&page=${pageNumber + 1}`)
        .then(res => res.json())
        .then((data) => {
            setErrorMessage("")
            dispatch(addSearchResults(data.Search))
            dispatch(setTotalResults(data.totalResults))
            setPageNumber(pageNumber + 1)
        })
    }
    
    return (
        <div className="NomineeFinder">
            <div className="NomineeFinder_search_wrapper">
                <TextInput 
                className="NomineeFinder_search"
                placeholder="Find movie to nominate..."
                onChange = {e => {
                    setSearchValue(e.target.value)
                }}
                onKeyPress = {e => {
                    if (e.charCode === 13) {
                        if (searchValue.length < 3) {
                            setErrorMessage("Please enter at least 3 characters to begin searching.")
                        }
                        else {
                            updateSearchList(searchValue) 
                        }
                    }
                }}
                />
                <div className="NomineeFinder_search_button_wrapper">
                    <IconButton 
                    className="NomineeFinder_search_button" 
                    appearance='minimal' 
                    icon={SearchIcon} 
                    height={28}
                    onClick={() => updateSearchList(searchValue) }
                    />
                </div>
            </div>
            <Paragraph className="NomineeFinder_error">{errorMessage}</Paragraph>
            <SearchResultTable /> 
            {
            // load more button should ony be shown when there are more results to display
            pageNumber < Math.ceil(totalResults/10) && !errorMessage.length
            ? <div className="NomineeFinder_load_button_wrapper">
            <button 
            className="NomineeFinder_load_button"
            onClick={loadNextPage}
            > <Paragraph className="NomineeFinder_load_button_text" size={400} >Load More </Paragraph>
            </button>
            </div>
            : <div/>
            }
        </div>
    )
}
export default NomineesFinder