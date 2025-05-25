"use client";

import React from "react";
import { Heart } from "lucide-react";
import { Button } from "./button";

interface CalendarProps {
  onDateClick?: () => void;
}

/**
 * Componente de calendario interactivo para mostrar la fecha de la boda
 * Muestra septiembre 2025 con el día 6 marcado especialmente
 */
export const WeddingCalendar: React.FC<CalendarProps> = ({ onDateClick }) => {
  // Días de la semana
  const daysOfWeek = ["DO", "LU", "MA", "MI", "JU", "VI", "SA"];

  // Generar días del calendario para septiembre 2025
  const generateCalendarDays = () => {
    const firstDay = new Date(2025, 8, 1).getDay(); // 8 = septiembre (0-indexado)
    const daysInMonth = new Date(2025, 8 + 1, 0).getDate(); // 30 días en septiembre
    const days = [];

    // Espacios en blanco para los días antes del 1
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg border border-wedding-gold/20 overflow-hidden">
      {/* Header del calendario */}
      <div className="bg-gradient-to-r from-wedding-green to-wedding-green/90 text-white p-4 text-center">
        <h3 className="font-script text-2xl text-wedding-gold-light mb-1">
          Septiembre
        </h3>
        <p className="text-sm opacity-90">2025</p>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 bg-wedding-cream/50">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="p-2 text-center text-xs font-medium text-wedding-green border-r border-wedding-gold/10 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Días del calendario */}
      <div className="grid grid-cols-7">
        {calendarDays.map((day, index) => {
          const isWeddingDay = day === 6;

          return (
            <div
              key={index}
              className={`
                relative h-10 flex items-center justify-center text-sm border-r border-b border-wedding-gold/10
                ${day ? 'hover:bg-wedding-cream/50 cursor-pointer' : ''}
                ${isWeddingDay ? 'bg-wedding-gold/10' : ''}
                last:border-r-0
              `}
              onClick={isWeddingDay ? onDateClick : undefined}
            >
              {day && (
                <>
                  <span
                    className={`
                      ${isWeddingDay
                        ? 'text-wedding-green font-bold'
                        : 'text-gray-700'
                      }
                    `}
                  >
                    {day}
                  </span>

                  {/* Corazón para el día de la boda */}
                  {isWeddingDay && (
                    <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Heart
                        className="text-wedding-gold animate-heartbeat opacity-40 z-0"
                        size={44}
                        fill="currentColor"
                      />
                    </span>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Botón para agregar al calendario */}
      <div className="p-4 bg-wedding-cream/30">
        <Button
          onClick={onDateClick}
          variant="outline"
          size="sm"
          className="w-full border-wedding-gold text-wedding-green hover:bg-wedding-gold hover:text-white transition-all duration-300"
        >
          <Heart className="mr-2" size={16} />
          Agregar al Calendario
        </Button>
      </div>
    </div>
  );
};
