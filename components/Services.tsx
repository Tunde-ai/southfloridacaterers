"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Pickup",
    description:
      "Freshly prepared trays ready for you to collect from our Miami Gardens kitchen. No delivery fee — just great food, on your schedule.",
    price: "No delivery fee",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    title: "Drop-Off Delivery",
    description:
      "We deliver to your door, set up the spread, and let you take it from there. Perfect for casual events, office lunches, and house parties.",
    price: "From $40 delivery fee",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
  },
  {
    title: "Full Service",
    description:
      "The complete experience — tablecloths, setup, on-site serving staff, and breakdown. We handle everything so you can enjoy your event.",
    price: "Per-person pricing",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: "Full Event + DJ",
    description:
      "Food, music, and vibes — all handled. Add a professional DJ to any full-service package for the complete event experience. We bring the party.",
    price: "Custom package pricing",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-linen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-body text-sm tracking-[0.2em] uppercase">
            How We Serve You
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-black mt-3">
            Four Ways to Experience
            <br />
            <span className="text-burgundy">Your Event</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-lg p-7 border border-stone hover:border-gold/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-lg bg-gold/10 text-gold flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                {service.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-warm-black mb-3">
                {service.title}
              </h3>
              <p className="text-warm-muted leading-relaxed mb-4 text-sm">
                {service.description}
              </p>
              <p className="text-burgundy font-semibold text-sm">
                {service.price}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
