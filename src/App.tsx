import { Plane, Text } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { ARButton, Controllers, Interactive, XR } from '@react-three/xr'
import React, { Suspense, useState } from 'react'

function Box({ color, size, scale, children, ...rest }: any) {
  return (
    <mesh scale={scale} {...rest}>
      <boxBufferGeometry args={size} />
      <meshPhongMaterial color={color} />
      {children}
    </mesh>
  )
}

function Button(props: any) {
  const [hover, setHover] = useState(false)
  const [color, setColor] = useState<any>('blue')

  const onSelect = () => {
    setColor((Math.random() * 0xffffff) | 0)
  }

  return (
    <Interactive onHover={() => setHover(true)} onBlur={() => setHover(false)} onSelect={onSelect}>
      <Box color={color} scale={hover ? [0.6, 0.6, 0.6] : [1, 0.5, 0.5]} size={[1, 0.1, 0.1]} {...props}>
        <Suspense fallback={null}>
          <Text position={[0, 0, 0.06]} fontSize={0.05} color="#000" anchorX="center" anchorY="middle">
           Ge Gao's first AR
          </Text>
        </Suspense>
      </Box>
    </Interactive>
  )
}

function PlaneComponent({ position, rotation, color }: any) {
  return (
    <Plane args={[1, 1]} position={position} rotation={rotation}>
      <meshPhongMaterial color={color} />
    </Plane>
  )
}

export function App() {
  return (
    <>
      <ARButton />
      <Canvas>
        <XR referenceSpace="local">
          <ambientLight />
          <pointLight position={[10, 3, 10]} />
          <Button position={[0, 0.1, -0.5]} />
          <PlaneComponent position={[0, 0.5, 0]} rotation={[0, 0, 0]} color="red" /> {/* Top */}
          <PlaneComponent position={[0, -0.5, 0]} rotation={[0, 0, 0]} color="blue" /> {/* Bottom */}

          <PlaneComponent position={[0, 0, -0.5]} rotation={[Math.PI / 2, 0, 0]} color="yellow" /> {/* Back */}
          <PlaneComponent position={[0.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} color="purple" /> {/* Right */}
          <PlaneComponent position={[-0.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} color="orange" /> {/* Left */}
          <Controllers />
        </XR>
      </Canvas>
    </>
  )
}


