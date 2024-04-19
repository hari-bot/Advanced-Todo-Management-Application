import ListHeader from "./ListHeader";
import ListItem from "./ListItem"
import {useState,useEffect} from "react"
import Auth from "./Auth";
import { useCookies } from "react-cookie"

function App() {
  const [tasks,setTasks] = useState(null)
  const [cookies,setCookie,removeCookie] = useCookies(null)
  const userEmail = cookies.Email
  const authToken = cookies.AuthToken

  
  async function getData(){
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
      const json = await response.json()
      setTasks(json)
      
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{ 
    if(authToken) {
      getData()
    }
  },[])

 


  //sort by date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken &&
       <>
         <ListHeader listName={"Holiday tick list"}  getData={getData}/>
         <p className="user-email">Welcome back {userEmail}</p>
        {sortedTasks?.map((task)=><ListItem key={task.id} task={task} getData={getData} />)}
       </>
       }
      <p className="copyrigth">© Creative coding LLC</p>
    </div>

  )
}

export default App;
