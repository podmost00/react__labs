const Product = (props) =>{
    return(
    <div className=
    "rounded-md bg-slate-300 w-80 py-2 px-2 flex justify-between" >
        {props.product.name}
    <button
    className=
    "bg-white text-red-900 rounded-md border-2 border-red-600 py-1 px-1"
     onClick={(e) => props.handleDelete(e, props.product.id)}>Delete</button>
    </div>
)}

export default Product