import { catalogo } from "./catalogo";

export interface Jersey {
  id: string;
  label: string;
  year: string;
  images: string[];
}

export function getTeamJerseys(teamSlug: string): Jersey[] {

  const jerseys = catalogo[teamSlug.toLowerCase()];

  if (!jerseys) {
    console.log("Nenhuma camisa encontrada para:", teamSlug);
    return [];
  }

  return jerseys.map((j: any, index: number) => ({
    id: `${teamSlug}-${index}`,
    label: j.nome,
    year: "2024",
    images: j.imagens
  }));
}