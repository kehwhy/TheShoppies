import React from 'react'
import { useState} from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Button, Paragraph, TextInput } from 'evergreen-ui';
import { clearSearchResults, addSearchResults, setTotalResults, selectSearchTotal, setSearchResults } from "./searchResultsSlice"
import SearchResultTable from './SearchResultsTable/SearchResultTable';
import './NomineeFinder.css'

const NomineesSearch = () => {
    const totalResults = useSelector(selectSearchTotal)
    const dispatch = useDispatch()

    const [errorMessage, setErrorMessage] = useState("Please enter at least 3 characters to begin searching.")
    const [pageNumber, setPageNumber] = useState(1)
    const [searchValue, setSearchValue] = useState("")

    const updateSearchList = (searchParams, page) => {
        fetch(`http://www.omdbapi.com/?apikey=793ba15b&type=movie&s=${searchParams}&page=${page}`)
        .then(res => res.json())
        .then((data) => {
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

    const loadNextPage = () => {
        fetch(`http://www.omdbapi.com/?apikey=793ba15b&type=movie&s=${searchValue}&page=${pageNumber + 1}`)
        .then(res => res.json())
        .then((data) => {
            if (!data.Search){
                setErrorMessage("No Results Found.")
                dispatch(clearSearchResults())
                dispatch(setTotalResults(0))
            }
            else {
                dispatch(addSearchResults(data.Search))
                dispatch(setTotalResults(data.totalResults))
                setPageNumber(pageNumber + 1)
            }
        })
    }
    
    return (
        <div className="NomineeFinder">
            <div className="NomineeFinder_search_wrapper">
            <TextInput 
            className="NomineeFinder_search"
            placeholder="Find movie to nominate..."
            onChange = {e => {
                setPageNumber(1)
                setSearchValue(e.target.value)
                if (e.target.value.length > 2) {
                    setErrorMessage("")
                    updateSearchList(e.target.value, pageNumber)
                }
                else {
                    setErrorMessage("Please enter at least 3 characters to begin searching.")
                    dispatch(setTotalResults(0))
                    dispatch(clearSearchResults())
                }
            }}
            />
            </div>
            <Paragraph className="NomineeFinder_error">{errorMessage}</Paragraph>
            <SearchResultTable /> 
            {totalResults > 10
            ? 
            <div className="NomineeFinder_load_button_wrapper">
            <Button 
            className="NomineeFinder_load_button"
            onClick={loadNextPage}
            disabled={pageNumber >= totalResults/10}
            >Load More
            </Button>
            </div>
            : <div/>
            }
        </div>
    )
}
export default NomineesSearch