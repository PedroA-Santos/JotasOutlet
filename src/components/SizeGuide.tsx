import { motion } from "framer-motion";
import {
  fanSizes,
  playerSizes,
  kidsSizes,
  fanCols,
  playerCols,
  kidsCols,
} from "@/data/teams";

const SizeTable = ({
  title,
  rows,
  columns,
}: {
  title: string;
  rows: readonly Record<string, string>[] | any[];
  columns: { key: string; label: string }[];
}) => (
  <motion.div
    className="rounded-lg border border-border bg-card overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4 }}
  >
    <div className="px-5 py-4 border-b border-border">
      <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-foreground">
        {title}
      </h3>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-secondary/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-3 py-2 text-left font-heading text-xs uppercase tracking-wider text-muted-foreground"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-t border-border hover:bg-secondary/30 transition-colors"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-3 py-2 text-foreground">
                  {row[col.key] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

const SizeGuide = () => {
  return (
    <section id="tamanhos" className="container mx-auto px-4 py-12">
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-1 h-8 rounded-full bg-primary" />
        <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase text-foreground">
          Guia de Tamanhos
        </h2>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        <SizeTable
          title="Versão Fan / Retro"
          rows={fanSizes}
          columns={fanCols}
        />

        <SizeTable
          title="Versão Player (Jogador)"
          rows={playerSizes}
          columns={playerCols}
        />

        <SizeTable
          title="Kit Infantil"
          rows={kidsSizes}
          columns={kidsCols}
        />
      </div>
    </section>
  );
};

export default SizeGuide;