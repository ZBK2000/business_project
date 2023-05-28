import React from 'react';

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Notifications(){
  const notify = () => toast.success('Successful Join!');

  return (
    <div>
      <button onClick={notify}>Notify!</button>
      
      
    </div>
  );
}