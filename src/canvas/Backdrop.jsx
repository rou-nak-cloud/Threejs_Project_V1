import React, { useRef } from 'react'
import { easing } from 'maath'
import { useFrame } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'

const Backdrop = () => {
    const shadows = useRef()

  return (
    <AccumulativeShadows
        ref={shadows}
        temporal // means smooth EDGES
        frames={60}
        alphaTest={0.55} // transparency of the shadow
        scale={10}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, -0.14]}
    >
        <RandomizedLight 
            amount={4}
            radius={9}
            intensity={0.55}
            ambient={0.25}
            position={[5, 5, -10]}
        >
          <RandomizedLight 
            amount={5}
            radius={5}
            intensity={0.29}
            ambient={0.29}
            position={[ -5, 5, 0 ]}
        >

        </RandomizedLight>
        </RandomizedLight>
    </AccumulativeShadows>
  )
}

export default Backdrop
// Backdrop => a yellow splash of color behind the shirt