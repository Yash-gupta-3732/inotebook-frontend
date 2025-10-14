import { useState } from "react";
import searchContext from "./searchContext";

const SearchState = (props) => {
      const [searchText, setSearchText] = useState("");
  return (
    <searchContext.Provider value={{ searchText, setSearchText }}>
            {props.children}
        </searchContext.Provider>
  )
}

export default SearchState;
