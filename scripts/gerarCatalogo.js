import fs from "fs";
import path from "path";

const pastaCamisetas = path.join(process.cwd(), "public", "camisetas");
const saida = path.join(process.cwd(), "src", "data", "catalogo.ts");

/*
MAPA DE TIMES
adicione novos conforme precisar
*/
const mapaTimes = {
  "2022": "World Cup 2022",

  ac: "AC Milan",
  ajax: "Ajax",
  al: "Al Hilal",
  algeria: "Algeria",
  argentina: "Argentina",
  arsenal: "Arsenal",
  as: "AS Roma",
  aston: "Aston Villa",
  athletic: "Athletic Bilbao",
  athletico: "Athletico Paranaense",
  atlanta: "Atlanta United",
  atletico: "Atlético Madrid",
  australia: "Australia",

  bahia: "Bahia",
  barcelona: "Barcelona",
  bayern: "Bayern Munich",
  belgium: "Belgium",
  benfica: "Benfica",
  boca: "Boca Juniors",
  borussia: "Borussia Dortmund",
  botafogo: "Botafogo",
  brazil: "Brazil",
  brentford: "Brentford",
  brighton: "Brighton",

  cameroon: "Cameroon",
  canada: "Canada",
  cd: "CD Guadalajara",
  celtic: "Celtic",
  charlotte: "Charlotte FC",
  chelsea: "Chelsea",
  chivas: "Chivas Guadalajara",
  club: "Club América",
  colo: "Colo Colo",
  colombia: "Colombia",
  corinthians: "Corinthians",
  costa: "Costa Rica",
  croatia: "Croatia",
  cruz: "Cruz Azul",
  cruzeiro: "Cruzeiro",
  crystal: "Crystal Palace",
  chile: "Chile",

  denmark: "Denmark",
  ecuador: "Ecuador",
  egypt: "Egypt",
  eintracht: "Eintracht Frankfurt",
  england: "England",
  everton: "Everton",

  fc: "FC Barcelona",
  feyenoord: "Feyenoord",
  fiorentina: "Fiorentina",
  flamengo: "Flamengo",
  fluminense: "Fluminense",
  france: "France",
  fulham: "Fulham",

  germany: "Germany",
  ghana: "Ghana",
  gremio: "Grêmio",

  hungary: "Hungary",

  inter: "Inter Milan",
  iran: "Iran",
  ireland: "Ireland",
  italy: "Italy",

  jamaica: "Jamaica",
  japan: "Japan",
  juventus: "Juventus",

  la: "LA Galaxy",
  lazio: "Lazio",
  leicester: "Leicester City",
  liverpool: "Liverpool",

  madrid: "Real Madrid",
  man: "Manchester United",
  manchester: "Manchester City",

  mexico: "Mexico",
  monterrey: "Monterrey",
  morocco: "Morocco",

  napoli: "Napoli",
  netherlands: "Netherlands",
  new: "New York City FC",
  newcastle: "Newcastle United",
  nigeria: "Nigeria",
  northern: "Northern Ireland",
  norway: "Norway",
  nottingham: "Nottingham Forest",

  olympique: "Olympique Marseille",
  orlando: "Orlando City",

  palmeiras: "Palmeiras",
  paris: "Paris Saint-Germain",
  paysandu: "Paysandu",
  philadelphia: "Philadelphia Union",
  poland: "Poland",
  portland: "Portland Timbers",
  portugal: "Portugal",
  psv: "PSV Eindhoven",

  qatar: "Qatar",

  rangers: "Rangers",
  rb: "RB Leipzig",
  rc: "RC Lens",
  real: "Real Betis",
  river: "River Plate",
  russia: "Russia",

  santos: "Santos",
  sao: "São Paulo",
  saudi: "Saudi Arabia",
  scotland: "Scotland",
  senegal: "Senegal",
  serbia: "Serbia",
  sevilla: "Sevilla",
  sheffield: "Sheffield United",
  south: "South Korea",
  spain: "Spain",
  sport: "Sport Recife",
  sporting: "Sporting CP",
  stade: "Stade Rennes",
  sweden: "Sweden",
  switzerland: "Switzerland",

  tigres: "Tigres UANL",
  tottenham: "Tottenham",
  tunisia: "Tunisia",

  universidad: "Universidad de Chile",
  uruguay: "Uruguay",
  usa: "USA",

  valencia: "Valencia",
  vasco: "Vasco da Gama",
  venezia: "Venezia",

  wales: "Wales",
  west: "West Ham",
  wolves: "Wolverhampton",

  womens: "Women's Teams",

  /* NOVOS TIMES */
  hilal: "Al Hilal",
  ittihad: "Al Ittihad",
  miami: "Inter Miami",
  mineiro: "Atlético Mineiro",
  united: "Manchester United"
};

function gerarCatalogo() {

  const catalogo = {};

  const pastas = fs.readdirSync(pastaCamisetas);

  pastas.forEach((pasta) => {

    const slug = pasta.toLowerCase();
    const nomeTime = mapaTimes[slug] || slug;

    const pastaTime = path.join(pastaCamisetas, pasta);

    if (!fs.statSync(pastaTime).isDirectory()) return;

    const produtos = fs.readdirSync(pastaTime);

    catalogo[slug] = {
      nome: nomeTime,
      produtos: produtos.map((produto) => {

        const pastaProduto = path.join(pastaTime, produto);

        if (!fs.statSync(pastaProduto).isDirectory()) return null;

        const imagens = fs
          .readdirSync(pastaProduto)
          .filter((img) =>
            img.endsWith(".jpg") ||
            img.endsWith(".png") ||
            img.endsWith(".webp")
          )
          .map((img) => `/camisetas/${slug}/${produto}/${img}`);

        return {
          nome: produto,
          imagens
        };

      }).filter(Boolean)
    };

  });

  const conteudo = `export const catalogo = ${JSON.stringify(
    catalogo,
    null,
    2
  )} as const;`;

  fs.writeFileSync(saida, conteudo);

  console.log("✅ Catálogo gerado com slugs padronizados!");
}

gerarCatalogo();