"use client";

import React from "react";
import { Clock, MapPin, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoldenGlow } from "../effects/golden-glow";

/**
 * Sección de información del evento
 * Muestra detalles de la ceremonia y recepción
 * Incluye horarios actualizados y enlaces a mapas
 */
export const EventInfoSection: React.FC = () => {
  // Funciones para abrir mapas
  const openCeremonyMap = () => {
    window.open('https://maps.google.com/?q=Parroquia+Santa+Laura+Montoya+4CFP%2BHH+Villavicencio+Meta', '_blank');
  };

  const openReceptionMap = () => {
    window.open('https://maps.google.com/?q=HOTEL+LLANO+CAMPESTRE+Vía+Villavicencio+-+Acacías+km+10+Villavicencio+Meta', '_blank');
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Título de la sección */}
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-12 text-wedding-green">
          Información del Evento
        </h2>

        {/* Tarjetas de información */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">

          {/* Ceremonia Religiosa */}
          <GoldenGlow>
            <Card className="border-wedding-gold/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center bg-wedding-cream/30">
                <CardTitle className="font-serif text-xl sm:text-2xl text-wedding-green flex items-center justify-center">
                  <Heart className="mr-2 text-wedding-gold" size={24} />
                  Ceremonia Religiosa
                </CardTitle>
              </CardHeader>

              <CardContent className="text-center space-y-4 p-6">
                {/* Horario */}
                <div className="flex items-center justify-center text-wedding-green">
                  <Clock className="mr-2" size={18} />
                  <span className="text-base sm:text-lg font-medium">3:00 PM</span>
                </div>

                {/* Ubicación */}
                <div className="flex items-center justify-center text-wedding-green">
                  <MapPin className="mr-2" size={18} />
                  <div className="text-center">
                    <p className="text-base sm:text-lg font-medium">Parroquia Santa Laura Montoya</p>
                    <p className="text-sm text-wedding-green/70">4CFP+HH, Villavicencio, Meta</p>
                  </div>
                </div>

                {/* Descripción */}
                <div className="bg-wedding-cream/50 rounded-lg p-4 my-4">
                  <p className="text-sm text-wedding-green/80">
                    Te esperamos para ser testigo de nuestro compromiso ante Dios
                  </p>
                </div>

                {/* Botón del mapa */}
                <Button
                  variant="outline"
                  size="sm"
                  className="border-wedding-gold text-wedding-gold hover:bg-wedding-gold hover:text-white transition-all duration-300"
                  onClick={openCeremonyMap}
                >
                  <MapPin className="mr-2" size={16} />
                  Ver Ubicación
                </Button>
              </CardContent>
            </Card>
          </GoldenGlow>

          {/* Recepción */}
          <GoldenGlow>
            <Card className="border-wedding-gold/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center bg-wedding-cream/30">
                <CardTitle className="font-serif text-xl sm:text-2xl text-wedding-green flex items-center justify-center">
                  <Users className="mr-2 text-wedding-gold" size={24} />
                  Recepción
                </CardTitle>
              </CardHeader>

              <CardContent className="text-center space-y-4 p-6">
                {/* Horario */}
                <div className="flex items-center justify-center text-wedding-green">
                  <Clock className="mr-2" size={18} />
                  <span className="text-base sm:text-lg font-medium">6:00 PM</span>
                </div>

                {/* Ubicación */}
                <div className="flex items-center justify-center text-wedding-green">
                  <MapPin className="mr-2" size={18} />
                  <div className="text-center">
                    <p className="text-base sm:text-lg font-medium">HOTEL LLANO CAMPESTRE</p>
                    <p className="text-sm text-wedding-green/70">Vía Villavicencio - Acacías #km 10, Villavicencio, Meta</p>
                  </div>
                </div>

                {/* Descripción */}
                <div className="bg-wedding-cream/50 rounded-lg p-4 my-4">
                  <p className="text-sm text-wedding-green/80">
                    Continuemos la celebración con cena, baile y mucha alegría
                  </p>
                </div>

                {/* Botón del mapa */}
                <Button
                  variant="outline"
                  size="sm"
                  className="border-wedding-gold text-wedding-gold hover:bg-wedding-gold hover:text-white transition-all duration-300"
                  onClick={openReceptionMap}
                >
                  <MapPin className="mr-2" size={16} />
                  Ver Ubicación
                </Button>
              </CardContent>
            </Card>
          </GoldenGlow>
        </div>
      </div>
    </section>
  );
};
