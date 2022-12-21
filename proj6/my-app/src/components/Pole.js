export const Pole = ({register, number}) => {
    return(
        <div>
            <input className='border border-slate-600 h-5 w-10 mr-1' defaultValue={1} type="number" {...register('count'+number)}/> 
            <input className='border border-slate-600 h-5 w-10 mr-1' type="text" {...register('price'+number)} />грн
            <input className='border border-slate-600 h-5 w-10 ml-1' type="text" {...register('weight'+number)}/>кг  
            <input className='border border-slate-600 h-5 w-10 mr-1' type="text" {...register('length'+number)}/> 
            <input className='border border-slate-600 h-5 w-10 mr-1' type="text" {...register('width'+number)}/>  
            <input className='border border-slate-600 h-5 w-10' type="text"{...register('height'+number)}/>см
        </div>
    )
}