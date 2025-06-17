import React from 'react'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'

import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  // now use texture for that shirt
  const logoTexture = useTexture(snap.logoDecal)
  const fullTexture = useTexture(snap.fullDecal)  

  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)); // for smooth color transition..

  const stateString = JSON.stringify(snap);
  return (
    <group key={stateString} > 
    {/* to update the shirt all time if we dont give the key the shirt wiil not update and no change will show, BUT theKEY is not a single state, it has to be stateString.. */}

      <mesh //  Represents a 3D object in the scene.
        castShadow // Makes the mesh cast shadows onto other objects.
        geometry={nodes.T_Shirt_male.geometry} //Uses the geometry (shape) data for a T-shirt model, likely imported from a 3D file.
        material={materials.lambert1} //Applies a material (appearance) to the mesh, here using a Lambert material for matte shading.
        material-roughness={1} // Sets the roughness property of the material to 1 (very rough, not shiny).
        dispose={null} //Prevents automatic disposal of the geometry/material when the component unmounts (useful for asset reuse).
      >
        {snap.isFullTexture && (
          <Decal 
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={1}
          map={fullTexture}
          />
        )}

         {snap.isLogoTexture && (
          <Decal 
          position={[0, 0.04, 0.15]} 
          // Where to "stick" the decal on the 3D mesh:
          // X: 0 (centered sideways)
          // Y: 0.04 (slightly above center)
          // Z: 0.15 (in front)

          rotation={[0, 0, 0]} //No rotation — decal is projected straight onto the surface.
          scale={0.15} // The size of the decal — 0.15x scale — small.
          map={logoTexture} // This is the texture image (logo) being projected (likely loaded using useTexture()).
          //map-anisotropy={16} // Improves texture sharpness, especially at angles — better quality texture filtering. BREAKING THE SHIRT
          depthTest={false} // Ignores the depth buffer when rendering — the decal is always drawn on top of the surface, avoiding z-fighting.
          depthWrite={true} // Writes to the depth buffer — ensures other objects can still respect depth sorting with this decal.
          />
        )}
      </mesh>
    </group>
  )
}

export default Shirt
// actual shirt model