import {useState} from "react"
import {SearchBar}from  "../general/searchBar/index"
const SearchBarUser = () => {
    const [value, setValue] = useState("");

    function OnChange(e: React.ChangeEvent<HTMLInputElement>)
    {
        setValue(e.target.value);
    }
    function onClick()
    {
        console.log("ProbandoClc")
    }

return(
    <div>
        <SearchBar
        onChange={OnChange}
        keywords={value}
        onClick={onClick}
        />
    </div>
);
}
export default SearchBarUser