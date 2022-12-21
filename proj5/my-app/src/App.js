import { useEffect, useState, useReducer } from "react";
import axios from 'axios';
import { MainPage } from "./components/MainPage";

function init(initial){
  return {liked: initial}
}

function reducer(state, action){
  switch(action.type){
      case 'ADD': 
          return {liked: [...state.liked, action.item]}
      case 'REMOVE':
          return {liked: action.item.liked}
      default:
          break;
  }
}

function App() {

  const [products, setProducts] = useState([])
  const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('liked')), init)
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [currentCategory, setCurrentCategory] = useState('all')
  const [filter, setFilter] = useState('rate')

  const mySort = (array, field) => {
      console.log(filter)
      if (field === "price-"){
        return array.sort((a, b) => Number(a.price) < Number(b.price) ? 1 : -1)
      }
      else if (field === "price+"){
        return array.sort((a, b) => Number(a.price) > Number(b.price) ? 1 : -1)
      }
      else{
        return array.sort((a, b) => Number(a.rating.rate) < Number(b.rating.rate) ? 1 : -1)
      }
  }

  async function fetchCategory(){
    const categoriesResponse = await axios.get("https://fakestoreapi.com/products/categories")
    setCategories(categoriesResponse.data)
  }

  async function fetchProducts(){
    setLoading(true)
    if(currentCategory === "all"){
      const response =  await (await axios.get("https://fakestoreapi.com/products")).data
      setProducts(mySort(response))
    }
    else{
      const response =  await (await axios.get("https://fakestoreapi.com/products/category/" + currentCategory)).data
      setProducts(mySort(response))
    }
    setLoading(false)
    setFilter("rate")
  }
  
  useEffect(()=>{
    fetchCategory()
  }, [])

  useEffect(() => {
    localStorage.setItem('liked', JSON.stringify(state.liked))
  }, [state.liked])

  useEffect(() => {
    fetchProducts()
  }, [currentCategory])

  return (
    <>
          <MainPage products={products} dispatch={dispatch} state={state} loading={loading} categories={categories}
           setCurrentCategory={setCurrentCategory} currentCategory={currentCategory} filter={filter} setFilter={setFilter} mySort={mySort} setProducts={setProducts}/>
    </>
  );
}

export default App;
