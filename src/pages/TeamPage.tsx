import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Phone, X, ZoomIn, Search, ShoppingBag, ChevronUp } from "lucide-react";
import { leagues } from "@/data/teams";
import { cloudinary } from "../utils/cloudinary";
import { getTeamBadge } from "@/data/badges";
import { catalogo } from "../data/catalogo";
import { useState, useEffect, useMemo } from "react";

const TeamPage = () => {
  const { teamSlug } = useParams<{ teamSlug: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJersey, setSelectedJersey] = useState<any>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeCategory, setActiveCategory] = useState("TODAS");

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Busca o time ignorando sufixos e tratando slugs
  const team = useMemo(() => {
    const cleanSlug = teamSlug?.replace("-retro", "");
    const allTeams = leagues.flatMap((l) =>
      l.teams.map((t) => ({ ...t, leagueName: l.name }))
    );

    return allTeams.find((t) => {
      const formattedSlug = t.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/\./g, "");
      
      return formattedSlug === cleanSlug || t.slug === cleanSlug;
    });
  }, [teamSlug]);

  const formatName = (name: string) => {
    return name
      .replace(/-/g, " ")
      .replace(/PLAYER VERSION/gi, "JOGADOR")
      .replace(/KIDS KIT/gi, "INFANTIL")
      .replace(/LONG SLEEVES/gi, "MANGA LONGA")
      .replace(/HOME/gi, "TITULAR")
      .replace(/AWAY/gi, "RESERVA")
      .trim().toUpperCase();
  };

  const badge = getTeamBadge(team?.name || "");
  const data = catalogo[team?.slug || ""];

  // Adicionado o filtro RETRÔ aqui
  const categories = ["TODAS", "TITULAR", "JOGADOR", "RETRÔ", "INFANTIL", "MANGA LONGA"];

  const jerseys = useMemo(() => {
    if (!data || !team) return [];

    return data.produtos
      .map((p, i) => ({
        id: `${team.slug}-${i}`,
        label: formatName(p.nome),
        images: p.images || p.imagens,
        year: p.nome.match(/\d{4}/)?.[0] || "0",
        rawName: p.nome.toUpperCase()
      }))
      .filter((j) => {
        const year = parseInt(j.year);
        
        // Se estiver em "TODAS", mostra tudo
        if (activeCategory === "TODAS") return true;
        
        // FILTROS INDEPENDENTES (Não usam else if)
        if (activeCategory === "RETRÔ") {
          return year > 0 && year <= 2021;
        }
        
        if (activeCategory === "MANGA LONGA") {
          // Busca especificamente pelos termos de manga longa no nome original
          return j.rawName.includes("LONG SLEEVE") || j.rawName.includes("MANGA LONGA") || j.rawName.includes("SLEEVES");
        }
        
        if (activeCategory === "JOGADOR") {
          return j.rawName.includes("PLAYER");
        }
        
        if (activeCategory === "INFANTIL") {
          return j.rawName.includes("KIDS");
        }
        
        if (activeCategory === "TITULAR") {
          return j.rawName.includes("HOME");
        }
        
        return true;
      })
      .sort((a, b) => parseInt(b.year) - parseInt(a.year));
  }, [data, team, activeCategory]);

  const filteredJerseys = jerseys.filter(j => 
    j.label.toLowerCase().includes(searchTerm.toLowerCase()) || j.year.includes(searchTerm)
  );

  if (!team) return <div className="p-20 text-center font-heading">Time não encontrado</div>;

  return (
    <div className="min-h-screen bg-background field-pattern pb-20">
      <motion.header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="p-2 hover:bg-secondary rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center flex-1">
             <h1 className="font-heading text-sm font-bold uppercase tracking-tight text-foreground">{team.name}</h1>
             <span className="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">Catálogo Oficial</span>
          </div>
          {badge && <img src={badge} alt="" className="w-8 h-8 object-contain" />}
        </div>
      </motion.header>

      <section className="container mx-auto px-4 pt-8 text-center space-y-6">
        <h2 className="font-heading text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
          CAMISAS <span className="text-primary">{team.name}</span>
        </h2>
        
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Buscar por ano ou modelo..."
              className="w-full bg-card border border-border/50 rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-primary outline-none text-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar justify-start md:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap border transition-all ${
                  activeCategory === cat 
                  ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "bg-card border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-6">
        {filteredJerseys.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {filteredJerseys.map((jersey, i) => (
              <JerseyCard key={jersey.id} jersey={jersey} index={i} onOpen={() => setSelectedJersey(jersey)} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center gap-4">
            <ShoppingBag className="w-12 h-12 text-muted-foreground/20" />
            <div className="space-y-1">
              <p className="font-heading uppercase text-muted-foreground text-sm">Nenhum modelo nesta categoria</p>
              <button onClick={() => {setSearchTerm(""); setActiveCategory("TODAS")}} className="text-primary text-xs font-bold uppercase hover:underline">Ver tudo</button>
            </div>
          </div>
        )}
      </main>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 bg-primary p-3 rounded-full shadow-2xl text-primary-foreground"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedJersey && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedJersey(null)} className="absolute inset-0 bg-black/95 backdrop-blur-sm" />
            <motion.div layoutId={selectedJersey.id} className="bg-card w-full max-w-xl rounded-t-[32px] md:rounded-3xl overflow-hidden relative z-10 border-t border-white/10">
              <div className="aspect-square bg-white flex items-center justify-center p-8 relative">
                <img src={cloudinary(selectedJersey.images[0])} className="w-full h-full object-contain" alt="" />
                <button onClick={() => setSelectedJersey(null)} className="absolute top-6 right-6 p-2 rounded-full bg-black/5 text-black hover:bg-black/10 transition-colors"><X /></button>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                   <span className="text-primary font-bold text-xs uppercase tracking-[0.2em]">{team.name}</span>
                   <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none mt-1">{selectedJersey.label}</h3>
                </div>
                <a
                  href={`https://wa.me/554498448228?text=${encodeURIComponent(`Olá Jotas! Gostaria de consultar a camisa ${selectedJersey.label} do ${team.name} (${selectedJersey.year === "0" ? "S/A" : selectedJersey.year})`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-primary text-primary-foreground font-heading text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:brightness-110 transition-all"
                >
                  <Phone className="w-5 h-5" /> Consultar no WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

function JerseyCard({ jersey, index, onOpen }: any) {
  return (
    <motion.div
      layoutId={jersey.id}
      onClick={onOpen}
      className="group cursor-pointer bg-card rounded-2xl overflow-hidden border border-border/40 hover:border-primary/40 transition-all active:scale-95 shadow-sm"
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.02 }}
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-white">
        <img src={cloudinary(jersey.images[0])} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-2 left-2 bg-black/90 text-white text-[9px] font-black px-2 py-1 rounded-lg backdrop-blur">
          {jersey.year !== "0" ? jersey.year : "MODELO"}
        </div>
      </div>
      <div className="p-4 space-y-1">
        <h3 className="font-heading text-[10px] md:text-[11px] font-black uppercase truncate text-muted-foreground group-hover:text-primary transition-colors tracking-tight">
          {jersey.label}
        </h3>
        <p className="text-[10px] font-bold text-primary uppercase mt-1">Ver Detalhes</p>
      </div>
    </motion.div>
  );
}

export default TeamPage;