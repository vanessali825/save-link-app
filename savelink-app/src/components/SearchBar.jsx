// SearchBar is a functional component

export default function SearchBar(props) {      
    return( 
        <div>
            <form className="d-flex" role="search">
                <input 
                    className="form-control me-2" 
                    type="search" 
                    placeholder="Search for a link" 
                    aria-label="Search"
                    onChange={props.onSearchInput}
                    />
                {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
            </form>
        </div>
    )
}