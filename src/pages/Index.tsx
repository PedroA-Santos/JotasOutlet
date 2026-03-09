import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import LeagueSection from "@/components/LeagueSection";
import SizeGuide from "../components/SizeGuide";
import { leagues } from "../data/teams";
import { Phone, Instagram } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen field-pattern">
      <HeroSection />

      {/* Catalog */}
      <main id="catalogo" className="container mx-auto px-4 py-10">
        <motion.div
          className="flex items-center gap-3 mb-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-1 h-8 rounded-full bg-primary" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase text-foreground">
            Catálogo
          </h2>
        </motion.div>

        <p className="text-muted-foreground text-sm mb-6 ml-5">
          Clique na liga e depois no time desejado para fazer seu pedido!
        </p>

        <div className="flex flex-col gap-3">
          {leagues.map((league) => (
            <LeagueSection
              key={league.id}
              league={league}
            />
          ))}
        </div>
      </main>

      <SizeGuide />

      {/* Footer */}
      <motion.footer
        className="border-t border-border py-8 mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="font-heading text-lg text-foreground uppercase tracking-wide mb-2">
            JOTAS <span className="text-primary">SPORT OUTLET</span>
          </p>

          <p className="text-muted-foreground text-sm mb-4">
            Catálogo exclusivo — Camisas de time de futebol
          </p>

          {/* Social */}
          <div className="flex justify-center gap-6">
            <a
              href="https://wa.me/554498448228"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
            >
              <Phone className="w-4 h-4" />
              WhatsApp
            </a>

            <a
              href="https://www.instagram.com/jotassportoutlet/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
          </div>
        </div>
      </motion.footer>

      {/* Floating WhatsApp */}
      <motion.a
        href="https://wa.me/554498448228?text=Ol%C3%A1%20tenho%20interesse%20em%20camisa"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg"
        aria-label="WhatsApp"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.8 }}
      >
        <Phone className="w-6 h-6 text-primary-foreground" />
      </motion.a>
    </div>
  );
};

export default Index;