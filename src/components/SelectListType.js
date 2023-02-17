// React hooks imports
import { useState } from 'react';

// Bootstrap components imports
import { Form } from 'react-bootstrap';



// When option is selected data is fetched for that specific tournament and rendered in TopFiveList.
const SelectListType = ({ handleChangeType }) => {
    const [gameType, setGameType] = useState('blitz');

    const handleChange = (event) => {
        setGameType(event.target.value);
        handleChangeType(event.target.value)

    };

    return (
       
            <Form.Select id='type-selector' aria-label="Default select example"
            value={gameType}
            onChange={handleChange}
           >
                    <option value="atomic">Atomic</option>
                    <option value="blitz">Blitz</option>
                    <option value="bullet">Bullet</option>
                    <option value="classical">Classical</option>
                    <option value="rapid">Rapid</option>
                    <option value="horde">Horde</option>
            </Form.Select>
    
    );
}

export default SelectListType;