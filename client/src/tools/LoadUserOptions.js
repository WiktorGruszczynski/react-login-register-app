import axios from "axios"
import serverUrl from "./serverUrl"

const LoadUserOptions = () => {
    axios.post(serverUrl+"/user", {
        id: localStorage.getItem("id"),
    })
    .then(res=>{
        Object.keys(res.data).forEach(key=>{
            
            if (res.data[key]==null) {
                localStorage.setItem(key, '')
            }
            else{
                localStorage.setItem(key, res.data[key])
            }
        })
    })
    .catch(err=>{
        console.log(err)
    })
}

export default LoadUserOptions;