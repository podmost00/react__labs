const MyRow = ({setActive, setImg, item}) => {



   return(
    <tr className="border-2 border-black">
        <td className="w-[50px]">
            <img
             className="rounded-full w-[50px] h-[50px]"
             onClick={() => {setActive(true); setImg(item.url)}}
             src={item.thumbnailUrl} alt="" />
        </td>
        <td className="text-sm">{item.title} <br/> item - {item.id} <br/> album - {item.albumId}</td>
    </tr>
   )
}

export default MyRow