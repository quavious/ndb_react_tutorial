import React from 'react';

import Customer from "./components/Customer";
import './App.css';

const customers = [
  {
    id: 1,
    image: "https://placeimg.com/64/64/1",
    name: "홍길동",
    birth: "961222",
    gender: "남자",
    job: "대학생"
  },
  {
    id: 2,
    image: "https://placeimg.com/64/64/2",
    name: "김공익",
    birth: "961222",
    gender: "남자",
    job: "대학생"
  },
  {
    id: 3,
    image: "https://placeimg.com/64/64/3",
    name: "이공군",
    birth: "991220",
    gender: "남자",
    job: "부사관"
  },
]

function App() {
  return (
    <div className="App">
      {customers.map(customer => {
        return <Customer key={customer.id} info={customer} />
      })}
    </div>
  );
}

export default App;
