import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import categories from '../Categories'
import Card from '../components/Card'
import Nav from '../components/Nav'
import { dataContext } from '../context/UserContext'
import { food_items } from '../food'
import { RxCross2 } from "react-icons/rx";
import Cart2 from '../components/Cart2'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Home = () => {
    let { cate, setCate, input, showCart, setShowCart } = useContext(dataContext)


    function filter(category) {
        if (category === 'All') {
            setCate(food_items)
        }
        else {
            let newList = food_items.filter((item) => (item.food_category === category))
            setCate(newList)
        }
    }
    let items = useSelector(state => state.cart.cart || []);
    let subtotal = items.reduce((total, item) => total + item.qty * item.price, 0)
    let deliveryFee = 20;
    let taxes = subtotal * 0.5 / 100;
    let total = Math.floor(subtotal + deliveryFee + taxes);
    return (
        <div className='bg-slate-200 w-full min-h-screen '>
            <Nav />
            {!input ? <div className='flex flex-wrap gap-6 items-center justify-center'>
                {categories.map((item) => {
                    return <div className='w-[140px] h-[140px] bg-white flex flex-col items-start gap-5 p-5 text-[18px] font-semibold rounded-lg shadow-xl
                    hover:bg-green-200 cursor-pointer transition-all ' onClick={() => filter(item.name)}>
                        {item.icon}
                        {item.name}
                    </div>

                })}
            </div> : null}
            <div className='w-full gap-5 flex flex-wrap px-5 items-center justify-center pt-8 pb-8'>
                {cate.length > 0 ? cate.map((item) => {
                    return <Card key={item.food_id} name={item.food_name} image={item.food_image} id={item.food_id} price={item.food_price}
                        type={item.food_type} />
                }) : <div className='text-[20px] font-semibold text-gray-600'>No Items Found</div>}

                {/* {cate.map((item) => (
                    <Card name={item.food_name} image={item.food_image}
                        price={item.price} id={item.id} type={item.food_type} />
                ))} */}




            </div>
            <div className={`w-full md:w-[40vw] h-[100%] fixed top-0 right-0 p-6 bg-white shadow-lg flex flex-col items-center
            transition-all duration-500 ${showCart ? "translate-x-0" : "translate-x-full"}`}>
                <header className='w-[100%] flex justify-between items-center'>
                    <span className='text-green-400  text-[18px] font-semibold'>Order Items</span>
                    <span><RxCross2 className='w-[30px] h-[30px] text-green-400 font-semibold text-[18px] 
                    cursor-pointer hover:text-gray-600' onClick={() => setShowCart(false)} /></span>
                </header>
                {items.length > 0 ? <>
                    <div className='w-full mt-9 flex flex-col gap-8'>
                        {items.map((item) => (
                            <Cart2 key={item.id} name={item.name} image={item.image} price={item.price} id={item.id} qty={item.qty} />
                        ))}
                    </div>
                    <div className='w-full border-t-2 border-b-2 border-gray-400 mt-7 flex flex-col gap-2 p-8'>
                        <div className='w-full flex justify-between items-center'>
                            <span className='text-lg text-gray-600 font-semibold'>Subtotal</span>
                            <span className='text-green-400 text-md font-semibold'>Rs {subtotal}/-</span>
                        </div>
                        <div className='w-full flex justify-between items-center'>
                            <span className='text-lg text-gray-600 font-semibold'>Delivery Fee</span>
                            <span className='text-green-400 text-md font-semibold'>Rs {deliveryFee}/-</span>
                        </div>
                        <div className='w-full flex justify-between items-center'>
                            <span className='text-lg text-gray-600 font-semibold'>Taxes</span>
                            <span className='text-green-400 text-md font-semibold'>Rs {taxes}/-</span>
                        </div>
                    </div>
                    <div className='w-full flex justify-between items-center p-9'>
                        <span className='text-lg text-gray-600 font-semibold'>Total</span>
                        <span className='text-green-400 text-md font-semibold'>Rs {total}/-</span>
                    </div>
                    <button className='w-[80%] bg-green-500 p-3 rounded-lg hover:bg-green-400 transition-all
             text-slate-100' onClick={() => { toast.success("Order Placed Successfully") }}>Place Order</button>
                </> : <div className='text-center text-green-400 text-2xl font-semibold pt-5'>Empty Cart</div>}
            </div>
        </div>
    )
}

export default Home