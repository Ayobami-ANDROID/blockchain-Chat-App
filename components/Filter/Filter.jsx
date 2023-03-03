import React,{useState,useContext} from 'react'
import Image from 'next/image'

//INTERNAL IMPORT
import Style from './Filter.module.css'
import images from '../../assets'
import { ChatAppContect } from '../../Context/ChatAppContext'
import { Model } from '../index'

const Filter = () => {
  const {account,addFriends} = useContext(ChatAppContect)

  //USESTATE
  const[addFriend,setAddFriend]= useState(false)

  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="image" width={20} height={20}></Image>
            <input type="text" placeholder='search' />
          </div>
        </div>
        <div className={Style.Filter_box_rigth}>
          <button>
            <Image src={images.clear} alt="clear" width={20} height={20}></Image>
            CLEAR CHAT
          </button>
          <button onClick={() => setAddFriend(true)}>
            <Image src={images.user} alt="clear" width={20} height={20}></Image>
            Add Friend
          </button>
        </div>
      </div>
      {/* Model Component */}
      {addFriend &&(
        <div className={Style.Filter_model}>
          <Model openBox={setAddFriend} title="WELCOME TO" head="CHAT BUDDY" 
          info="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque, dolorum corporis debitis temporibus nostrum, ut animi dignissimos id fuga quia, ducimus in voluptates quaerat voluptatem rerum minima velit odit magni!"
          smallInfo="Kindly select your friend name and address.."
          image={images.hero}
          functionName={addFriends}
          />
        </div>
      )}
    </div>
  )
}

export default Filter