const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "Menu", href: "#menu" },
  { label: "Delivery", href: "#delivery" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-gold mb-3">
              South Florida Caterers
            </h3>
            <p className="text-linen/60 text-sm italic">
              Southern comfort with a flavor twist. South Florida raised.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-bold text-linen uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-linen/60 text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-bold text-linen uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="text-linen/60 text-sm">
                Miami Gardens, FL 33169
              </li>
              <li>
                <a
                  href="tel:+17866983455"
                  className="text-linen/60 text-sm hover:text-gold transition-colors"
                >
                  (786) 698-3455
                </a>
              </li>
              <li>
                <a
                  href="mailto:southfloridacaterers@gmail.com"
                  className="text-linen/60 text-sm hover:text-gold transition-colors"
                >
                  southfloridacaterers@gmail.com
                </a>
              </li>
              <li className="text-linen/40 text-xs">
                Serving Broward County, Miami-Dade &amp; beyond
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-heading text-sm font-bold text-linen uppercase tracking-wider mb-4">
              Hours
            </h4>
            <ul className="space-y-2 text-linen/60 text-sm">
              <li className="flex justify-between gap-4">
                <span>Mon – Fri</span>
                <span>9:00 AM – 7:00 PM</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Saturday</span>
                <span>10:00 AM – 6:00 PM</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Sunday</span>
                <span>By Appointment</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-linen/10 mt-12 pt-8 text-center">
          <p className="text-linen/40 text-sm">
            &copy; {new Date().getFullYear()} South Florida Caterers. Registered
            in Florida.
          </p>
        </div>
      </div>
    </footer>
  );
}
