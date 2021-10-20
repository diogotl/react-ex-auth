import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Dashboard() {

    const { user } = useContext(AuthContext)
    
    if(!user){

    }

    return(
        <h1>Dashboard</h1>
    )
}