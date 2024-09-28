// import React from 'react'

// const Counter = () => {
//   const [count, setCount] = React.useState(0)
//   const [a, setA] = React.useState(0)
//   const [b, setB] = React.useState(0)
//   const [result, setResult] = React.useState(0)

//   // change message if count is greater than 5 or less than 1 and also remove message


//   const increment = () => {
//     if(count >= 5){
//       setCount("You have reached the maximum limit")
//     }
//     else{
//       setCount(count + 1)
//     }
//   }
//   const decrement = () => {
//     if(count <= 1){
//       setCount("You have reached the minimum limit")
//     }
//     else{
//       setCount(count - 1)
//     }
//   }

//   return (
//     <div>
//       {/* <h1>Counter</h1>
//       <button onClick={increment}>+</button>
//       <button onClick={decrement}>-</button>
//       <h1>{count}</h1> */}
//       <h1>Calculater</h1>
//       value 1 : <input type="number" value={a} onChange={(e) => setA(e.target.value)} />
//       <br />
//       value 2 : <input type="number" value={b} onChange={(e) => setB(e.target.value)} />
//       <br />
//       <button onClick={() => setResult(parseInt(a) + parseInt(b))}>Add</button>
//       <button onClick={() => setResult(parseInt(a) - parseInt(b))}>Sub</button>
//       <button onClick={() => setResult(parseInt(a) * parseInt(b))}>Mul</button>

//       <h1>sum is {result}</h1>

//     </div>
//   )
// }

// export default Counter
