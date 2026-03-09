import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { League } from "@/data/teams";
import { getTeamBadge } from "@/data/badges";

interface LeagueSectionProps {
  league: League;
}

const TeamBadge = ({ name, emoji }: { name: string; emoji?: string }) => {
  const badge = getTeamBadge(name);
  const [imgError, setImgError] = useState(false);

  if (badge && !imgError) {
    return (
      <img
        src={badge}
        alt={`Escudo ${name}`}
        className="w-10 h-10 object-contain"
        loading="lazy"
        onError={() => setImgError(true)}
      />
    );
  }

  if (emoji) {
    return <span className="text-2xl">{emoji}</span>;
  }

  return (
    <span className="text-lg font-heading font-bold text-primary">
      {name.charAt(0)}
    </span>
  );
};

const LeagueSection = ({ league }: LeagueSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // FUNÇÃO DE NAVEGAÇÃO COM LÓGICA RETRÔ
  const handleTeamClick = (teamName: string) => {
    // 1. Gera o slug básico (ex: barcelona)
    const baseSlug = teamName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/\./g, "");

    // 2. Verifica se a liga atual é a seção de Retrôs
    const isRetro = league.name.toLowerCase().includes("retro") || 
                    league.name.toLowerCase().includes("retrô");

    // 3. Se for retrô, adiciona o sufixo na URL (ex: barcelona-retro)
    const finalSlug = isRetro ? `${baseSlug}-retro` : baseSlug;

    navigate(`/time/${finalSlug}`);
  };

  return (
    <motion.div
      className="rounded-lg border border-border bg-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 rounded-full bg-primary" />
          <div className="text-left">
            <h2 className="font-heading text-lg md:text-xl font-bold uppercase tracking-wide text-foreground">
              {league.name}
            </h2>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              {league.subtitle}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-primary transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="px-4 pb-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
              {league.teams.map((team, i) => (
                <motion.div
                  key={team.name}
                  onClick={() => handleTeamClick(team.name)} // <--- CHAMA A NOVA FUNÇÃO
                  role="button"
                  tabIndex={0}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg bg-secondary/60 border border-border hover:border-primary hover:shadow-[var(--shadow-glow)] transition-all cursor-pointer group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.02, duration: 0.25 }}
                >
                  <div className="w-14 h-14 rounded-full bg-background/50 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
                    <TeamBadge name={team.name} emoji={team.emoji} />
                  </div>
                  <span className="text-[11px] font-heading uppercase tracking-wide text-center text-foreground leading-tight">
                    {team.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LeagueSection;