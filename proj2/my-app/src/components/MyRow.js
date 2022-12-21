import { useState, useEffect } from "react";

const MyRow = (props) => {

    const {id, name, price, min, max, ...restProps} = props
    
    const [total, setTotal] = useState({id:id, count:0, price:0})

    function countPlus(price){
        if(total.count+1 <= props.max)
            setTotal({id:id, count:total.count+1, price:total.price+price})
    }

    function countMinus(price){
        if(total.count-1 >= props.min)
            setTotal({id:id, count:total.count-1, price:total.price-price})
    }

    useEffect(() => {
        props.setNewTotal(total)
    }, [total])

    return(
    <tr key="">
        <td className="px-2 py-2">{props.name}</td>
        <td className="px-2 py-2">{props.price}</td>
        <td className="px-2 py-2">
        <button className=
            "bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded-md ml-4"
            onClick={()=> countPlus(props.price)}>+</button>
            {total.count}
            <button className=
            "bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded-md ml-4"
            onClick={()=> countMinus(props.price)}>-</button>
        </td>
        <td className="px-2 py-2">{total.price}</td>
    </tr>
    )
}


MyRow.defaultProps = {
    min: 0, 
    max: Number.MAX_VALUE
}

export default MyRow