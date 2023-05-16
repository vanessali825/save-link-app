// ListLink will map and filter the links that are saved in localStorage

import { useState } from "react";
import SearchBar from "./SearchBar";

export default function ListLink(props) {       
    // retrieve current link array JSON object from 'AddLink'
    const links = props.link;
    
    // sort links alphabetically  
    const sortedLinks = links.sort((a, b) => {         
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    })

    // capture changes to search input box
    const [query, setQuery] = useState("")

    // setQuery is updated every time search input box is updated
    const searchInput = (e) => {
        setQuery(e.target.value);
    }

    // code both map and filter functions to dynamically display list
    const linkList = sortedLinks
        .filter(link => {
            // function to filter query input options
            if (query === "") {
                // if query is empty
                return link;
            } else if (link.name.toLowerCase().includes(query.toLowerCase()) || link.url.toLowerCase().includes(query.toLowerCase())) {
                // returns filtered array
                return link;
            } else {
                return false;
            }
        })
        .map((link, index) => {        
            // function maps through each object in links array
            return (
                <ul>
                    <li key={index} >
                        <a href={link.url} target="_blank">{link.name}</a>
                    </li>
                </ul>
            )
        })

    return(
        <div>
            <SearchBar onSearchInput={searchInput}/> <br />
            <h5>Saved links listed in alphabetical order:</h5>
            {linkList}
        </div>
    )
}