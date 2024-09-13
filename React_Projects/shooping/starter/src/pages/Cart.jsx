import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem  from "../components/CartItem"
import { useEffect, useState } from "react";



const Cart = () => {

  const {cart} = useSelector((state)  => state) ;
  const [totalAmount,setTotalAmount] = useState(0) ;

  useEffect(() => {
    setTotalAmount( cart.reduce( (acc,curr)=> acc + curr.price , 0 )) ;
  },[cart])


  return (

    <div>

      { 
        cart.length > 0 ?
        ( 
          <div className="flex justify-between items-center max-w-6xl mx-auto"> 
              <div
              className="">
                {
                  cart.map( (item,index) => {
                    return <CartItem key={item.id} item={item} itemIndex={index} />
                  })
                }
              </div>

              <div className="bg-red-300 h-screen flex flex-col items-stretch">

                <div 
                className="w-50%">
                  <div className="text-green-800 uppercase text-2xl font-semibold ">Your Cart</div>
                  <div className="text-green-800 uppercase text-5xl font-bold">Summary</div>
                  <p>
                    <span>Total Items: {cart.length}</span>
                  </p>
                </div>

                <div>
                  <p>Total Amount: ${totalAmount}  </p>
                  <button>
                    CheckOut Now
                  </button>
                </div>

              </div>


          </div>
        ) :
        (
          <div className="flex flex-col justify-center items-center">
            <h1>Card Empty</h1>
            <Link to={"/"}>
              <button>
                Shop Now
              </button>
            </Link>
          </div>
        ) 
      }

    </div>

  ) ;
};

export default Cart;
