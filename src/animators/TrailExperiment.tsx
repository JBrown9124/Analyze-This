import React, { useState } from 'react'
import { useTrail, a } from '@react-spring/web'

import styles from './styles.module.css'

const Trail: React.FC<{ open: boolean }> = ({ open, children }) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 1, tension: 280, friction: 160 },
   to:{ opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    y: open? 0: 70,
    height: open ? 110 : 0,},
    from: { opacity: 0, x: 20, height: 0, y:-50},
  


    transform:open? `translate(${0}px, ${0}px)
    rotate(0deg) 
    
    scale(${1})`: `translate(${0}px, ${0}px)
    rotate(${0}deg)
    scale(${0})`,
    
  

  
    

  })
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className={styles.trailsText} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  )
}
export default Trail