import styled from "@emotion/styled/macro"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors, side_padding } from "../../../constants";
import Searchbar from "../../component/Searchbar";
import { main_height } from "../../component/TopBarContainer";

const TopSearchBar = ({searchValue, onSearchChange, backArrowCallback, searchBarKeyDown}) => {
  return (
    <TopSearchBarElement>
      <FontAwesomeIcon 
        className="search_arrow"
        icon={faAngleLeft} 
        onClick={backArrowCallback}
      />
      <div className="search_bar">
        <Searchbar
          value={searchValue}
          inputKeyDown={searchBarKeyDown}
          inputOnChange={onSearchChange}
        />
      </div>
    </TopSearchBarElement>
  )
}

export default TopSearchBar;

export const TopSearchBarElement = styled.div`/*  */
display: flex;
align-items: center;
padding: 0 ${side_padding}px;
height: ${main_height}px;
background-color: ${ colors.dark_pink };

.search_arrow {
  cursor: pointer;
  margin-right: 10px;
  width: 30px;
  height: 30px;
  vertical-align: middle;
  color: #fff;
}

.search_bar {
  flex-grow: 1;
}
`;