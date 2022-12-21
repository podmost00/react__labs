import { useState, useEffect } from "react"
export const Form = () =>{

    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [topic, setTopic] = useState("")
    const [message, setMessage] = useState("")
    const [mailError, setMailError] = useState("Пошта не може бути пустою.")
    const [topicError, setTopicError] = useState("Тема не може бути пустою.")
    const [mailDirty, setMailDirty] = useState(false)
    const [topicDirty, setTopicDirty] = useState(false)
    const [formValid, setFormValid] = useState(false)

    useEffect(()=>{
        if(topicError || mailError){
            setFormValid(false)
        }
        else{
            setFormValid(true)
        }
    }, [topicError, mailError])    

    const blurHandler = (e) => {
        switch(e.target.name){
            case "mail":
                setMailDirty(true)
                break
            case "topic":
                setTopicDirty(true)
                break
        }
    }

    const inputHandler = (e) => {
        switch(e.target.name){
            case "name":
                setName(e.target.value)
                break
            case "mail":
                setMail(e.target.value)
                const re =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if (!re.test(String(e.target.value).toLowerCase())){
                    setMailError("Введена некоректна пошта")
                }
                else{
                    setMailError("")
                }
                break
            case "topic":
                setTopic(e.target.value)
                if (!e.target.value){
                    setTopicError("Тема не може бути пустою.")
                }
                else{
                    setTopicError("")
                }
                break
            case "message":
                setMessage(e.target.value)
                break
        }
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        console.log("Ім’я - " + name)
        setName("")
        console.log("Пошта - " + mail)
        setMail("")
        console.log("Тема - " + topic)
        setTopic("")
        console.log("Повідомлення - " + message)
        setMessage("")
    }

    return(
        <div className="w-96 border rounded-lg border-slate-600 text-center p-3">
            <span className="text-4xl">Реєстрація</span>
            <form onSubmit={(e) => submitHandler(e)}>
                <input value={name} onChange={e => inputHandler(e)} name="name" placeholder="Ім’я" className="border mt-4 mb-2 pl-2 p-1 border-black rounded" type="text" />
                {(mailDirty && mailError ) && <div className="text-rose-700">{mailError}</div>}
                <input value={mail} onBlur={e => blurHandler(e)} onChange={e => inputHandler(e)} name="mail" placeholder="E-mail*" className="border mt-4 mb-2 pl-2 p-1 border-black rounded" type="text" />
                {(topicDirty && topicError ) && <div className="text-rose-700">{topicError}</div>}
                <input value={topic} onBlur={e => blurHandler(e)} onChange={e => inputHandler(e)} name="topic" placeholder="Тема*" className="border m-4 pl-2 p-1 border-black rounded" type="text" />
                <textarea value={message} onChange={e => inputHandler(e)} name="message" placeholder="Повідомлення" className="pl-2 pt-1 border border-black rounded" cols="23" rows="7"></textarea>
                <div className="flex justify-end m-4">
                    <input type="submit" value={"Надіслати"} className="bg-blue-400 text-lg p-1 rounded" disabled={!formValid} />
                </div>
            </form>
        </div>
    )
}