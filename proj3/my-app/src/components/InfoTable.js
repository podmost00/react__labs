import {useEffect, useState} from 'react'
import axios from 'axios';
import MyRow from './MyRow';
import MyModal from './MyModal';


const InfoTable = (props) => {

    console.log(Math.floor(1.4))
    console.log(Math.round(1.4))

    const [filtered, setFiltered] = useState([])
    const [active, setActive] = useState(false)
    const [img, setImg] = useState('')
    const [list, setList] = useState([])
    const [height, setHeight] = useState(280)
    const [lim, setLim] = useState(5000)
    const [count, setCount] = useState(10)
    const [page, setPage] = useState(0)
    const [pDisable, setPDisable] = useState(false)
    const [mDisable, setMDisable] = useState(true)
    const [sort, setSort] = useState(true)
    const [myTitle, setMyTitle] = useState('')
    const [myAlbum, setMyAlbum] = useState('')
    const [titleArrow, setTitleArrow] = useState('SORT')
    const [albumArrow, setAlbumArrow] = useState('SORT')

    async function fetchInfo(limit){
        const response = await(await axios("https://jsonplaceholder.typicode.com/photos?_limit=" + limit)).data
        let arr = []
        for(let i=0; i<response.length; i++){
            if(response[i].title.split(' ').length-1 <= 6){
                arr.push(response[i])
            }
        }
        
        setLim(limit)
        setList(arr)
        setFiltered(arr)
        setPDisable(false)
        setMDisable(true)
        setPage(0)
        setTitleArrow('SORT')
    }

    function myFilter(){
        setPage(0)
        if(myAlbum==='' && myTitle==='')
            setFiltered(list)
        else if(myAlbum==='' && myTitle!=='')
            setFiltered(list.filter(item =>  item.title.includes(myTitle)))
        else if(myAlbum!=='' && myTitle==='')
            setFiltered(list.filter(item =>  item.albumId == myAlbum))
        else
            setFiltered(list.filter(item => item.title.includes(myTitle) && item.albumId == myAlbum))

    }

    useEffect(() =>{
        myFilter()
    }, [myTitle, myAlbum])
    

    function titleSort(){
        setAlbumArrow('SORT')
        if(sort){
            setList(filtered.sort((a, b) => a.title > b.title ? 1 : -1))
            setSort(!sort)
            setTitleArrow('🠗')
        }
        else{
            setList(filtered.sort((a, b) => a.title > b.title ? -1 : 1))
            setSort(!sort)
            setTitleArrow('🠕')
        }
    }

    function albumSort(){
        setTitleArrow('SORT')
        if(sort){
            setList(filtered.sort((a, b) => a.albumId > b.albumId ? 1 : -1))
            setSort(!sort)
            setAlbumArrow('🠗')
        }
        else{
            setList(filtered.sort((a, b) => a.albumId > b.albumId ? -1 : 1))
            setSort(!sort)
            setAlbumArrow('🠕')
        }
    }

    function pagePlus(){
        setPage(page+1)
        if(filtered.slice((page+2)*count, (page+2)*count+count).length == 0){
            setPDisable(!pDisable)
        }
        setMDisable(false)
    }

    function pageMinus(){
        setPage(page-1)
        console.log(page)
        if(filtered.slice((page-2)*count, (page-2)*count+count).length == 0){
            setMDisable(!mDisable)
        }
        setPDisable(false)
    }

    useEffect(() =>{
        fetchInfo(lim)
    }, [])

    useEffect(() => {
        setPage(0)
        setMDisable(true)
        setPDisable(false)
        console.log('Boom')
    }, [count])

    return(
        <div>
            <div className='my-2 flex justify-center'>
                Кількість записів - 
                <input className='border-[1px] border-black mx-2' value={lim} type="number" min={1} max={5000} onChange={(e) => fetchInfo(Number(e.target.value))}/>
                Висота блоку - 
                <input className='border-[1px] border-black mx-2' value={height} type="number" onChange={(e) => setHeight(Number(e.target.value))}/>
                Кількість записів на сторінці - 
                <input className='border-[1px] border-black mx-2' value={count} type="number" onChange={(e) => setCount(Number(e.target.value))}/>
            </div>
            <div className='my-2 flex justify-center'>
                Назва - <input type="button"  value={titleArrow} onClick = {() => titleSort()}/>&nbsp;&nbsp;&nbsp;
                Альбом - <input type="button"  value={albumArrow} onClick = {() => albumSort()}/>
            </div>
            <div className='my-2 flex justify-center'>
                Назва - <input type="text" value={myTitle} className='border-[1px] border-black mx-2' onChange={(e) => setMyTitle(e.target.value)}/>&nbsp;&nbsp;&nbsp;
                Альбом - <input type="text" className='border-[1px] border-black mx-2' onChange={(e) => setMyAlbum(e.target.value)}/>
            </div>
            <div className='my-2 flex justify-center items-center'>
                <button className='mr-2 text-2xl' disabled={mDisable} onClick={() => pageMinus()}>- </button>
                <span style={{marginTop: 6}}>{page+1}/{Math.floor(filtered.length/count)+1}</span>
                <button className='ml-2 text-2xl' disabled={pDisable} onClick={() => pagePlus()}> +</button>
            </div>
            <div style={{height: height}} className='overflow-scroll'>
                <table className='w-full'>
                    {filtered.slice(page*count, page*count+count).map((el) => <MyRow item = {el} setActive = {setActive} setImg={setImg}/>)}
                </table>
            </div>
            <MyModal active = {active} setActive = {setActive} img={img} setImg = {setImg}/>
        </div>
    )

}

export default InfoTable