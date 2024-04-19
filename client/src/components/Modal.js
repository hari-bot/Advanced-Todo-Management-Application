import { useState } from "react"
import { useCookies } from "react-cookie"


function Modal({mode,setShowModal,getData,task}) {
  const [cookie,setCookie,removeCookie] = useCookies(null)
  const editMode = mode === 'edit' ? true : false
  const [data,setData] = useState({
    user_email:editMode ? task.user_email : cookie.Email,
    title:editMode ? task.title : "",
    progress: editMode ? task.progress : 50,
    date: editMode ? "" : new Date()

  })


  function handleChange (event){
    const { name , value} = event.target

    setData(data => ({
      ...data,
      [name] : value
    }))

    console.log(data)

  }

  async function postData(event){
    event.preventDefault();
    try {
     const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/`,{
       method:'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(data)
      })

      if(response.status === 200){
        console.log('WORKED')
        setShowModal(false)
        getData()

      }
      
    } catch (error) {
      console.error(error)
    }
  }

  async function editData(event){
      event.preventDefault()
      try {    
        const response =await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,{
          method:'PUT',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify(data)
        })
        if(response.status === 200){
          setShowModal(false)
          getData()
        }
      } catch (error) {
        console.log(error)
      }
  }

    return (
      <div className="overlay">
        <div className="modal">
            <div className="form-title-container">
              <h3>Let's {mode} you task</h3>
              <button onClick={()=>  setShowModal(false)}>X</button>
            </div>
            <form>
              <input 
                required
                maxLength={30}
                placeholder="Your task goes here"
                name="title"
                value={data.title}
                onChange={handleChange}
              />
              <br/>
              
              <input 
                required
                type="range"
                min ="0"
                max="100"
                name="progress"
                value={data.progress}
                onChange={handleChange}
              />
              <input className={mode} type="submit" onClick={editMode ? editData : postData} />
            </form>
        </div>
      </div>
    );
  }
  
  export default Modal;
  