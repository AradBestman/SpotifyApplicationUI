import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import SearchIcon from "@mui/icons-material/Search";
import ROUTES from "../ROUTES";

const FilterSearch = () => {
  const [searchTxt, setSearchTxt] = useState(""); // Use camelCase for variable names
  const navigate = useNavigate();

  const handleTxtChange = (e) => {
    const searchText = e.target.value;
    setSearchTxt(searchText);
    navigate(`${ROUTES.HOME}?filter=${searchText}`);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        onChange={handleTxtChange}
        value={searchTxt}
      />
    </Search>
  );
};

export default FilterSearch;
