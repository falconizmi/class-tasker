import React, {useState, useEffect} from "react"
import { Card } from "../Components/Card/card"

export const TodoPage = () => {

    const [todo, setTodo] = useState([])

    useEffect(()=> {
        fetch('/api').then(response => {
            console.log(response)
            if (response.ok) {
                console.log("line before return json")
                return response;
            }
        }).then(data => console.log(data))
    },[])
    

    return (
        <>
            <Card/>
        </>
    )
}