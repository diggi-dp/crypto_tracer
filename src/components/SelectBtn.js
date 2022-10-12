import React from 'react'
import styles from '../pages/coinpage.module.css'

const SelectBtn = ({children,selected,onClick}) => {
  return (
    <span 
      onClick={onClick} 
      className={styles.selectbtn} 
      style={{ 
              backgroundColor: selected ? 'gold' : '',
              color: selected ? 'black' : '',
              fontWeight: selected ? 700 : 500,
            }}
      >
      {children}
    </span>
  )
}

export default SelectBtn;
