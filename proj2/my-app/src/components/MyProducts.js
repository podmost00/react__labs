import { useState} from "react"


const MyProducts = () => {

    const [name, setName] = useState('')
    const [products, setProducts] = useState([])

    function addProduct(e){
        setProducts([...products, {id: Math.round(Math.random() *1000), name: name}])
        e.preventDefault()
        e.target.reset()
    }

    function deleteHandle(id){
        let index = products.findIndex(product => product.id === id)
        let newProducts = products.splice(0) 
        newProducts.splice(index, 1)
        setProducts(newProducts)
    }

    return(
        <div className="mt-10">
            <form className="mb-4" onSubmit={(e) => addProduct(e)}>
                <input className=
                "bg-white border border-slate-300 rounded-md py-1 pl-3 pr-3 shadow-sm" type="text" 
                onChange={(e) => setName(e.target.value)}/>
                <input type="submit" className=
                "bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded-md ml-4"
                value={"Додати"}/>
            </form>
            {products.map((product) => 
            <div className=
            "rounded-md bg-slate-300 w-80 py-2 px-2 flex justify-between" >
                {product.name}
                <button className=
                "bg-white text-red-900 rounded-md border-2 border-red-600 py-1 px-1"
                onClick={() => deleteHandle(product.id)}>Видалити</button>
            </div>)}
        </div>
    )

}

export default MyProducts