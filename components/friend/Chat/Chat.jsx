import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { converTime } from '../../../Utils/apiFeature'
import {Loader} from '../../index'

import Style from './Chat.module.css'
import images from '../../../assets'

const Chat = ({functionName,readMessage,friendMsg,account,userName,loading,currentUserName,currentUserAddress,readUser}) => {
    const[message,setMessage] = useState('') 
    const [chatData,setChatData] = useState({
        name:"",
        address:""
    })

    const router = useRouter()

    useEffect(() =>{
        if(!router.isReady)return
        setChatData(router.query)
        readMessage(router.query.address)
        readUser(router.query.address)
    },[router.isReady])

    console.log(chatData.address,chatData.name)
  return (
    <div className={Style.Chat}>
        {currentUserAddress && currentUserName ? (
            <div className={Style.Chat_user_info}>
                <Image src={images.accountName} alt="image" width={70} height={70}></Image>
                <div className={Style.Chat_user_info_box}>
                    <h4>{currentUserName}</h4>
                    <p className={Style.show}>{currentUserAddress}</p>
                </div>
            </div>
        ):(
            ""
        )}

        <div className={Style.Chat_box_box}>
            <div className={Style.Chat_box}>
                <div className={Style.Chat_box_left}>
                    {
                        friendMsg.map((el,i)=>(
                            <div>
                                {el.sender == chatData.address ?(
                                    <div className={Style.Chat_box_left_title}>
                                        <Image src={images.accountName} alt="image"
                                        width={50} height={50}
                                        ></Image>
                                        <span>
                                            {chatData.name} {""}
                                            <small>{converTime(el.timestamp)}</small>
                                        </span>
                                    </div>
                                ):(
                                    <div className={Style.Chat_box_left_title}>
                                        <Image src={images.accountName} alt="image"
                                        width={50} height={50}
                                        ></Image>
                                        <span>
                                            {userName} {""}
                                            <small>Time:{converTime(el.timestamp)}</small>
                                        </span>
                                    </div>
                                )}
                                <p key={i+1}>
                                    {el.msg}
                                    {""}
                                    {""}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
            {currentUserAddress && currentUserName ? (

                <div className={Style.Chat_box_send}>
                    <div className={Style.Chat_box_send_img}>
                        <Image src={images.smile} alt="smile" width={50} height={50}/>
                        <input type="text" placeholder="type your message" 
                        onChange={(e)=>setMessage(e.target.value)} 
                        />
                        <Image src={images.file} alt="file" width={50} height={50} />
                        {
                            loading == true ? (
                                <Loader/>
                            ):(
                                <Image src={images.send} alt="file" width={50} height={50} 
                                onClick={()=>functionName({msg:message,address:chatData.address})}/>
                            )
                        }
                    </div>
                </div>

            ): ""}
        </div>
    </div>
  )
}

export default Chat