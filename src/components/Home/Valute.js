import React, { useState } from 'react';

const Valute = () => {
    const [valute, setValute] = useState() 
    return (
      <>
      <select value={valute} onChange={event=>setValute(event.target.value)}>
        <option>dinara</option>
        <option>evra</option>
        <option>dolara</option>
      </select>
      </>
    );
    }

export default Valute;