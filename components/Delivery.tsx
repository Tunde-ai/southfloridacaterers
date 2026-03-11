"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { lookupDeliveryZone } from "@/lib/deliveryZones";

const zones = [
  {
    zone: "Local Zone",
    areas: "Miami Gardens, Miramar, North Miami, Hialeah",
    fee: "$40",
    miles: "Within 10 mi",
    color: "bg-gold/15 border-gold/30",
    highlight: true,
  },
  {
    zone: "Nearby Zone",
    areas: "Ft. Lauderdale, Hollywood, Downtown Miami, Doral",
    fee: "$60",
    miles: "10–20 mi",
    color: "bg-gold/10 border-gold/20",
    highlight: false,
  },
  {
    zone: "Extended Zone",
    areas: "Coral Springs, Coral Gables, Kendall, Weston",
    fee: "$85",
    miles: "20–35 mi",
    color: "bg-burgundy/5 border-burgundy/15",
    highlight: false,
  },
  {
    zone: "Far Zone",
    areas: "Boca Raton, Homestead, Key Largo",
    fee: "$120",
    miles: "35+ mi",
    color: "bg-linen/5 border-linen/10",
    highlight: false,
  },
];

const policies = [
  "Delivery fee based on distance from our Miami Gardens kitchen (33169)",
  "72-hour advance booking recommended",
  "No free delivery threshold — fee applies to ALL orders regardless of size",
  "Full-service setup and DJ/entertainment are separate add-ons",
  "Orders outside our standard zones? Contact us — we'll make it work",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function Delivery() {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<{
    zone: string;
    areas: string;
    fee: string;
    miles: string;
  } | null>(null);
  const [searched, setSearched] = useState(false);

  const handleLookup = () => {
    const found = lookupDeliveryZone(zip);
    setResult(found);
    setSearched(true);
  };

  return (
    <section id="delivery" className="py-20 sm:py-28 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-body text-sm tracking-[0.2em] uppercase">
            Delivery Zones
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-linen mt-3">
            We Come to <span className="text-gold">You</span>
          </h2>
          <p className="text-linen/50 mt-3 text-sm">
            Based from our Miami Gardens kitchen &middot; Distance-based flat rates
          </p>
        </motion.div>

        {/* Zone Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {zones.map((zone, i) => (
            <motion.div
              key={zone.zone}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={`rounded-lg p-6 border ${zone.color} text-center relative`}
            >
              {zone.highlight && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider bg-gold text-charcoal px-3 py-0.5 rounded-full">
                  Home Base
                </span>
              )}
              <p className="text-linen/40 text-xs font-medium mb-2">
                {zone.miles}
              </p>
              <h3 className="font-heading text-lg font-bold text-linen mb-1">
                {zone.zone}
              </h3>
              <p className="text-linen/60 text-sm mb-3">{zone.areas}</p>
              <p className="text-gold font-bold text-2xl">{zone.fee}</p>
            </motion.div>
          ))}
        </div>

        {/* Zip Code Lookup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-md mx-auto mb-12"
        >
          <label
            htmlFor="zip-lookup"
            className="block text-linen/80 text-sm font-medium mb-2 text-center"
          >
            Check your delivery fee
          </label>
          <div className="flex gap-2">
            <input
              id="zip-lookup"
              type="text"
              inputMode="numeric"
              maxLength={5}
              placeholder="Enter zip code"
              value={zip}
              onChange={(e) => {
                setZip(e.target.value.replace(/\D/g, ""));
                setSearched(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLookup()}
              className="flex-1 bg-linen/10 border border-linen/20 rounded px-4 py-3 text-linen placeholder:text-linen/40 focus:outline-none focus:border-gold transition-colors"
            />
            <button
              onClick={handleLookup}
              className="bg-gold text-charcoal font-semibold px-6 py-3 rounded hover:bg-gold-dark transition-colors"
            >
              Check
            </button>
          </div>
          {searched && result && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-linen/10 border border-linen/20 rounded p-4 text-center"
            >
              <p className="text-gold font-bold text-xl">{result.fee}</p>
              <p className="text-linen/70 text-sm">
                {result.zone} &middot; {result.miles}
              </p>
              <p className="text-linen/50 text-xs mt-1">{result.areas}</p>
            </motion.div>
          )}
          {searched && !result && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-linen/60 text-sm text-center"
            >
              Please enter a valid 5-digit zip code.
            </motion.div>
          )}
        </motion.div>

        {/* Policies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="font-heading text-xl font-bold text-linen text-center mb-4">
            Delivery Policy
          </h3>
          <ul className="space-y-3">
            {policies.map((policy) => (
              <li
                key={policy}
                className="flex items-start gap-3 text-linen/70 text-sm"
              >
                <span className="text-gold mt-0.5 flex-shrink-0">&bull;</span>
                {policy}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
