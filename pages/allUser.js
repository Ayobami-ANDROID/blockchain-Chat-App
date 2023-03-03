import React,{useState,useEffect,useContext} from 'react'
import { UserCard } from '../Components/index'
import Style from '../styles/allUser.module.css'
import { ChatAppContect } from '../Context/ChatAppContext'

const allUser = () => {
    const{userLists,addFriends} = useContext(ChatAppContect)
  return (
    <div>
        <div className={Style.alluser_info}>
            <h1>Find your Friends </h1>
        </div>

        <div className={Style.alluser}>
            {userLists.map((el,i)=>(
                <UserCard key={i+1} el={el} i={i} addFriends={addFriends}/>
            ))}
        </div>
    </div>
  )
}

export default allUser