"use client";

import React, { useState } from "react";
import { Heart, Users, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoldenGlow } from "../effects/golden-glow";
import emailjs from 'emailjs-com';

interface RSVPFormData {
  familyName: string;
  attendance: 'si' | 'no' | '';
}

/**
 * Sección del formulario RSVP simplificado
 * Solo pide nombre de familia y confirmación de asistencia
 * Envía los datos al email especificado
 */
export const RSVPSection: React.FC = () => {
  const [formData, setFormData] = useState<RSVPFormData>({
    familyName: '',
    attendance: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_xz61jyo',
        'template_58bigjg',
        {
          family_name: formData.familyName,
          attendance: formData.attendance === 'si' ? 'Sí asistirán' : 'No podrán asistir',
          date: new Date().toLocaleString('es-ES'),
        },
        '88cZTxseyrmclLYZZ'
      );
      alert('¡Gracias por confirmar! Tu respuesta ha sido enviada.');
      setFormData({ familyName: '', attendance: '' });
    } catch (error) {
      alert('Hubo un error al enviar tu confirmación. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-wedding-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Título de la sección */}
          <div className="text-center mb-8">
            <Heart className="mx-auto mb-4 text-wedding-gold animate-heartbeat" size={32} />
            <h2 className="font-script text-3xl sm:text-4xl text-wedding-green mb-4">
              Confirma tu Asistencia
            </h2>
            <p className="text-wedding-green/80 text-sm sm:text-base">
              Tu presencia es muy importante para nosotros
            </p>
          </div>

          {/* Formulario */}
          <GoldenGlow>
            <Card className="border-wedding-gold/20 shadow-xl">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nombre de la familia */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="familyName"
                      className="text-wedding-green font-medium flex items-center"
                    >
                      <Users className="mr-2" size={18} />
                      Nombre de la Familia
                    </Label>
                    <Input
                      id="familyName"
                      value={formData.familyName}
                      onChange={(e) => setFormData({...formData, familyName: e.target.value})}
                      placeholder="Ej: Familia García"
                      className="border-wedding-gold/30 focus:border-wedding-gold transition-all duration-300"
                      required
                    />
                  </div>

                  {/* Confirmación de asistencia */}
                  <div className="space-y-3">
                    <Label className="text-wedding-green font-medium">
                      ¿Podrán acompañarnos?
                    </Label>

                    <div className="space-y-3">
                      {/* Opción SÍ */}
                      <label className="flex items-center p-4 border border-wedding-gold/30 rounded-lg cursor-pointer hover:bg-wedding-gold/10 transition-all duration-300">
                        <input
                          type="radio"
                          name="attendance"
                          value="si"
                          checked={formData.attendance === 'si'}
                          onChange={(e) => setFormData({...formData, attendance: e.target.value as 'si'})}
                          className="mr-3 text-wedding-gold"
                          required
                        />
                        <div>
                          <div className="text-wedding-green font-medium">
                            ¡Sí, estaremos ahí!
                          </div>
                          <div className="text-wedding-green/70 text-sm">
                            Nos da mucha alegría que puedan acompañarnos
                          </div>
                        </div>
                      </label>

                      {/* Opción NO */}
                      <label className="flex items-center p-4 border border-wedding-gold/30 rounded-lg cursor-pointer hover:bg-wedding-gold/10 transition-all duration-300">
                        <input
                          type="radio"
                          name="attendance"
                          value="no"
                          checked={formData.attendance === 'no'}
                          onChange={(e) => setFormData({...formData, attendance: e.target.value as 'no'})}
                          className="mr-3"
                          required
                        />
                        <div>
                          <div className="text-wedding-green font-medium">
                            No podremos asistir
                          </div>
                          <div className="text-wedding-green/70 text-sm">
                            Entendemos que no siempre es posible
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Botón de envío */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-wedding-gold hover:bg-wedding-gold/90 text-white font-medium py-3 transition-all duration-300 hover:scale-105"
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        <Send className="mr-2" size={18} />
                        Confirmar Asistencia
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </GoldenGlow>
        </div>
      </div>
    </section>
  );
};
