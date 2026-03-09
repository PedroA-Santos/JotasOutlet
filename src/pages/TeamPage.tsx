import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Phone } from "lucide-react";
import { leagues } from "@/data/teams";
import { cloudinary } from "../utils/cloudinary";
import { getTeamBadge } from "@/data/badges";
import { catalogo } from "../data/catalogo";
import { useState, useEffect } from "react";

const TeamPage = () => {
  const { teamSlug } = useParams<{ teamSlug: string }>();
  const navigate = useNavigate();



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allTeams = leagues.flatMap((l) =>
    l.teams.map((t) => ({ ...t, league: l.name }))
  );

  const team = allTeams.find(
    (t) =>
      t.name.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "") === teamSlug
  );

  if (!team) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground gap-4">
        <p className="text-xl font-heading">Time não encontrado</p>
        <button
          onClick={() => navigate("/")}
          className="text-primary underline"
        >
          Voltar ao catálogo
        </button>
      </div>
    );
  }

  const message = `Olá tenho interesse na camisa ${team?.name || ""}`;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=554498448228&text=${encodeURIComponent(message)}`;

  const badge = getTeamBadge(team.name);
  const data = catalogo[team.slug];

  const jerseys =
    data?.produtos.map((p, i) => ({
      id: `${team.slug}-${i}`,
      label: p.nome,
      images: p.imagens,
      price: p.preco || "",
      year: p.nome.match(/\d{4}/)?.[0] || "",
    })) || [];

  return (
    <div className="min-h-screen bg-background field-pattern">
      <motion.header
        className="sticky top-0 z-40 bg-card/90 backdrop-blur border-b border-border"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-heading text-sm uppercase tracking-wider hidden sm:inline">
              Voltar
            </span>
          </button>

          <div className="flex items-center gap-3 flex-1">
            {badge && (
              <img
                src={badge}
                alt={team.name}
                className="w-8 h-8 object-contain"
              />
            )}

            <div>
              <h1 className="font-heading text-lg font-bold uppercase tracking-wide text-foreground">
                {team.name}
              </h1>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                {team.league}
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      <section className="container mx-auto px-4 pt-8 pb-4">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {badge && (
            <motion.img
              src={badge}
              alt={`Escudo ${team.name}`}
              className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
            />
          )}

          <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase text-foreground text-center">
            Camisas {team.name}
          </h2>

          <p className="text-muted-foreground text-sm text-center max-w-md">
            Escolha o modelo desejado e faça seu pedido pelo WhatsApp{" "}
            <a
              href="https://wa.me/554498448228?text=Olá tenho interesse na camisa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Clique aqui
            </a>
          </p>
        </motion.div>
      </section>

      <main className="container mx-auto px-4 py-8">
        {jerseys.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center text-center py-20 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-xl font-heading text-foreground uppercase tracking-wide">
              Em breve teremos camisas deste time
            </p>

            <p className="text-muted-foreground text-sm max-w-md">
              Nosso catálogo está sendo atualizado. Volte em breve para conferir
              os novos modelos disponíveis.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jerseys.map((jersey, i) => (
              <JerseyCard
                key={jersey.id}
                jersey={jersey}
                teamName={team.name}
                index={i}
              />
            ))}
          </div>
        )}
      </main>

      <motion.div
        className="container mx-auto px-4 pb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full max-w-md mx-auto py-4 rounded-xl bg-primary text-primary-foreground font-heading text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
        >
          Clique aqui
        </a>
      </motion.div>
    </div>
  );
};

function JerseyCard({
  jersey,
  teamName,
  index,
}: {
  jersey: {
    id: string;
    label: string;
    images: string[];
    price: string;
    year: string;
  };
  teamName: string;
  index: number;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.a
      href={`https://wa.me/?text=Olá! Tenho interesse na ${jersey.label} do ${teamName} - ${jersey.year}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl bg-card border border-border hover:border-primary overflow-hidden transition-all hover:shadow-[var(--shadow-glow)]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <div className="aspect-[4/3] bg-secondary/40 flex items-center justify-center relative overflow-hidden">
        {!imgError && jersey.images?.[0] ? (
          <img
            src={cloudinary(jersey.images[0])}
            alt={jersey.label}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex items-center justify-center text-muted-foreground text-sm">
            Imagem não disponível
          </div>
        )}

        {jersey.year && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-primary/90 text-primary-foreground text-xs font-heading uppercase">
            {jersey.year}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-foreground">
          {jersey.label}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-primary font-heading text-lg font-bold">
            {jersey.price}
          </span>

          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Consultar
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default TeamPage;