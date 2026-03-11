"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  inquirySchema,
  type InquiryFormData,
  eventTypes,
  serviceTypes,
  headcountOptions,
  budgetOptions,
} from "@/lib/schema";

const FORMSPREE_URL = "https://formspree.io/f/mnjgdgvo";

export default function InquiryForm() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
  });

  const onSubmit = async (data: InquiryFormData) => {
    setSubmitStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  const inputBase =
    "w-full bg-white border border-stone rounded px-4 py-3 text-warm-black placeholder:text-warm-muted/50 focus:outline-none focus:border-gold transition-colors text-sm";
  const selectBase =
    "w-full bg-white border border-stone rounded px-4 py-3 text-warm-black focus:outline-none focus:border-gold transition-colors text-sm appearance-none";
  const labelBase = "block text-sm font-medium text-warm-black mb-1.5";
  const errorBase = "text-xs text-burgundy mt-1";

  return (
    <section id="contact" className="py-20 sm:py-28 bg-stone">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-gold font-body text-sm tracking-[0.2em] uppercase">
            Get Started
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-black mt-3">
            Request a <span className="text-burgundy">Quote</span>
          </h2>
          <p className="text-warm-muted mt-4 max-w-lg mx-auto">
            Tell us about your event and we&apos;ll craft the perfect menu.
            We respond to all inquiries within 24 hours.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitStatus === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-lg p-8 sm:p-12 border border-gold/30 text-center"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-warm-black mb-2">
                Thank You!
              </h3>
              <p className="text-warm-muted">
                We&apos;ll be in touch within 24 hours.
              </p>
              <button
                onClick={() => setSubmitStatus("idle")}
                className="mt-6 text-gold font-semibold text-sm hover:text-gold-dark transition-colors"
              >
                Submit another inquiry
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-lg p-6 sm:p-8 border border-stone shadow-sm"
            >
              {/* Name row */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className={labelBase}>
                    First Name <span className="text-burgundy">*</span>
                  </label>
                  <input
                    id="firstName"
                    {...register("firstName")}
                    placeholder="First name"
                    className={inputBase}
                  />
                  {errors.firstName && (
                    <p className={errorBase}>{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className={labelBase}>
                    Last Name <span className="text-burgundy">*</span>
                  </label>
                  <input
                    id="lastName"
                    {...register("lastName")}
                    placeholder="Last name"
                    className={inputBase}
                  />
                  {errors.lastName && (
                    <p className={errorBase}>{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Contact row */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="email" className={labelBase}>
                    Email Address <span className="text-burgundy">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="you@email.com"
                    className={inputBase}
                  />
                  {errors.email && (
                    <p className={errorBase}>{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className={labelBase}>
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="(305) 555-0123"
                    className={inputBase}
                  />
                </div>
              </div>

              {/* Event type + Service type */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="eventType" className={labelBase}>
                    Event Type <span className="text-burgundy">*</span>
                  </label>
                  <select
                    id="eventType"
                    {...register("eventType")}
                    className={selectBase}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select event type
                    </option>
                    {eventTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.eventType && (
                    <p className={errorBase}>{errors.eventType.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="serviceType" className={labelBase}>
                    Service Type <span className="text-burgundy">*</span>
                  </label>
                  <select
                    id="serviceType"
                    {...register("serviceType")}
                    className={selectBase}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select service type
                    </option>
                    {serviceTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.serviceType && (
                    <p className={errorBase}>{errors.serviceType.message}</p>
                  )}
                </div>
              </div>

              {/* Date + Headcount */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="eventDate" className={labelBase}>
                    Event Date <span className="text-burgundy">*</span>
                  </label>
                  <input
                    id="eventDate"
                    type="date"
                    {...register("eventDate")}
                    className={inputBase}
                  />
                  {errors.eventDate && (
                    <p className={errorBase}>{errors.eventDate.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="headcount" className={labelBase}>
                    Estimated Headcount <span className="text-burgundy">*</span>
                  </label>
                  <select
                    id="headcount"
                    {...register("headcount")}
                    className={selectBase}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select headcount
                    </option>
                    {headcountOptions.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                  {errors.headcount && (
                    <p className={errorBase}>{errors.headcount.message}</p>
                  )}
                </div>
              </div>

              {/* Zip + Budget */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="deliveryZip" className={labelBase}>
                    Delivery Zip Code
                  </label>
                  <input
                    id="deliveryZip"
                    {...register("deliveryZip")}
                    placeholder="33023"
                    maxLength={5}
                    className={inputBase}
                  />
                </div>
                <div>
                  <label htmlFor="budget" className={labelBase}>
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    {...register("budget")}
                    className={selectBase}
                    defaultValue=""
                  >
                    <option value="">Prefer not to say</option>
                    {budgetOptions.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label htmlFor="notes" className={labelBase}>
                  Dish Preferences / Special Notes
                </label>
                <textarea
                  id="notes"
                  {...register("notes")}
                  rows={4}
                  placeholder="Tell us about your event, dietary needs, preferred dishes, or any special requests..."
                  className={`${inputBase} resize-none`}
                />
              </div>

              {/* Error state */}
              {submitStatus === "error" && (
                <div className="mb-4 bg-burgundy/10 border border-burgundy/20 rounded p-4 text-sm text-burgundy">
                  Something went wrong. Please try again or email us directly at{" "}
                  <a
                    href="mailto:southfloridacaterers@gmail.com"
                    className="underline font-semibold"
                  >
                    southfloridacaterers@gmail.com
                  </a>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitStatus === "submitting"}
                className="w-full bg-gold text-charcoal font-semibold py-4 rounded text-lg hover:bg-gold-dark transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitStatus === "submitting"
                  ? "Sending..."
                  : "Send Inquiry"}
              </button>

              <p className="text-center text-xs text-warm-muted mt-4">
                We respond to all inquiries within 24 hours.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
