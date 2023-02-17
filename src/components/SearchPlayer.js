import React, { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';


const SearchPlayer = ({handleSelectedName}) => {
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);

  const handleSearch = (searchTerm) => {

    // Uses Lichess autocomplete api to predict next character in search term


    if (searchTerm.length >= 3) {
        fetch(`https://lichess.org/api/player/autocomplete?term=${searchTerm}`)
            .then(res => res.json())
            .then(data => { setOptions(data) })

    }
    else if (searchTerm.length < 2) {
        setOptions([])
    }

}

const handleSelected = (e) => {
    setSelected(e)
    handleSelectedName(e)
}

  return (
    <Typeahead
      id="basic-example"
      onInputChange={e => handleSearch(e)}
      onChange={e => handleSelected(e)}
      options={options}
      placeholder="Search for player"
      selected={selected}
    />
  );
};

export default SearchPlayer;
