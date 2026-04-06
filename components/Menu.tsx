"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type TraySize = "half" | "full";

type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  halfPrice: number;
  fullPrice: number;
  serves: { half: string; full: string };
  image: string;
  note?: string;
};

type QuoteItem = {
  menuItem: MenuItem;
  size: TraySize;
  qty: number;
};

const aLaCarteItems: MenuItem[] = [
  {
    id: "smothered-chicken",
    category: "Protein",
    name: "Smothered Chicken",
    description:
      "Tender chicken slow-cooked in a rich onion and garlic gravy until it falls off the bone. Southern comfort at its finest.",
    halfPrice: 75,
    fullPrice: 140,
    serves: { half: "12–15 guests", full: "25–30 guests" },
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=400&fit=crop",
  },
  {
    id: "fried-chicken",
    category: "Protein",
    name: "Southern Fried Chicken",
    description:
      "Crispy, golden-fried chicken seasoned with our signature spice blend. A crowd favorite with a bold flavor twist.",
    halfPrice: 80,
    fullPrice: 150,
    serves: { half: "12–15 guests", full: "25–30 guests" },
    image:
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&h=400&fit=crop",
  },
  {
    id: "roast-beef",
    category: "Protein",
    name: "Slow-Roasted Beef",
    description:
      "Slow-roasted beef with a savory herb crust, sliced to your preferred doneness. A showstopper for any event.",
    halfPrice: 110,
    fullPrice: 200,
    serves: { half: "10–12 guests", full: "20–25 guests" },
    image:
      "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=600&h=400&fit=crop",
    note: "Specify doneness in order notes (medium / medium-well / well-done)",
  },
  {
    id: "baked-mac",
    category: "Side",
    name: "Baked Mac & Cheese",
    description:
      "Creamy, three-cheese baked macaroni with a golden crust on top. Made from scratch, just like grandma used to make.",
    halfPrice: 50,
    fullPrice: 90,
    serves: { half: "12–15 guests", full: "25–30 guests" },
    image:
      "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=600&h=400&fit=crop",
  },
  {
    id: "collard-greens",
    category: "Side",
    name: "Collard Greens",
    description:
      "Slow-simmered collard greens with smoked turkey, seasoned to perfection. A Southern staple on every plate.",
    halfPrice: 45,
    fullPrice: 80,
    serves: { half: "12–15 guests", full: "25–30 guests" },
    image:
      "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&h=400&fit=crop",
  },
  {
    id: "candied-yams",
    category: "Side",
    name: "Candied Yams",
    description:
      "Sweet potatoes baked with brown sugar, cinnamon, and butter until caramelized. A sweet and savory crowd-pleaser.",
    halfPrice: 45,
    fullPrice: 80,
    serves: { half: "12–15 guests", full: "25–30 guests" },
    image: "/candied-yams.jpg",
  },
  {
    id: "yellow-rice",
    category: "Side",
    name: "Seasoned Yellow Rice",
    description:
      "Fluffy yellow rice cooked with garlic, onion, and our house seasoning blend. The perfect base for any plate.",
    halfPrice: 45,
    fullPrice: 80,
    serves: { half: "12–15 guests", full: "25–30 guests" },
    image:
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=600&h=400&fit=crop",
  },
];

type EventPackage = {
  name: string;
  description: string;
  includes: string[];
  ideal: string;
  image: string;
};

const eventPackages: EventPackage[] = [
  {
    name: "The Passed Appetizer",
    description:
      "Elegant passed bites for cocktail hours and receptions. Set the tone before the main event.",
    includes: [
      "3 passed bite selections",
      "Cocktail-style service",
      "Staff for passing",
    ],
    ideal: "Cocktail hours, receptions, networking events",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop",
  },
  {
    name: "The Celebration Package",
    description:
      "Our most popular full-service package for memorable events that demand the complete experience.",
    includes: [
      "2 protein selections",
      "2 side dishes",
      "Full-service setup",
      "Tablecloths & presentation",
      "Dedicated serving staff",
    ],
    ideal: "Weddings, milestone birthdays, anniversary celebrations",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
  },
  {
    name: "Corporate Lunch Account",
    description:
      "Recurring delivery service built for businesses. Consistent quality, flexible scheduling, volume pricing.",
    includes: [
      "Weekly recurring delivery",
      "Custom menu rotation",
      "Invoicing & volume pricing",
      "Dedicated account manager",
    ],
    ideal: "Offices, co-working spaces, recurring team lunches",
    image:
      "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&h=400&fit=crop",
  },
  {
    name: "Memorial & Repast",
    description:
      "Compassionate, dignified catering for life's most difficult moments. We handle every detail with care.",
    includes: [
      "All headcounts accommodated",
      "Pickup, delivery, or full-service",
      "Flexible menu options",
      "Compassionate coordination",
    ],
    ideal: "Memorial services, repasts, celebration of life",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop",
  },
  {
    name: "Full Event + DJ Package",
    description:
      "Food and music, one team. We pair our full-service catering with a professional DJ for the complete event experience — no coordinating multiple vendors.",
    includes: [
      "Full catering service (menu of your choice)",
      "Professional DJ with sound system",
      "MC services & playlist coordination",
      "Setup, service, and breakdown",
      "Tablecloths & presentation",
    ],
    ideal: "Weddings, birthday parties, corporate events, holiday parties",
    image:
      "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=600&h=400&fit=crop",
  },
];

