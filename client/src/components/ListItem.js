import { useState } from "react";
import ProgressBar from "./ProgressBar"
import TickIcon from "./TickIcon"
import Modal from "./Modal";

function ListItem({task,getData}) {
  const [showModal,setShowModal] = useState(false)

  async function deleteItem(){
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,{
        method: 'DELETE'
      })
      if(response.status === 200){
        getData()
      }
    } catch (error) {
      console.log(error)
    }
  } 

    return (
      <li className="list-item">
        <div className="info-container">
          <TickIcon />
          <p className="task-title">{task.title}</p>
          <ProgressBar progress={task.progress} />
        </div>

        <div className="button-container">
          <button className="edit" onClick={()=> setShowModal(true)}>EDIT</button>
          <button className="delete" onClick={deleteItem}>DELETE</button>
        </div>
        {showModal && <Modal  mode={'edit'} setShowModal={setShowModal} task={task} getData={getData} />}
      </li>
    );
  }
  
  export default ListItem;
  