"use client"
import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import React from 'react';
import axios from 'axios';
import { CompactTable } from '@table-library/react-table-library/compact';

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
            setOrders(res.data.data)
            console.log(orders)
        }).catch((err) => {
            console.log(err) })

    } 
}, []);

const nodes = [
    {
      id: '0',
      name: 'Shopping List',
      deadline: new Date(2020, 1, 15),
      type: 'TASK',
      isComplete: true,
      nodes: 3,
    },
  ];
  
  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
    },
    { label: 'Type', renderCell: (item) => item.type },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
    },
    { label: 'Tasks', renderCell: (item) => item.nodes },
  ];
  
 
    const data = { nodes };
  
    return <CompactTable columns={COLUMNS} data={data} />;
  


return (
    <> <div ref={animationContainer} style={{width: '300px', height: '300px', margin:"auto"}}></div>
    {JSON.stringify(orders)}
</>
);
}