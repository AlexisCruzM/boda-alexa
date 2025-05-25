"use client";

import React, { useEffect, useState } from "react";

interface EnvelopeProps {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

/**
 * Componente que crea una lluvia de sobres animados
 * Los sobres caen desde la parte superior de la pantalla
 */
export const EnvelopeRain: React.FC = () => {
  const [envelopes, setEnvelopes] = useState<EnvelopeProps[]>([]);

  useEffect(() => {
    // Generar array de sobres con propiedades aleatorias
    const envelopeArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // Posición horizontal aleatoria
      delay: Math.random() * 10, // Retraso inicial aleatorio
      duration: 8 + Math.random() * 6, // Duración de caída aleatoria
      size: 0.7 + Math.random() * 0.6, // Tamaño aleatorio
    }));

    setEnvelopes(envelopeArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {envelopes.map((envelope) => (
        <div
          key={envelope.id}
          className="absolute opacity-30"
          style={{
            left: `${envelope.left}%`,
            top: "-20px",
            animationDelay: `${envelope.delay}s`,
            animationDuration: `${envelope.duration}s`,
            animation: `envelopeFall ${envelope.duration}s linear infinite ${envelope.delay}s`,
            fontSize: `${envelope.size * 1.5}rem`,
          }}
        >
          {/* Emoji de sobre */}
          <span style={{
            color: '#D4AF37',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }}>
            ✉️
          </span>
        </div>
      ))}

      {/* Estilos CSS para la animación */}
      <style jsx>{`
        @keyframes envelopeFall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(100vh) rotate(180deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
