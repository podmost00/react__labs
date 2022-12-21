import { useState, useEffect } from "react"

const MyGame = () => {
    
    const [value, setValue] = useState(0)
    const [attmepts, setAttempts] = useState(0)
    const [game, setGame] = useState(false)
    const [tries, setTries] = useState([])
    const [myValue, setMyValue] = useState('')
    const [result, setResult] = useState('')

    const gameStarter = () => {
        setGame(!game)
        setTries([])
        setAttempts(0)
        setResult('')
        setValue(Math.round(Math.random()*1000))
    }

    const checkMyNumber = (e) => {
        e.preventDefault()
        e.target.reset()
        if(myValue < value)
            setTries([...tries, `N > ${myValue}`])
        else if(myValue > value)
            setTries([...tries , `N < ${myValue}`])
        else
            gameEnder(true)

        setAttempts(attmepts+1)
    }
    useEffect(()=> {        
        if(attmepts==10){
            if(myValue != value) 
                gameEnder(false)
            else
                gameEnder(true)
        }
    }, [attmepts])

    useEffect(()=>{
        console.log(value)
    }, [value])


    const gameEnder = (finish) => {
        if(finish)
            setResult('Гарна робота!')
        else
            setResult('Гру закінчено')
        setGame(!game)
    }

    return(
        <div>
            <div>
                <form onSubmit={(e) => checkMyNumber(e)}>
                    <button className=
                    "border-2 py-1 px-1"
                    disabled={game}
                    onClick={() => gameStarter()}>Нова гра</button>
                    <input className=
                    "border-2 px-2 mx-2 border-slate-900"
                    type="number" 
                    onChange={(e) => setMyValue(e.target.value)}
                    disabled={!game}
                    />

                    <input type='submit' className=
                    "border-2 py-1 px-1"
                    disabled={!game}
                    value={'Спробувати'}/>
                </form>
            </div>
            <div className="mt-2">
                <span>Інформація:</span>
                <br/>
                <div className="bg-yellow-400 w-80 rounded-md">
                    {tries.map((tryy) => 
                    <span>
                        {tryy}
                        <br/>
                    </span>)}
                </div>
                <span>Спроб: {attmepts}</span>
                <br/>
                <span>Результат: {result}</span>
            </div>
        </div>
    )
}

export default MyGame