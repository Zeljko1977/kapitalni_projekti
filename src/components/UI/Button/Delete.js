import React, { useState } from 'react';


export default function DeleteButton() {
  const [visible, setVisible] = useState(true);

  const removeElement = () => {
    setVisible((prev) => !prev);
  };

  return (
    <>
    <div>
      <br />
      {visible && (
        <button onClick={removeElement}>Delete</button>
      )}
    </div>
    </>
  );
}