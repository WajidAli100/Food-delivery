import React from 'react'
import image1 from "../assets/image1.avif"
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { Decrement, Increment, removeFromCart } from '../redux/cartSlice';

function Cart2({ name, id, price, image, qty }) {
    let dispatch = useDispatch()
    return (
        <div className='w-full h-[120px] p-2 shadow-lg flex justify-between'>
            <div className='w-[60%] h-full flex gap-5'>
                <div className='w-[60%] h-full overflow-hidden rounded-lg'>
                    <img src={image} alt="" className='object-cover' />
                </div>
                <div className='w-[40%] h-full flex flex-col gap-5'>
                    <div className='text-lg text-gray-600 font-semibold'>{name}</div>
                    <div className='w-[80%] h-[50%] flex bg-slate-400 rounded-lg overflow-hidden shadow-lg font-semibold border-2 border-green-400 text-lg'>
                        <button className='w-[30%] h-full bg-white text-green-400 flex justify-center items-center
                         hover:bg-slate-200' onClick={() => { dispatch(Decrement(id)) }}>-</button>
                        <span className='w-[40%] h-full bg-slate-200 text-green-400 flex justify-center items-center'>{qty}</span>
                        <button className='w-[30%] h-full bg-white text-green-400 flex justify-center items-center
                         hover:bg-slate-200' onClick={() => {
                                dispatch(Increment(id))
                            }}>+</button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-start items-end gap-6'>
                <span className='text-xl text-green-400 font-semibold'>{price}</span>
                <RiDeleteBin6Line className='w-[30px] h-[30px] text-red-400 cursor-pointer' onClick={() => dispatch(removeFromCart(id))} />
            </div>
        </div>
    )
}

export default Cart2