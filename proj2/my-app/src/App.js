import MyCounter from "./components/MyCounter";
import MyProducts from "./components/MyProducts";
import MyCart from "./components/MyCart";
import MyGame from "./components/MyGame";

function App() {

  const counter = [
    {id: 1, initial: 6, min: -5, max: 10},
    {id: 2, initial: 5},
    {id: 3}
  ]

  const products = [
    {id: 1, name: "Constructor LEGO", price: 300},
    {id: 2, name: "Train Station", price: 200},
    {id: 3, name: "How Weels Track", price: 150},
  ]

  return (
    <div key={"xD"} className="pl-4 pt-2">
      {counter.map(count => <MyCounter {...count} key={count.id}/>)}
      <MyProducts/>
      <MyCart products={products}/>
      <MyGame/>
    </div>
  )
}

export default App;
