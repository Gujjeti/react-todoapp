import React, { useEffect, useState } from 'react'

const TodoAp = () => {

    const [todos, setTodos] = useState([]);
    const [query, setQuery] = useState('');
    const [checked, setChecked] = useState(false);
const fetchData = async () =>{
    try{
        const res = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await res.json();
        setTodos(data);
    }
    catch(error){
        console.error('Error:', error)
    }
}

const handleSubmit = (e) =>{
e.preventDefault();
setTodos([...todos, {title: query, completed: false}].reverse());
}



const handleChange = (i) =>{
console.log(todos[i].completed);
let newTodos = [...todos];
// newTodos[i].completed = !newTodos[i].completed;
newTodos[i].completed ? newTodos[i].completed = false : newTodos[i].completed = true;
setTodos(newTodos);
}
useEffect(() => {
    fetchData();
}, []);

  return (
   <div className='card w-[50%] justify-center mx-auto mt-2'>
     <div className='mt-5'>
      <h1 className='text-3xl text-center font-bold underline'>Todo App</h1>
    <form className='flex gap-2 justify-center mt-5' onSubmit={handleSubmit}>
    <input type="text" placeholder="Type here" className="input" value={query} onChange={(e) => setQuery(e.target.value)} />
    <button className="btn btn-primary">Add</button>
    </form>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table className="table">
 
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

    {
        todos.slice(0,10).map((todo, i) =>{
            return <tr key={i}>
            <th>{i+1}</th>
            <td>{todo.title}</td>
            <td>{todo.completed ? "Completed" : "Pending"}</td>
            <td className='flex gap-2'>
           <input type="checkbox" checked={todo.completed}  onChange={() => handleChange(i)} className="checkbox" /> 
            Completed
            </td>
           
          </tr>
        })
      }

     
    </tbody>
  </table>
</div>

      
    </div>
   </div>
  )
}

export default TodoAp
