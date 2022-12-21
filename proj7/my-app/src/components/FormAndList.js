import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Product from "./product";
import {useContext} from "react";
import ProductsContext from "../context/context";


function FormAndList() {
    const {state} = useContext(ProductsContext)
    const {dispatch} = useContext(ProductsContext)


    function handeDeleting(e)
    {
        e.preventDefault();
        let arr = state.myList
        arr = arr.filter(item => item.id != e.target.parentNode.id)
        dispatch({type: 'del',payload:{arr: arr}})
    }

    return (
        <div>
        <div className="d-flex">
            <Form.Label className="mx-auto">Product name</Form.Label>
        </div>
            <div className="row">
                <Form.Control className="col" type="text" placeholder="Product" id="bar"/>
                <Button className="col" variant="primary" type="submit" id="submit">Submit</Button>
            </div>
    <div id="list">
        {state.myList.map((ele) => <Product id={ele.id} name={ele.name} delProduct={handeDeleting}></Product>)}
    </div>
        </div>
)
}
export default FormAndList;