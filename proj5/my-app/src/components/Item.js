import "./favorite.css"
import { useState, useRef} from "react"
const like = require("../icons/favorite.png")
const unlike = require("../icons/heart.png")
const cart = require("../icons/shopping-cart.png")
const inCart = require("../icons/complete.png")

export const Item = ({product, state, dispatch, setLastLike, setOpen}) => {

    const [buy, setBuy] = useState(false)

    const imgRef = useRef(null)
    
    function handleAdd(e, id, title){
        e.stopPropagation()
        dispatch({type:"ADD", item:{id:id}})
        setLastLike(title)
        setOpen(true)
    }

    function handleDelete(e, id){
        e.stopPropagation()
        dispatch({type:"REMOVE", item:{liked: state.liked.filter((item) => item.id !== id)}})
    }

    function isItem(id){
        return state.liked.findIndex(like => like.id === id) !== -1
    }

    function handleBuy(){
        setBuy(!buy)
        buy ? imgRef.current.src = cart : imgRef.current.src = inCart
    }

    return(
        <div className="border border-gray-200 mt-2 w-[300px] h-[400px] p-2 relative" onClick={() => {handleBuy()}}>
            <div className="flex justify-end">
                <img className="ico" alt="" 
                src={isItem(product.id) ? like : unlike}
                onClick={(e)=> {isItem(product.id) ? handleDelete(e, product.id): handleAdd(e, product.id, product.title)}}/>
            </div>
            <div className="myCard">
                <img className="myImg" src={product.image} alt="" />
            </div>
            <p>{product.title}</p>
            <p>{product.price} ₴</p>
            <p>{product.rating.rate}⭐</p>
            <div className="flex justify-end absolute bottom-2 right-2">
                <img className="ico" ref={imgRef} src={cart} alt={"cart"}/>
            </div>
        </div>
    )
}