import Button from "react-bootstrap/Button";
import {Alert} from "react-bootstrap";

function Product(props) {
    return(
        <Alert variant="success" id={props.id}>{props.name}
            <Button onClick={props.delProduct} className="col float-end">Del</Button>
        </Alert>
    )
}
export default Product