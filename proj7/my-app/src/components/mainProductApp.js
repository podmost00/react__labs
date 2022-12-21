import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useContext, useEffect, useReducer, useRef, useState} from "react";
import {Alert} from "react-bootstrap";
import Product from "./product";
import ProductsContext from "../context/context";
import FormAndList from "./FormAndList";

function init(initial) {
    return {myList: initial}
}

function reducer(state, action) {
    switch (action.type) {
        case 'add': {
            return {myList: [...state.myList, {id: action.payload.id, name: action.payload.name}]};
        }
        case 'del': {
            return {myList: action.payload.arr}
        }
    }
}

function MainProductApp() {
    if (localStorage.getItem('products') === null) {
        localStorage.setItem('products', '[]');
    }

    const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem(("products"))), init)
    const prevLen = useRef(state.myList.length)

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(state.myList))

    }, [state.myList])


    useEffect(() => {
        if (prevLen.current > state.myList.length)
            console.log('Item removed')
        else if (prevLen.current < state.myList.length)
            console.log('Item added')
        prevLen.current = state.myList.length
    }, [state.myList.length])

    function handeAdding(e) {
        e.preventDefault();
        let id = 0;
        let name = ""
        if (state.myList.length)
            id = state.myList[state.myList.length - 1].id + 1
        if (document.getElementById("bar").value != "")
            name = document.getElementById("bar").value
        else
            name = "PlaceHolder"
        dispatch({type: 'add', payload: {name: name, id: id}})
    }

    return (
        <div className="mx-auto">
            <ProductsContext.Provider value={{state, dispatch}}>
                <Form id="form" onSubmit={handeAdding}>
                    <FormAndList></FormAndList>
                </Form>
            </ProductsContext.Provider>
        </div>

    )
}

export default MainProductApp;