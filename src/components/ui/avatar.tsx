import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import './styles.css';

 export function AvatarComp({ img }: { img: string }) {
  return (
  <div style={{ display: 'flex', gap: 20 }}>
 
    <Avatar.Root className="AvatarRoot">
      <Avatar.Image
        className="AvatarImage"
        src={img}
        alt="Pedro Duarte"
      />
      <Avatar.Fallback className="AvatarFallback" delayMs={600}>
        image
      </Avatar.Fallback>
    </Avatar.Root>
    
  </div>
);
 } 

export default AvatarComp;