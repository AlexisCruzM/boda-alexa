"use client";

import { useState, useEffect } from "react";
import { Play, Pause, Music } from "lucide-react";

// Importación de componentes organizados por secciones
import { HeroSection } from "@/components/sections/hero-section";
import { CountdownSection } from "@/components/sections/countdown-section";
import { EventInfoSection } from "@/components/sections/event-info-section";
import { DressCodeSection } from "@/components/sections/dress-code-section";
import { RSVPSection } from "@/components/sections/rsvp-section";
import { FooterSection } from "@/components/sections/footer-section";

// Importación de componentes UI
import { WeddingCalendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

/**
 * PÁGINA PRINCIPAL DE LA BODA
 * ===========================
 *
 * Invitación digital para la boda de Alexandra & Fabian
 * Fecha: 6 de Septiembre, 2025
 *
 * Estructura de la página:
 * 1. Hero Section - Imagen principal con nombres y fecha
 * 2. Countdown - Contador regresivo hasta la boda
 * 3. Calendar - Calendario interactivo de septiembre
 * 4. Event Info - Información de ceremonia y recepción
 * 5. Dress Code - Código de vestimenta con animación
 * 6. RSVP - Formulario simplificado de confirmación
 * 7. Footer - Iniciales y mensaje final con animación
 *
 * Efectos especiales:
 * - Lluvia de sobres animados
 * - Animaciones de scroll reveal
 * - Efectos de hover y transiciones
 */
export default function WeddingPage() {
  // ============================================
  // ESTADO Y CONFIGURACIÓN
  // ============================================

  // Control de hidratación del servidor
  const [mounted, setMounted] = useState(false);

  // Estado del contador regresivo
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Fecha de la boda - 6 de Septiembre 2025, 3:00 PM
  const weddingDate = new Date("2025-09-06T15:00:00");

  const [isPlaying, setIsPlaying] = useState(false);

  // ============================================
  // EFECTOS Y FUNCIONES
  // ============================================

  // Función para intentar reproducir el audio
  const attemptPlayAudio = () => {
    const audio = document.getElementById('wedding-audio') as HTMLAudioElement | null;
    if (audio && !isPlaying) {
      audio.volume = 0.15;
      // Asegurarse de que el audio esté cargado
      if (audio.readyState >= 2) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              // Remover los listeners una vez que la música comienza a reproducirse
              document.removeEventListener('scroll', handleScroll);
              document.removeEventListener('touchstart', handleTouch);
              document.removeEventListener('click', handleClick);
            })
            .catch(() => {
              setIsPlaying(false);
            });
        }
      }
    }
  };

  // Handlers para eventos de interacción
  const handleScroll = (event: Event) => {
    console.log('Scroll event detected');
    attemptPlayAudio();
  };

  const handleTouch = (event: TouchEvent) => {
    console.log('Touch event detected');
    attemptPlayAudio();
  };

  const handleClick = (event: MouseEvent) => {
    console.log('Click event detected');
    attemptPlayAudio();
  };

  // Efecto para inicializar el componente y el contador
  useEffect(() => {
    setMounted(true);

    // Intentar reproducir el audio inicialmente
    attemptPlayAudio();

    // Agregar listeners para múltiples eventos
    document.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('touchstart', handleTouch, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });

    // Función para calcular el tiempo restante
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      if (distance > 0) {
        return {
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Establecer tiempo inicial
    setTimeLeft(calculateTimeLeft());

    // Actualizar contador cada segundo
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Limpiar timer y event listeners al desmontar componente
    return () => {
      clearInterval(timer);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('touchstart', handleTouch);
      document.removeEventListener('click', handleClick);
    };
  }, [isPlaying]);

  // ============================================
  // FUNCIONES DE MANEJO DE EVENTOS
  // ============================================

  /**
   * Función para compartir la invitación
   * Utiliza Web Share API si está disponible, sino copia al portapapeles
   */
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Boda de Alexandra & Fabian',
          text: 'Te invitamos a celebrar nuestro día especial - 6 de Septiembre, 2025',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback para navegadores sin Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  /**
   * Función para agregar evento al calendario de Google
   * Crea un enlace directo al calendario con toda la información
   */
  const addToCalendar = () => {
    const event = {
      title: 'Boda de Alexandra & Fabian',
      start: weddingDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      end: new Date(weddingDate.getTime() + 6 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      description: 'Ceremonia en Iglesia San José a las 3:00 PM, seguida de recepción en Finca Los Rosales a las 6:00 PM',
      location: 'Iglesia San José, Calle Principal 123'
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;

    window.open(googleCalendarUrl, '_blank');
  };

  // ============================================
  // RENDERIZADO
  // ============================================

  // Prevenir errores de hidratación
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-wedding-cream to-white relative">
      {/* Música de fondo suave */}
      <audio
        id="wedding-audio"
        src="/boda.mp3"
        loop
        style={{ display: 'none' }}
      />

      {/* Reproductor de audio elegante */}
      <div
        className="fixed bottom-6 right-6 z-50 bg-white border-2 border-wedding-gold rounded-xl shadow-lg flex items-center gap-3 px-4 py-2"
        style={{ minWidth: 180 }}
      >
        <Music className="text-wedding-gold" size={24} />
        <button
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
          onClick={() => {
            const audio = document.getElementById('wedding-audio') as HTMLAudioElement | null;
            if (audio) {
              if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
              } else {
                audio.play();
                setIsPlaying(true);
              }
            }
          }}
          className="rounded-full bg-wedding-gold/10 border border-wedding-gold p-2 hover:bg-wedding-gold/20 transition-all"
        >
          {isPlaying ? (
            <Pause className="text-wedding-gold" size={20} />
          ) : (
            <Play className="text-wedding-gold" size={20} />
          )}
        </button>
        <span className="text-wedding-green font-serif text-sm select-none">
          Música de boda
        </span>
      </div>
      {/* ========================================== */}
      {/* SECCIÓN HERO - Imagen principal y nombres */}
      {/* ========================================== */}
      <HeroSection
        onShare={handleShare}
        onAddToCalendar={addToCalendar}
      />

      {/* ========================================== */}
      {/* CONTADOR REGRESIVO - Tiempo hasta la boda */}
      {/* ========================================== */}
      <CountdownSection timeLeft={timeLeft} />

      {/* ========================================== */}
      {/* CALENDARIO INTERACTIVO - Septiembre 2025 */}
      {/* ========================================== */}
      <section className="py-12 sm:py-16 bg-wedding-cream/50">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-center mb-8 text-wedding-green">
            Marca la Fecha
          </h2>
          <WeddingCalendar onDateClick={addToCalendar} />
        </div>
      </section>

      {/* ========================================== */}
      {/* INFORMACIÓN DEL EVENTO - Ceremonia y recepción */}
      {/* ========================================== */}
      <EventInfoSection />

      {/* ========================================== */}
      {/* CÓDIGO DE VESTIMENTA - Con animación */}
      {/* ========================================== */}
      <DressCodeSection />

      {/* LLUVIA DE SOBRES - Sección de regalos */}
      <section className="py-12 sm:py-16 bg-wedding-cream/60">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="border-wedding-gold/30 shadow-xl transition-all duration-1000 rounded-xl bg-white">
              <CardContent className="p-6 text-center">
                <h2 className="font-script text-3xl sm:text-4xl text-wedding-gold mb-4">Lluvia de Sobres</h2>
                <p className="text-wedding-green/80 text-base sm:text-lg mb-6">
                  Si deseas hacernos un regalo especial, puedes contribuir a nuestra lluvia de sobres. ¡Gracias por tu generosidad y cariño!
                </p>
                <div className="flex justify-center">
                  <span className="inline-block bg-wedding-gold/10 border border-wedding-gold/30 rounded-full px-8 py-4 text-wedding-gold text-3xl font-bold shadow-lg">
                    💌
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* FORMULARIO RSVP - Confirmación simplificada */}
      {/* ========================================== */}
      <RSVPSection />

      {/* ========================================== */}
      {/* FOOTER - Iniciales y mensaje final */}
      {/* ========================================== */}
      <FooterSection />
    </div>
  );
}
