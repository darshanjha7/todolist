import React,{useState,useEffect} from 'react'
import "./style.css"
const getLocalData=()=>{
    var lists=localStorage.getItem("myTodoList");
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
  
}
const Todo = () => {
    const [inputData,setInputData]=useState("");
    const [items,setItems]=useState(getLocalData());
    const [isEditItem,setIsEditItem]=useState("");
    const [toggleButton,setToggleButton]=useState(false)
    const addItem=()=>{
        if(!inputData){

        }
        else if (toggleButton && inputData){
            setItems(
                items.map((currEle)=>{
                if(currEle.id===isEditItem){
                    return {...currEle,name:inputData}
                }
                else{
                    return currEle;
                }
            }))
            setInputData("");
            setIsEditItem(null)
            setToggleButton(false)
        }
        else{
            const myNewInputData={
                id:new Date().getTime().toString(),
                name:inputData
            }
            setItems([...items,myNewInputData])
            setInputData("")
        }
    }

    // how to delete items
    const deleteItem=(idToBeDeleted)=>{
      

       
        setItems(items.filter((ele)=>{
            return ele.id!=idToBeDeleted;
        }))
    }

    // remove all the elements

    const removeAll=()=>{
        setItems([])
    }

    //adding localstorage
    useEffect(()=>{
        localStorage.setItem("myTodoList",JSON.stringify(items))
    },[items])

    //edit the item
    const editItem=(index)=>{
        const item_todo_edit=items.find((currEle)=>{
            return currEle.id===index
        });
        setIsEditItem(index);
        setInputData(item_todo_edit.name);
        setToggleButton(true);
    }
  return (
    <>

        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src="./images/todo.svg" alt="todologo" />
                    <figcaption>Add Your List Here ✌ </figcaption>
                </figure>
                <div className='addItems'>
                    <input type="text" value={inputData} onChange={(event)=>setInputData(event.target.value)} className='form-control' placeholder='✍ Add Item'/>
                    {
                        toggleButton ? (
                            <i className="far fa-edit add-btn " onClick={addItem}></i>
                        ): (
                            <i className="fa fa-plus add-btn"  onClick={addItem}></i>
                        )
                    }
                </div>
                {/* show our items */}
                <div className='showItems'>
                    {
                        items.map((currEle,index)=>{
                            return (
                                <div key={index} className='eachItem'>
                                    <h3 >{currEle.name}</h3>
                                    <div className='todo-btn'>
                                        <i className="far fa-edit add-btn " onClick={()=>editItem(currEle.id)}></i>
                                        <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(currEle.id)} ></i>

                                    </div>
    
                                </div>
                            )
                        })
                    }
                   
                </div>

                <div className='showItems'>
                    <button onClick={removeAll} className='btn effect04' data-sm-link-text="Remove All">
                        <span>CHECK LIST</span>
                    </button>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default Todo
