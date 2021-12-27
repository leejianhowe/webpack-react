import { useEffect } from "react";

function button() {
  const init = () => {
    try {
      new Promise<Boolean>((res,rej)=>{
        res(true)
        rej(false)
      });
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    console.log(init())
    return () => {};
  }, []);
  return (
    <div>
      <button
        onClick={function () {
          console.log("world");
        }}
      >
        Hello
      </button>
    </div>
  );
}

export default button;
