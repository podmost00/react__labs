import {useForm} from 'react-hook-form'
import { useState, useEffect } from 'react'
import { Pole } from './Pole'
import { Pak } from './Pak'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
export const FormLib = () => {

    const[schema, setSchema] = useState({})
    const[state, setState] = useState({
        "city1" : yup.string().required(),
        "city2" : yup.string().required(),
    })

    let {register, handleSubmit, reset, watch} = useForm({
        resolver : yupResolver(schema),
        mode: 'onChange'
    })
    
    const [len, setLen] = useState([1])

    const onSubmit = (data) => {
        console.log('xD')
        console.log(data)
    }

    const lenHandle = () => {
        let num = len[len.length -1 ] + 1
        setLen([...len, num])
    }

    useEffect(()=> {
        let obj = state
        let count = 'count'+len.length
        let price = 'price'+len.length
        let weight = 'weight'+len.length
        let length = 'length'+len.length
        let width = 'width'+len.length
        let height = 'height'+len.length
        obj[count] = yup.number().positive().required()
        obj[price] = yup.number().positive().required()
        obj[weight] = yup.number().positive().required()
        obj[length] = yup.number().positive().required()
        obj[weight] = yup.number().positive().required()
        obj[width] = yup.number().positive().required()
        obj[height] = yup.number().positive().required()
        

        setSchema(yup.object(obj))
        setState(obj)

    }, [len, state])

    return(
        <form className='border rounded-lg border-slate-600 w-[650px] p-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex mb-4'>
                <div className='mr-40'>
                    Маршрут
                </div>
                <div >
                <select className='border border-slate-600 mr-2' {...register('city1')}>
                        <option selected disabled key="0"></option>
                        <option value="Житомир" key="1">Житомир</option>
                        <option value="Вінниця" key="2">Вінниця</option>
                        <option value="Київ" key="3">Київ</option>
                        <option value="Ужгород" key="4">Ужгород</option>
                        <option value="Тернопіль" key="5">Тернопіль</option>
                        <option value="Коростишів" key="6">Коростишів</option>
                    </select>
                    <select className='border border-slate-600' {...register('city2')}>
                        <option selected disabled key="0"></option>
                        <option value="Житомир" key="1">Житомир</option>
                        <option value="Вінниця" key="2">Вінниця</option>
                        <option value="Київ" key="3">Київ</option>
                        <option value="Ужгород" key="4">Ужгород</option>
                        <option value="Тернопіль" key="5">Тернопіль</option>
                        <option value="Коростишів" key="6">Коростишів</option>
                    </select>
                </div>
            </div>
            <div className='flex mb-4'>
                <div className='mr-24'>
                    Вид відправлення
                </div>
                <div>
                    <select className='border border-slate-600' {...register('type')}>
                        <option value="Палети" key="1">Палети</option>
                        <option value="Вантажі" key="2">Вантажі</option>
                    </select>
                </div>
            </div>
            <div className='flex mb-4'>
                <div className='mr-16'>
                    Характеристика місць
                </div>
                <div>
                    {len.map(item => <Pole key={item} register={register} number={item}/>)}
                </div>
            </div>
            <button onClick={lenHandle}>
                Додати місце
            </button>
            <div className='flex mb-4' >
                <div className='mr-[70px]'>
                    Послуга "Пакування"
                </div>
                <div>
                    <input className='w-5 h-5' type="checkbox" {...register('pak')}/>
                    {watch('pak') && len.map((item) => <Pak watch={watch} number={item}/>)}
                </div>
            </div>
            <div className='flex mb-4'>
                <div className='mr-4'>
                    Послуга "Підйом на поверх"
                </div>
                <div>
                    <input className='border border-slate-600' type="number" {...register('up', {
                        required: true
                    })} />кількість поверхів. 
                     Ліфт <input className='w-5 h-5' type="checkbox" {...register('lift')} />
                </div>
            </div>
            <div className='flex mb-4'>
                <div className='mr-2'>
                    Послуга "Зворотна доставка"
                </div>
                <div className=''>
                    <input className='w-5 h-5' type="checkbox" {...register('back')}/>
                </div>
            </div>
            <div className='text-center items-center'>

                <button className='border border-slate-700 mr-20' type='submit'>Відобразити</button> 
                <button className='border border-slate-700' onClick={()=>{
                    reset()
                }}>Очистити</button>

            </div>

        </form>
    )
}