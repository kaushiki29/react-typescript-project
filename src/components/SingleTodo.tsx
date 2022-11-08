import React,{useState, useRef, useEffect} from 'react'
import {Todo} from '../model'
import {AiFillEdit, AiFillDelete} from 'react-icons/ai';
import {MdDone} from 'react-icons/md'
import './styles.css';

interface Props {
    todo : Todo;
    todos : Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    
}

const SingleTodo:React.FC<Props> = ({todo, todos, setTodos}) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [editText, setEditText] = useState<string>(todo.todo);

    const inputRef = useRef<HTMLInputElement>(null);

   const handleDone = (id:number) => {
    setTodos(todos.map((todo)=>todo.id===id?{...todo, isDone:!todo.isDone}:todo))
   } 


   const handleDelete = (id:number) => {
    setTodos(todos.filter((todo)=> todo.id !== id));
   }

   const handleEdit = (e:React.FormEvent,id:number) => {
    e.preventDefault();
    setTodos(todos.map((todo)=>(
        todo.id===id?{...todo, todo:editText}:todo
    )))
    setEditMode(false);
   }

   useEffect(()=>{
    inputRef.current?.focus();
   },[editMode])

  return (
    <form className='todosSingle' onSubmit={(e)=>handleEdit(e, todo.id)}>

        {
            editMode?(
                <input value={editText} onChange={(e)=>setEditText(e.target.value)} className="todosSingleText" ref={inputRef}/>
            ):(
                todo.isDone ? (
                    <s className='todosSingleText'>{todo.todo}</s>
                ):(
                    <span className='todosSingleText'>{todo.todo}</span>
                )
            )
        }

        <div>
            <span className='icon'>
                <AiFillEdit onClick={()=>{
                    if(!editMode && !todo.isDone){
                        setEditMode(!editMode);
                    }
                }}/>
            </span>
            <span className='icon'>
                <AiFillDelete onClick={()=>handleDelete(todo.id)} />
            </span>
            <span className='icon' onClick={()=>handleDone(todo.id)}>
                <MdDone />
            </span>
        </div>
    </form>
  )
}

export default SingleTodo