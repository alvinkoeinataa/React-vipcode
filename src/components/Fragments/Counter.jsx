import { useState } from "react";

function Counter() {
  const [value, setValue] = useState(0);

  const tambah = () => {
    setValue(value + 1);
  };

  const kurang = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };
  return (
    <div>
      <div className="flex items-center w-full justify-center">
        <h2>aplikai counter</h2>
        <button onClick={kurang}>-</button>
        <p>{value}</p>
        <button onClick={tambah}>+</button>
      </div>
    </div>
  );
}

export default Counter;
