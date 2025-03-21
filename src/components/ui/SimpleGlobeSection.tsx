import React from 'react';
import { Globe } from './globe';

export function SimpleGlobeSection() {
  return (
    <div style={{ 
      position: 'relative',
      height: '800px',
      width: '100%',
      overflow: 'hidden',
      marginTop: '3rem',
      marginBottom: '0'
    }}>
      {/* Fixed background gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at bottom center, #2979FF, transparent 70%)',
        opacity: 0.4
      }} />
      
      {/* Blue glow at the bottom */}
      <div style={{
        position: 'absolute',
        left: '-50%',
        bottom: '-5%',
        width: '200%',
        height: '200px',
        background: '#2979FF',
        opacity: 0.3,
        filter: 'blur(25px)',
        zIndex: 1
      }} />
      
      {/* The semicircle */}
      <div style={{
        position: 'absolute',
        left: '-50%',
        bottom: '-5%',
        width: '200%',
        height: '350px',
        borderTopLeftRadius: '50% 100%',
        borderTopRightRadius: '50% 100%',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        backgroundColor: '#0A0A0A',
        zIndex: 2
      }} />
      
      {/* Globe */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '45%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        zIndex: 0
      }}>
        <Globe />
      </div>
    </div>
  );
} 