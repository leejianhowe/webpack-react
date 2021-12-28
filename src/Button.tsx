function Button() {
  return (
    <div>
      <button
        onClick={function () {
          console.log("world");
        }}
      >
        Hello World
      </button>
      <button>name</button>
    </div>
  );
}

export default Button;
