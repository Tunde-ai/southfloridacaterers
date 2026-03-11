"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const badges = [
  { icon: "💍", label: "Weddings" },
  { icon: "🏢", label: "Corporate" },
  { icon: "🎉", label: "All Events" },
  { icon: "🚗", label: "Delivery" },
  { icon: "👨‍🍳", label: "Le Cordon Bleu" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1920&h=1080&fit=crop&q=80"
        alt="Elegant catering spread"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {/* Dark warm overlay */}
      <div className="absolute inset-0 bg-charcoal/80" />
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal/90 via-charcoal/70 to-burgundy/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/8 via-transparent to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-32">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-block text-gold font-body text-sm sm:text-base tracking-[0.2em] uppercase mb-6"
        >
          Le Cordon Bleu Trained &middot; Est. 2013
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-linen leading-tight mb-6"
        >
          Elevating Every Occasion
          <br />
          <span className="text-gold">with Culinary Excellence</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl text-linen/70 max-w-2xl mx-auto mb-10 font-body"
        >
          Le Cordon Bleu trained chef bringing over a decade of Caribbean and
          American culinary artistry to your most important moments across South
          Florida.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a
            href="#menu"
            className="bg-gold text-charcoal font-semibold px-8 py-4 rounded text-lg hover:bg-gold-dark transition-colors duration-200"
          >
            View Our Menu
          </a>
          <a
            href="#contact"
            className="border-2 border-linen/30 text-linen font-semibold px-8 py-4 rounded text-lg hover:border-gold hover:text-gold transition-colors duration-200"
          >
            Request a Quote
          </a>
        </motion.div>

        {/* Badge cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 bg-linen/5 backdrop-blur-sm border border-linen/10 rounded-full px-4 py-2 sm:px-5 sm:py-2.5"
            >
              <span className="text-lg" role="img" aria-hidden="true">
                {badge.icon}
              </span>
              <span className="text-sm text-linen/70 font-medium">
                {badge.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-linen to-transparent" />
    </section>
  );
}
