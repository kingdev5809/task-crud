import React from "react";
import "./Search.scss";
import { AiOutlineClose } from "react-icons/ai";

function Search({ handleSearch, searchVisible }) {
  return (
    <div className="search ">
      <h3>Search by:</h3>
      <div className="search-inner">
        <button
          className={searchVisible === "name" ? "active" : ""}
          onClick={() => handleSearch(false, "name")}
        >
          Post name
        </button>
        <button
          className={searchVisible === "id" ? "active" : ""}
          onClick={() => handleSearch(false, "id")}
        >
          Post id
        </button>

        {searchVisible ? (
          <div className="search-input">
            <input
              type={searchVisible === "name" ? "text" : "number"}
              placeholder={`Enter post ${searchVisible}`}
              onChange={(e) => handleSearch(e.target.value, "search")}
            />
            <span onClick={() => handleSearch(false, "close")}>
              <AiOutlineClose />
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Search;
