import React from 'react'
import { MdFastfood } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { FiShoppingBag } from "react-icons/fi";
import { useContext } from 'react';
import { dataContext } from '../context/UserContext';
import { useEffect } from 'react';
import { food_items } from '../food';
import { shallowEqual, useSelector } from 'react-redux';

const Nav = () => {
    let { input, setInput, cate, setCate, showCart, setShowCart } = useContext(dataContext)

    useEffect(() => {
        let newlist = food_items.filter((item) => item.food_name.includes(input) || item.food_name.toLowerCase().includes(input))
        setCate(newlist)
    }, [input])
    let items = useSelector(state => state.cart.cart || []);
    return (
        <div className='w-full h-[100px] flex justify-between items-center px-5 md:px-8'>
            <div className='bg-white w-[60px] h-[60px] flex items-center justify-center rounded-md shadow-xl'>
                <MdFastfood className='w-[30px] h-[30px] text-green-500' />
            </div>
            <form className='w-[40%] h-[60px] md:w-[70%s] bg-white flex items-center px-5 gap-5 rounded-md shadow-xl'
                onSubmit={(e) => e.preventDefault()} >
                <IoMdSearch className='w-[20px] h-[20px] text-green-500' />
                <input type="text" placeholder='Search Items...' className='w-[100%] outline-none text-[20px]'
                    onChange={(e) => setInput(e.target.value)} value={input} />
            </form>
            <div className='bg-white w-[60px] h-[60px] flex items-center justify-center rounded-md shadow-xl 
            cursor-pointer relative' onClick={() => {
                    setShowCart(true)
                }}>
                <span className='absolute top-0 right-2 text-green-500'>{items.length}</span>
                <FiShoppingBag className='w-[30px] h-[30px] text-green-500' />
            </div>
        </div>
    )
}

export default Nav