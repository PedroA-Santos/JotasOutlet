import { Instagram, Phone } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../assets/logoIndex.jpeg";
import heroBanner from "../assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Camisas de futebol"
          className="w-full h-full object-cover opacity-15"
          loading="eager"
        />
        <div className="absolute inset-0 grass-gradient opacity-90" />
        <div className="absolute inset-0 field-pattern opacity-20" />
      </div>

      {/* Decorative circles */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-accent/10 pointer-events-none" />

      <div className="relative container mx-auto px-4 pt-10 pb-14 flex flex-col items-center text-center gap-6">
        {/* Logo */}
        <motion.img
          src={logo}
          alt="Jotas Sport Outlet"
          className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover shadow-2xl ring-2 ring-primary/30"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />

        <motion.p
          className="text-muted-foreground text-base max-w-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Catálogo exclusivo de camisas de time de futebol. Pronta entrega para todo o Brasil.
        </motion.p>

        {/* Social buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg bg-card border border-border hover:border-primary transition-all hover:shadow-[var(--shadow-glow)] font-heading text-sm uppercase tracking-wider text-foreground"
          >
            <Instagram className="w-5 h-5 text-primary" />
            Instagram
          </a>
          <a
            href="https://www.instagram.com/jotassportoutlet/?utm_source=ig_web_button_share_sheet"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-heading text-sm uppercase tracking-wider"
          >
            <Phone className="w-5 h-5" />
            WhatsApp
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
