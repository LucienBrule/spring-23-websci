import 'react-bootstrap'
import Form from 'react-bootstrap/Form'

export function Dropdown(data: any) {
    return(
        <Form.Select aria-label="Default select example">
            <option>Select a Resume</option>
            <option value="AP">Anita</option>
            <option value="CH">Cian</option>
            <option value="CP">Caroline</option>
            <option value="LB">Lucien</option>
        </Form.Select>
    );
}

export default Dropdown;