const tabs = ["A La Carte", "Event Packages"] as const;

function formatPrice(cents: number) {
  return `$${cents}`;
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>(
    "A La Carte"
  );
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);

  const addToQuote = useCallback(
    (menuItem: MenuItem, size: TraySize) => {
      setQuoteItems((prev) => {
        const existing = prev.find(
          (q) => q.menuItem.id === menuItem.id && q.size === size
        );
        if (existing) {
          return prev.map((q) =>
            q.menuItem.id === menuItem.id && q.size === size
              ? { ...q, qty: q.qty + 1 }
              : q
          );
        }
        return [...prev, { menuItem, size, qty: 1 }];
      });
    },
    []
  );

  const updateQty = useCallback(
    (menuItemId: string, size: TraySize, delta: number) => {
      setQuoteItems((prev) => {
        return prev
          .map((q) =>
            q.menuItem.id === menuItemId && q.size === size
              ? { ...q, qty: Math.max(0, q.qty + delta) }
              : q
          )
          .filter((q) => q.qty > 0);
      });
    },
    []
  );

  const removeItem = useCallback(
    (menuItemId: string, size: TraySize) => {
      setQuoteItems((prev) =>
        prev.filter(
          (q) => !(q.menuItem.id === menuItemId && q.size === size)
        )
      );
    },
    []
  );

  const quoteTotal = quoteItems.reduce((sum, q) => {
    const price =
      q.size === "half" ? q.menuItem.halfPrice : q.menuItem.fullPrice;
    return sum + price * q.qty;
  }, 0);

  const totalServings = quoteItems.reduce((sum, q) => {
    const servesStr = q.menuItem.serves[q.size];
    const match = servesStr.match(/(\d+)/);
    const low = match ? parseInt(match[1]) : 0;
    return sum + low * q.qty;
  }, 0);

  const getItemQty = (menuItemId: string, size: TraySize) => {
    const item = quoteItems.find(
      (q) => q.menuItem.id === menuItemId && q.size === size
    );
    return item?.qty || 0;
  };

  return (
    <section id="menu" className="py-20 sm:py-28 bg-stone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-gold font-body text-sm tracking-[0.2em] uppercase">
            Our Offerings
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-black mt-3">
            Crafted with <span className="text-burgundy">Passion</span>
          </h2>
          <p className="text-warm-muted mt-4 max-w-lg mx-auto">
            Select your trays below to build an instant quote estimate
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-lg p-1 border border-stone">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2.5 text-sm font-semibold rounded-md transition-colors duration-200 ${
                  activeTab === tab
                    ? "bg-charcoal text-gold"
                    : "text-warm-muted hover:text-warm-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "A La Carte" ? (
            <motion.div
              key="alacarte"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {aLaCarteItems.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onAdd={addToQuote}
                  getQty={getItemQty}
                  onUpdateQty={updateQty}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="packages"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 gap-6"
            >
              {eventPackages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="bg-white rounded-lg overflow-hidden border border-stone hover:border-gold/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-6 font-heading text-xl sm:text-2xl font-bold text-linen">
                      {pkg.name}
                    </h3>
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="text-warm-muted text-sm leading-relaxed mb-4">
                      {pkg.description}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {pkg.includes.map((inc) => (
                        <li
                          key={inc}
                          className="flex items-start gap-2 text-sm text-warm-black"
                        >
                          <span className="text-gold mt-0.5 flex-shrink-0">
                            &#10003;
                          </span>
                          {inc}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-warm-muted mb-4">
                      <span className="font-semibold">Ideal for:</span>{" "}
                      {pkg.ideal}
                    </p>
                    <a
                      href="#contact"
                      className="inline-block bg-gold text-charcoal text-sm font-semibold px-5 py-2.5 rounded hover:bg-gold-dark transition-colors duration-200"
                    >
                      Custom Quote
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Quote Summary */}
        <AnimatePresence>
          {quoteItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 z-40 bg-charcoal border-t-2 border-gold shadow-2xl"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-heading text-lg font-bold text-gold">
                        Your Quote Estimate
                      </h3>
                      <span className="text-linen/50 text-xs bg-linen/10 px-2 py-0.5 rounded">
                        {quoteItems.reduce((s, q) => s + q.qty, 0)} tray
                        {quoteItems.reduce((s, q) => s + q.qty, 0) !== 1
                          ? "s"
                          : ""}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {quoteItems.map((q) => (
                        <span
                          key={`${q.menuItem.id}-${q.size}`}
                          className="inline-flex items-center gap-1.5 text-xs text-linen/70 bg-linen/5 border border-linen/10 rounded-full px-3 py-1"
                        >
                          {q.qty}x {q.menuItem.name} ({q.size})
                          <button
                            onClick={() => removeItem(q.menuItem.id, q.size)}
                            className="text-linen/40 hover:text-burgundy-light transition-colors ml-0.5"
                            aria-label={`Remove ${q.menuItem.name}`}
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gold">
                        {formatPrice(quoteTotal)}
                      </p>
                      <p className="text-xs text-linen/50">
                        ~{totalServings}+ servings
                      </p>
                    </div>
                    <a
                      href="#contact"
                      className="bg-gold text-charcoal font-semibold px-6 py-3 rounded hover:bg-gold-dark transition-colors text-sm whitespace-nowrap"
                    >
                      Finalize Quote
                    </a>
                  </div>
                </div>
                <p className="text-[10px] text-linen/30 mt-2">
                  Prices are estimates. Final pricing confirmed upon inquiry.
                  Delivery fees not included.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function MenuCard({
  item,
  onAdd,
  getQty,
  onUpdateQty,
}: {
  item: MenuItem;
  onAdd: (item: MenuItem, size: TraySize) => void;
  getQty: (id: string, size: TraySize) => number;
  onUpdateQty: (id: string, size: TraySize, delta: number) => void;
}) {
  const [selectedSize, setSelectedSize] = useState<TraySize>("half");
  const halfQty = getQty(item.id, "half");
  const fullQty = getQty(item.id, "full");
  const isInQuote = halfQty > 0 || fullQty > 0;

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden border transition-all duration-300 ${
        isInQuote
          ? "border-gold/50 shadow-md ring-1 ring-gold/20"
          : "border-stone hover:border-gold/30 hover:shadow-md"
      }`}
    >
      {/* Image */}
      <div className="relative h-44">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute top-3 left-3 text-xs font-semibold tracking-wider uppercase text-linen bg-burgundy/90 px-3 py-1 rounded-full">
          {item.category}
        </span>
        {isInQuote && (
          <div className="absolute top-3 right-3 w-6 h-6 bg-gold rounded-full flex items-center justify-center">
            <svg
              className="w-3.5 h-3.5 text-charcoal"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-heading text-xl font-bold text-warm-black mb-1">
          {item.name}
        </h3>
        <p className="text-warm-muted text-sm leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Size selector */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSelectedSize("half")}
            className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-all duration-200 border ${
              selectedSize === "half"
                ? "bg-charcoal text-gold border-charcoal"
                : "bg-stone/50 text-warm-muted border-stone hover:border-warm-muted/40"
            }`}
          >
            <span className="block font-bold">
              {formatPrice(item.halfPrice)}
            </span>
            <span className="block text-[11px] opacity-70 mt-0.5">
              Half Tray &middot; {item.serves.half}
            </span>
          </button>
          <button
            onClick={() => setSelectedSize("full")}
            className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-all duration-200 border ${
              selectedSize === "full"
                ? "bg-charcoal text-gold border-charcoal"
                : "bg-stone/50 text-warm-muted border-stone hover:border-warm-muted/40"
            }`}
          >
            <span className="block font-bold">
              {formatPrice(item.fullPrice)}
            </span>
            <span className="block text-[11px] opacity-70 mt-0.5">
              Full Tray &middot; {item.serves.full}
            </span>
          </button>
        </div>

        {/* Add / Quantity controls */}
        {getQty(item.id, selectedSize) > 0 ? (
          <div className="flex items-center justify-between bg-gold/10 rounded p-2">
            <button
              onClick={() => onUpdateQty(item.id, selectedSize, -1)}
              className="w-8 h-8 rounded bg-white border border-stone flex items-center justify-center text-warm-black hover:border-gold transition-colors"
              aria-label="Decrease quantity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="font-bold text-warm-black">
              {getQty(item.id, selectedSize)}{" "}
              <span className="text-warm-muted font-normal text-sm">
                {selectedSize} tray{getQty(item.id, selectedSize) !== 1 ? "s" : ""}
              </span>
            </span>
            <button
              onClick={() => onUpdateQty(item.id, selectedSize, 1)}
              className="w-8 h-8 rounded bg-white border border-stone flex items-center justify-center text-warm-black hover:border-gold transition-colors"
              aria-label="Increase quantity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={() => onAdd(item, selectedSize)}
            className="w-full bg-gold text-charcoal font-semibold py-2.5 rounded hover:bg-gold-dark transition-colors duration-200 text-sm"
          >
            Add {selectedSize === "half" ? "Half" : "Full"} Tray to Quote
          </button>
        )}

        {/* Show other size quantity if exists */}
        {getQty(item.id, selectedSize === "half" ? "full" : "half") > 0 && (
          <p className="text-xs text-warm-muted text-center mt-2">
            +{getQty(item.id, selectedSize === "half" ? "full" : "half")}{" "}
            {selectedSize === "half" ? "full" : "half"} tray
            {getQty(item.id, selectedSize === "half" ? "full" : "half") !== 1
              ? "s"
              : ""}{" "}
            also in quote
          </p>
        )}

        {item.note && (
          <p className="mt-3 text-xs text-burgundy/80 bg-burgundy/5 p-2 rounded">
            {item.note}
          </p>
        )}
      </div>
    </div>
  );
}
