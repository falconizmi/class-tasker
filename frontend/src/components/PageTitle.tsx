import React from 'react'
import style from '../styles/modules/title.module.css'

function PageTitle({children, ...rest}:{children: string}) {
  return (
    <p className={style.title} {...rest}>
        {children}
    </p>
    
  )
}

export default PageTitle
