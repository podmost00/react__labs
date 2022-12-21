import { useState } from "react";
import MyRow from "./MyRow";
const MyCart = (props) => {

    const products = [
        {id: 1, name: "Constructor LEGO", price: 300},
        {id: 2, name: "Train Station", price: 200},
        {id: 3, name: "How Weels Track", price: 150},
      ]

    const [values, setValues] = useState([])
    const [price, setPrice] = useState(0)
    const [count, setCount] = useState(0)

    const changeTotal = (obj) => {
        let newValues = values.splice(0)
        let index = newValues.findIndex(product => product.id === obj.id)
        if(index === -1)
            newValues.push(obj)
        else{
            newValues.splice(index, 1, obj)
        }
        setValues(newValues)
        setPrice(newValues.reduce((sum, prod) => {return sum+prod.price}, 0))
        setCount(newValues.reduce((sum, prod) => {return sum+prod.count}, 0))
    }

    return(
        <div className="mb-4 mt-4">
            <table>
                <thead>
                    <tr className="bg-green-300" key="header">
                        <td className="px-2 py-2">Name</td>
                        <td className="px-2 py-2">Price</td>
                        <td className="px-2 py-2">Quantity</td>
                        <td className="px-2 py-2">Total</td>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => <MyRow {...product} key={product.id} setNewTotal={changeTotal}/>)}
                </tbody>
                <tfoot>
                    <tr className="bg-blue-300" key="footer">
                        <td className="px-2 py-2" colSpan={2}>Totals</td>
                        <td className="px-2 py-2">{count}</td>
                        <td className="px-2 py-2">{price}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}


export default MyCart