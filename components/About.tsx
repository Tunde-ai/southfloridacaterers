"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const badges = [
  { label: "Le Cordon Bleu", sub: "Trained" },
  { label: "Est. 2013", sub: "10+ Years" },
  { label: "South Florida", sub: "Native" },
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-linen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Chef photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-lg overflow-hidden border border-warm-muted/20 relative">
              <Image
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&h=1000&fit=crop&q=80"
                alt="Professional chef preparing a dish in the kitchen"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold/10 rounded-lg -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-gold font-body text-sm tracking-[0.2em] uppercase">
              Our Story
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-black mt-3 mb-6">
              A Lifetime in the{" "}
              <span className="text-burgundy">Kitchen</span>
            </h2>

            <blockquote className="border-l-4 border-gold pl-6 mb-8">
              <p className="font-heading text-xl sm:text-2xl text-warm-black/80 italic leading-relaxed">
                &ldquo;I&apos;ve been in the kitchen since I was six years old.
                That&apos;s all it is — I just love cooking. Touching hearts
                everywhere with the food.&rdquo;
              </p>
            </blockquote>

            <p className="text-warm-muted leading-relaxed mb-6">
              Founded in 2013, South Florida Caterers brings Le Cordon Bleu
              training and a lifetime of culinary passion to every plate.
              Specializing in Caribbean and American cuisine, we serve weddings,
              corporate events, memorial services, and private gatherings across
              Broward County, Miami-Dade, and beyond.
            </p>

            <p className="text-warm-muted leading-relaxed mb-8">
              What started as a calling at age six has grown into a decade-long
              mission: to elevate every occasion through food that connects
              people and touches hearts. Every dish tells a story — yours.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.label}
                  className="bg-charcoal rounded-lg px-5 py-3 text-center"
                >
                  <p className="text-gold font-heading font-bold text-sm">
                    {badge.label}
                  </p>
                  <p className="text-linen/60 text-xs mt-0.5">{badge.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
