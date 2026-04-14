import React from "react";

function Seat3D({ position, color, onClick }) {
  return (
    <mesh position={position} onClick={onClick}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default Seat3D;