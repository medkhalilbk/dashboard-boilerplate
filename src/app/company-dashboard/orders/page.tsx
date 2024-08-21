"use client"
import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import React from 'react';
import axios from 'axios';

export default function MyComponent() { 

const animationContainer = useRef<HTMLDivElement>(null); 
let [orders, setOrders] = React.useState<any>([])

useEffect(() => {
    if(!animationContainer.current) return;
    lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/animation-delivery.json'
    });
    if(typeof(window) !== 'undefined'){
        let id = localStorage.getItem('id')
        axios.get(`/api/companies/${id}/orders`).then((res) => {
            setOrders(res.data.data.orders)
            console.log(orders)
        }).catch((err) => {
            console.log(err) })

    } 
}, []);

return (
    <>    <div ref={animationContainer} style={{width: '300px', height: '300px', margin:"auto"}}></div>
    {JSON.stringify(orders)}
</>
);
}