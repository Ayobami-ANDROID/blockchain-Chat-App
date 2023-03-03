import React from 'react'
import Style from './Error.module.css'

const Erro = ({error}) => {
  return (
    <div className={Style.Error}>
      <div className={Style.Error_box}>
        <h1>Please fix this error & reload browsers</h1>
        {error}
      </div>
    </div>
  )
}

export default Erro