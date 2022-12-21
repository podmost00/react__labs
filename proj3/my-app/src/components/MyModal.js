import "./modal.css"

const MyModal = ({active, setActive, img, setImg}) => {
    return(
        <div 
        className=
        {active ? "modal active" : "modal"}
        onClick={()=> {setActive(false); setImg('')}}
        >
            <img 
            src={img}
            className=
            "modal__content"
            onClick={(e) => e.stopPropagation()}
            >

            </img>
        </div>
    )
}

export default MyModal