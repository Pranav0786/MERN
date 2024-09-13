import toast from "react-hot-toast";
import {FcDeleteDatabase} from "react-icons/fc"
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";



const CartItem = ( {item,itemIndex} ) => {

  const dispatch = useDispatch() ;

  const removeFromCart = () => {  
    dispatch(remove(item.id)) ;
    toast.success("Item Removed") ;
  }


  return (
    <div>
        <div className="w-50 h-50 flex justify-center items-center  gap-3 p-4 mt-10 ml-5 rounded-xl ">

            <div className="w-[300px]">
              <img alt="item-image" src={item.image} 
              className="w-full h-full" />
            </div>

            <div className="bg-green-400 flex flex-col gap-8 w-[50%]">
                <h1 
                className="font-semibold text-gray-600 text-2xl"> {item.title} </h1>
                <h1> {item.description} </h1>
                <div>
                    <p> {item.price} </p>
                    <div
                    onClick={removeFromCart}
                    >
                      <FcDeleteDatabase />
                    </div>
                </div>
            </div>


        </div>
    </div>
  ) ;
}
export default CartItem;

