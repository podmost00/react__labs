import { useState} from "react"

const MyCounter = (props) => {
    
    const [count, setCount] = useState(props.initial)

    const {initial, min, max, ...restProps} = props

    function countPlus(){
        if(count+1 <= props.max)
            setCount(count+1)
    }

    function countMinus(){
        if(count-1 >= props.min)
            setCount(count-1)
    }

    return(
        <div className="mt-2" key={props.id}>
            <span>Поточний рахунок: </span>{count}
            <button className=
            "bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded-md ml-4"
            onClick={()=> countPlus()}>+</button>

            <button className=
            "bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded-md ml-4"
            onClick={()=> countMinus()}>-</button>
            <button className=
            "bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded-md ml-4"
            onClick={()=>setCount(props.initial)}>Reset</button>
        </div>
    )
}

MyCounter.defaultProps = {
    initial: 0, 
    min: -5, 
    max: 10
}

export default MyCounter