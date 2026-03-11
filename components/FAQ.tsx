"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is the minimum order size?",
    answer:
      "Our minimum order is a half tray per item. This ensures the quality and freshness you expect from every dish we prepare.",
  },
  {
    question: "How much food do I need for my headcount?",
    answer:
      "As a general guide, 2 pans of brown stew chicken feeds approximately 25–30 guests. For events with 80+ guests, we recommend submitting an inquiry so we can build a custom menu plan tailored to your event.",
  },
  {
    question: "What's the difference between drop-off and full service?",
    answer:
      "Drop-off delivery means we deliver and set up the food, then leave you to serve. Full service includes tablecloths, full setup, on-site serving staff, and breakdown — priced per person. Full service is ideal for weddings, formal events, and any occasion where you want to be a guest at your own party.",
  },
  {
    question: "How are delivery fees calculated?",
    answer:
      "Delivery is distance-based from our Miami Gardens kitchen (33169). Local zone (within 10 miles) is $40, nearby zone (10–20 miles) is $60, extended zone (20–35 miles) is $85, and far zone (35+ miles) is $120. There is no free delivery threshold — the fee applies to all orders regardless of size. Use the zip code checker on our site to see your exact fee.",
  },
  {
    question: "Can I request doneness for roast beef?",
    answer:
      "Absolutely. When placing your order, specify your preferred doneness in the order notes — medium, medium-well, or well-done. We'll prepare it exactly to your preference.",
  },
  {
    question: "Do you offer corporate lunch accounts?",
    answer:
      "Yes! We offer weekly recurring delivery with custom menu rotations, invoicing, and volume pricing. It's a great option for offices and co-working spaces that want consistent, high-quality catering without the hassle of ordering each time.",
  },
  {
    question: "Do you provide DJ and music services?",
    answer:
      "Yes! We offer a Full Event + DJ package that pairs our catering with a professional DJ. It's perfect for weddings, birthday parties, corporate events, and any occasion where you want food and entertainment handled by one team. Request the Full Event + DJ option on your inquiry and we'll build a custom package.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend a minimum of 72 hours for standard orders. For large events (80+ guests), full-service catering, or events with DJ, we recommend at least 1–2 weeks advance notice to ensure availability and proper planning.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-warm-muted/20 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-heading text-lg font-semibold text-warm-black group-hover:text-burgundy transition-colors pr-4">
          {faq.question}
        </span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isOpen
              ? "bg-gold text-charcoal rotate-45"
              : "bg-stone text-warm-muted"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-warm-muted leading-relaxed pr-12">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-linen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-gold font-body text-sm tracking-[0.2em] uppercase">
            Common Questions
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-black mt-3">
            Frequently <span className="text-burgundy">Asked</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg p-6 sm:p-8 border border-stone"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
