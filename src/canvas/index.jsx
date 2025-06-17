import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei'

import Shirt from './Shirt'
import CameraRig from './CameraRig'
import Backdrop from './Backdrop'

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }} //gl lets to pass options to the underlying WebGL renderer.
      // preserveDrawingBuffer: true tells WebGL to keep the drawing buffer after rendering each frame
      className='w-full max-w-full h-full transition-all ease-in'
    >
      <ambientLight intensity={0.6} />
      <Environment preset='city' /> 
      {/*   sets up realistic lighting and a background environment in 3D scene using an HDRI (High Dynamic Range Image) preset called "city". It adds a city-like lighting and background to 3D scene for more realistic rendering.*/}

      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel
// main canvas where it is the screen to show everything
