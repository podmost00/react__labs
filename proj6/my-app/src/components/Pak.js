import { useState, useEffect } from "react"

export const Pak = ({watch, number}) => {

    const [value, setValue] = useState(0)

    async function takeCount(){
        const v = await watch('count' + number)
        setValue(v)
    }

    useEffect(()=> {
        takeCount()
    }, [watch('count'+number)])

    return(
        <div>
            {value}
        </div>
    )
}