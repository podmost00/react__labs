import { useState, useReducer, useEffect, useRef} from "react"
import Product from "./Product"

function init(initial){
    return {products: initial}
}

function reducer(state, action){
    switch(action.type){
        case 'ADD': 
            return {products: [...state.products, action.item]}
        case 'REMOVE':
            return {products: action.item.products}
        default:
            break;
    }
}

const MyProducts = () => {

    const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('products')), init)


    const [name, setName] = useState('')

    const prevLen = useRef(state.products.length)
    
    function handleAdd(e){
        e.preventDefault()
        dispatch({type:"ADD", item:{id: Math.round(Math.random() *10000), name: name}})
        e.target.reset()
    }
    function handleDelete(e, id){
        e.preventDefault()
        dispatch({type:"REMOVE", item:{products: state.products.filter((item) => item.id !== id)}})
    }

    useEffect(() => {
        if(prevLen.current > state.products.length)
            console.log('Item removed')
        else if(prevLen.current < state.products.length)
            console.log('Item added')
        prevLen.current =state.products.length
    }, [state.products.length])
    
    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(state.products))
    }, [state.products])
    


    return(
        <div className="mt-10">
            <form className="mb-4" onSubmit={(e) => handleAdd(e)}>
                <input className=
                "bg-white border border-slate-300 rounded-md py-1 pl-3 pr-3 shadow-sm" type="text" 
                onChange={(e) => setName(e.target.value)}/>
                <input type="submit" className=
                "bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded-md ml-4"
                value={"Додати"}/>
            </form>
            {state.products.map((product) => <Product key={product.id} product={product} handleDelete = {handleDelete}/>)}
        </div>
    )

}

export default MyProducts