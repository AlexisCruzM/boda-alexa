"use client";

import React from "react";
import { GoldenGlow } from "../effects/golden-glow";

interface CountdownSectionProps {
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

/**
 * Sección del contador regresivo hasta la boda
 * Diseño compacto optimizado para dispositivos móviles
 * Muestra días, horas, minutos y segundos en línea
 */
export const CountdownSection: React.FC<CountdownSectionProps> = ({ timeLeft }) => {
  const timeUnits = [
    { value: timeLeft.days, label: "Días", shortLabel: "D" },
    { value: timeLeft.hours, label: "Horas", shortLabel: "H" },
    { value: timeLeft.minutes, label: "Min", shortLabel: "M" },
    { value: timeLeft.seconds, label: "Seg", shortLabel: "S" },
  ];

  return (
    <section className="py-8 sm:py-12 bg-wedding-green text-white">
      <div className="container mx-auto px-4 text-center">
        {/* Título de la sección */}
        <h2 className="font-serif text-xl sm:text-2xl md:text-3xl mb-6">
          Faltan...
        </h2>

        {/* Contador compacto en línea */}
        <div className="flex justify-center items-center gap-2 sm:gap-4 max-w-md mx-auto">
          {timeUnits.map((unit, index) => (
            <React.Fragment key={unit.label}>
              <GoldenGlow>
                <div className="bg-white/10 rounded-lg p-3 sm:p-4 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 min-w-[60px] sm:min-w-[80px]">
                  {/* Valor numérico */}
                  <div className="text-lg sm:text-2xl md:text-3xl font-bold text-wedding-gold-light">
                    {unit.value.toString().padStart(2, '0')}
                  </div>

                  {/* Etiqueta - versión corta en móvil, completa en desktop */}
                  <div className="text-xs sm:text-sm">
                    <span className="block sm:hidden">{unit.shortLabel}</span>
                    <span className="hidden sm:block">{unit.label}</span>
                  </div>
                </div>
              </GoldenGlow>

              {/* Separador entre unidades (excepto en el último) */}
              {index < timeUnits.length - 1 && (
                <div className="text-wedding-gold-light text-lg sm:text-xl font-bold">
                  :
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Texto adicional */}
        <p className="text-white/80 text-sm sm:text-base mt-4">
          para nuestro día especial
        </p>
      </div>
    </section>
  );
};
