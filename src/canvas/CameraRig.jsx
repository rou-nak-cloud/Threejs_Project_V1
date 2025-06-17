import React, { useRef } from 'react'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'

import state from '../store'
const CameraRig = ({ children }) => {
    const group = useRef() //Creates a React ref to access the underlying Three.js group object.
    const snap = useSnapshot(state)

    // to use the delta (means difference) we need useFrame
    useFrame((state, delta) => {
        // breakpoints for different screens mobile and desktop
        const isBreakPoint = window.innerWidth <= 1260;
        const isMobileView = window.innerWidth <= 600;

        //set the initial position for the model
        let targetPosition = [-0.4, 0, 2]   //x — horizontal position (left/right)
             // Eulers angle [0,0,0]        // y — vertical position (up/down)
                                            // z — depth position (forward/backward)
        if (snap.intro) {
            if(isBreakPoint) targetPosition = [0, 0, 2] //computer view
            if(isMobileView) targetPosition = [0, 0.2, 2.5] //mobile view and their positions
        } else {
            if (isMobileView) targetPosition = [0, 0, 2.5]
            else targetPosition = [0, 0, 2] //isBreakPoint
        }

        // set camera model position
        easing.damp3(state.camera.position, targetPosition, 0.26, delta)

        // set the model rotation smoothly
        easing.dampE(
            group.current.rotation, //→ The current rotation of your 3D group or object
            [state.pointer.y / 5, -state.pointer.x / 2.5, 0],
            //The target rotation values (Euler angles — [x, y, z]):
            // x-axis rotation: depends on vertical mouse movement (pointer.y / 10)
            // y-axis rotation: depends on horizontal mouse movement (-pointer.x / 5)
            // z-axis rotation: 0 (no tilt sideways)

            // ?? as simple 
            // Y-axis (vertical movement) is divided by 10 → very small effect.
            // X-axis (horizontal movement) is divided by 5 → slightly bigger effect.
            // Z is zero — no roll.

            0.25, // The easing factor (how fast to approach the target). Lower = slower, smoother transition.

            delta //The time difference between frames (so the animation is smooth and frame-rate independent).
        )
    })

  return (
   <group 
    ref={group}>
     {children} 
    {/* This pattern lets you group multiple 3D objects together in a scene and manipulate them as a single unit (e.g., move, rotate, or scale the whole group). The ref allows you to access and modify the group directly in your code if needed. */}
   </group>

  )
}

export default CameraRig
// positioning of camera