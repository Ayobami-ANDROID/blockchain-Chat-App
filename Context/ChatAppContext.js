import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/router'

//INTERNAL IMPORT

import  {chechIfWalletConnected,connectWallet,connectingWithContract} from '../utils/apiFeature'

export const ChatAppContext = React.createContext()

export const ChatAppProvider = ({children}) =>{
    const title = "Hey welcome to blockchain chat App"

    return(
        <ChatAppContext.Provider value={{title}}>
            {children}
        </ChatAppContext.Provider>
    )
}

