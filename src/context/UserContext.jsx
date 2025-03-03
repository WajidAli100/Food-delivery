import React, { useState, createContext } from 'react';
import { food_items } from '../food';

export const dataContext = createContext();



const UserContext = ({ children }) => {
    let [cate, setCate] = useState(food_items)
    const [input, setInput] = useState("");
    let [showCart, setShowCart] = useState(false);
    let data = {
        input,
        setInput,
        cate,
        setCate,
        showCart,
        setShowCart
    }
    return (
        <dataContext.Provider value={data}>
            {children}
        </dataContext.Provider>
    );
};

export default UserContext;
