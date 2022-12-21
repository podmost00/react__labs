import { useMemo, useEffect } from "react"
import { createPortal} from "react-dom" 

const notificationElement = document.getElementById("notification")
console.log(notificationElement)

export const Notification = (props) => {
    
    const element = useMemo(() => {
        const element = document.createElement("div");
        return element
    }, [])

    useEffect(() => {
        notificationElement.appendChild(element)

        return () => {
            notificationElement.removeChild(element)
        }
    })


    if(props.open){
    return createPortal(
        <div className={"fixed bottom-2 w-full flex justify-center text-center"}>
            <div className="bg-green-300 w-[20%] text-center rounded-md">{props.lastLike} <br/> додано в улюблені</div>
        </div>
        , element)
    }

    return null
}