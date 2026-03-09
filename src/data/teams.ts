export interface Team {
  name: string;
  slug: string;
  emoji?: string;
}

export interface League {
  id: string;
  name: string;
  subtitle: string;
  teams: Team[];
}

export const leagues: League[] = [
{
  id: "selecoes",
  name: "SELEÇÕES MUNDIAIS",
  subtitle: "MUNDO FIFA",
  teams: [
    { name: "Brasil", slug: "brazil", emoji: "🇧🇷" },
    { name: "Argentina", slug: "argentina", emoji: "🇦🇷" },
    { name: "Uruguai", slug: "uruguay", emoji: "🇺🇾" },
    { name: "Colômbia", slug: "colombia", emoji: "🇨🇴" },
    { name: "Chile", slug: "chile", emoji: "🇨🇱" },
    { name: "Peru", slug: "peru", emoji: "🇵🇪" },
    { name: "Equador", slug: "ecuador", emoji: "🇪🇨" },
    { name: "Venezuela", slug: "venezuela", emoji: "🇻🇪" },
    { name: "Paraguai", slug: "paraguay", emoji: "🇵🇾" },
    { name: "Bolívia", slug: "bolivia", emoji: "🇧🇴" },
    { name: "Inglaterra", slug: "england", emoji: "🏴" },
    { name: "Itália", slug: "italy", emoji: "🇮🇹" },
    { name: "Espanha", slug: "spain", emoji: "🇪🇸" },
    { name: "Portugal", slug: "portugal", emoji: "🇵🇹" },
    { name: "França", slug: "france", emoji: "🇫🇷" },
    { name: "Holanda", slug: "netherlands", emoji: "🇳🇱" },
    { name: "Alemanha", slug: "germany", emoji: "🇩🇪" },
    { name: "Bélgica", slug: "belgium", emoji: "🇧🇪" },
    { name: "Croácia", slug: "croatia", emoji: "🇭🇷" },
    { name: "Polônia", slug: "poland", emoji: "🇵🇱" },
    { name: "Japão", slug: "japan", emoji: "🇯🇵" },
    { name: "Coreia", slug: "korea", emoji: "🇰🇷" },
    { name: "México", slug: "mexico", emoji: "🇲🇽" },
    { name: "USA", slug: "usa", emoji: "🇺🇸" },
    { name: "Nigéria", slug: "nigeria", emoji: "🇳🇬" },
    { name: "Marrocos", slug: "morocco", emoji: "🇲🇦" },
    { name: "Senegal", slug: "senegal", emoji: "🇸🇳" },
    { name: "Egito", slug: "egypt", emoji: "🇪🇬" },
  ],
},

{
  id: "brasileirao",
  name: "BRASILEIRÃO",
  subtitle: "CAMPEONATO BRASILEIRO",
  teams: [
    { name: "Flamengo", slug: "flamengo" },
    { name: "São Paulo", slug: "sao" },
    { name: "Fortaleza", slug: "fortaleza" },
    { name: "Fluminense", slug: "fluminense" },
    { name: "Atlético Mineiro", slug: "mineiro" },
    { name: "Vitória", slug: "vitoria" },
    { name: "Vasco", slug: "vasco" },
    { name: "Botafogo", slug: "botafogo" },
    { name: "Santos", slug: "santos" },
    { name: "Corinthians", slug: "corinthians" },
    { name: "Palmeiras", slug: "palmeiras" },
    { name: "Bahia", slug: "bahia" },
    { name: "Cruzeiro", slug: "cruzeiro" },
    { name: "Grêmio", slug: "gremio" },
    { name: "Internacional", slug: "inter" },
    { name: "Sport", slug: "sport" },
    { name: "Ceará", slug: "ceara" },
    { name: "Bragantino", slug: "bragantino" },
    { name: "Athletico", slug: "athletico" },
    { name: "Remo", slug: "remo" },
    { name: "Paysandu", slug: "paysandu" },
  ],
},

{
  id: "premier-league",
  name: "PREMIER LEAGUE",
  subtitle: "CAMPEONATO INGLÊS",
  teams: [
    { name: "Arsenal", slug: "arsenal" },
    { name: "Fulham", slug: "fulham" },
    { name: "Aston Villa", slug: "aston" },
    { name: "West Ham", slug: "west" },
    { name: "Liverpool", slug: "liverpool" },
    { name: "Manchester United", slug: "united" },
    { name: "Everton", slug: "everton" },
    { name: "Manchester City", slug: "manchester" },
    { name: "Chelsea", slug: "chelsea" },
    { name: "Brighton", slug: "brighton" },
    { name: "Leicester", slug: "leicester" },
    { name: "Sheffield", slug: "sheffield" },
    { name: "Nottingham Forest", slug: "nottingham" },
    { name: "Wolves", slug: "wolves" },
    { name: "Newcastle", slug: "newcastle" },
    { name: "Tottenham", slug: "tottenham" },
    { name: "Crystal Palace", slug: "crystal" },
    { name: "Leeds", slug: "leeds" },
  ],
},

{
  id: "la-liga",
  name: "LA LIGA",
  subtitle: "CAMPEONATO ESPANHOL",
  teams: [
    { name: "Barcelona", slug: "barcelona" },
    { name: "Real Madrid", slug: "madrid" },
    { name: "Atlético Madrid", slug: "atletico" },
    { name: "Sevilla", slug: "sevilla" },
    { name: "Valencia", slug: "valencia" },
    { name: "Villarreal", slug: "villarreal" },
    { name: "Real Betis", slug: "betis" },
    { name: "Real Sociedad", slug: "sociedad" },
    { name: "Athletic Bilbao", slug: "athletic" },
    { name: "Girona", slug: "girona" },
    { name: "Espanyol", slug: "espanyol" },
    { name: "Osasuna", slug: "osasuna" },
    { name: "Celta de Vigo", slug: "vigo" },
    { name: "Cadiz", slug: "cadiz" },
  ],
},

{
  id: "serie-a",
  name: "SERIE A",
  subtitle: "CAMPEONATO ITALIANO",
  teams: [
    { name: "Milan", slug: "ac" },
    { name: "Inter", slug: "inter" },
    { name: "Juventus", slug: "juventus" },
    { name: "Roma", slug: "roma" },
    { name: "Lazio", slug: "lazio" },
    { name: "Napoli", slug: "napoli" },
    { name: "Fiorentina", slug: "fiorentina" },
    { name: "Atalanta", slug: "atalanta" },
    { name: "Bologna", slug: "bologna" },
    { name: "Torino", slug: "torino" },
    { name: "Udinese", slug: "udinese" },
    { name: "Genoa", slug: "genoa" },
    { name: "Parma", slug: "parma" },
    { name: "Venezia", slug: "venezia" },
  ],
},

{
  id: "bundesliga",
  name: "BUNDESLIGA",
  subtitle: "CAMPEONATO ALEMÃO",
  teams: [
    { name: "Bayern", slug: "bayern" },
    { name: "Borussia Dortmund", slug: "borussia" },
    { name: "RB Leipzig", slug: "leipzig" },
    { name: "Eintracht Frankfurt", slug: "eintracht" },
    { name: "Leverkusen", slug: "leverkusen" },
    { name: "Wolfsburg", slug: "wolfsburg" },
    { name: "Freiburg", slug: "freiburg" },
    { name: "Stuttgart", slug: "stuttgart" },
    { name: "Hoffenheim", slug: "hoffenheim" },
    { name: "Schalke", slug: "schalke" },
    { name: "Bremen", slug: "bremen" },
    { name: "Union Berlin", slug: "berlin" },
    { name: "Borussia Monchengladbach", slug: "monchengladbach" },
  ],
},

{
  id: "ligue-1",
  name: "LIGUE 1",
  subtitle: "CAMPEONATO FRANCÊS",
  teams: [
    { name: "PSG", slug: "paris" },
    { name: "Marseille", slug: "marseille" },
    { name: "Nice", slug: "nice" },
    { name: "Lille", slug: "lille" },
    { name: "Monaco", slug: "monaco" },
    { name: "Rennes", slug: "rennes" },
    { name: "Lens", slug: "lens" },
    { name: "Lyon", slug: "lyon" },
    { name: "Montpellier", slug: "montpellier" },
    { name: "Nantes", slug: "nantes" },
    { name: "Brest", slug: "brest" },
  ],
},

{
  id: "retro",
  name: "CAMISAS RETRÔS",
  subtitle: "CAMISAS DE TIMES ANTIGAS",
  teams: [
    { name: "Flamengo", slug: "flamengo" },
    { name: "Palmeiras", slug: "palmeiras" },
    { name: "Corinthians", slug: "corinthians" },
    { name: "River Plate", slug: "river" },
    { name: "Boca Juniors", slug: "boca" },
    { name: "Juventus", slug: "juventus" },
    { name: "Milan", slug: "milan" },
    { name: "Inter", slug: "inter" },
    { name: "Barcelona", slug: "barcelona" },
    { name: "Real Madrid", slug: "madrid" },
    { name: "Manchester United", slug: "united" },
    { name: "Manchester City", slug: "manchester" },
    { name: "Brasil", slug: "brazil" },
    { name: "Argentina", slug: "argentina" },
  ],
},
{
  id: "arabia",
  name: "CAMISAS DA ARÁBIA",
  subtitle: "CAMISAS DE TIMES ARÁBIA",
  teams: [
    {name: "Al Nassr", slug: "al"},
    {name: "Al Hilal", slug: "hilal"},
    {name: "Al Ittihad", slug: "ittihad"},
  ],
},
];
export interface SizeRow {
  size: string;
  chest: string;
  height: string;
  weight?: string;
  length?: string;
  shortLength?: string;
  shortWaist?: string;
  age?: string;
}

//
// COLUNAS
//

export const fanCols = [
  { key: "size", label: "Tam." },
  { key: "chest", label: "Seios" },
  { key: "height", label: "Altura" },
  { key: "weight", label: "Peso" },
  { key: "length", label: "Comprimento" },
  { key: "shortLength", label: "Short/Comp." },
  { key: "shortWaist", label: "Short/Cintura" },
];

export const playerCols = [
  { key: "size", label: "Tam." },
  { key: "chest", label: "Seios" },
  { key: "height", label: "Altura" },
  { key: "weight", label: "Peso" },
  { key: "length", label: "Comprimento" },
  { key: "shortLength", label: "Short/Comp." },
];

export const kidsCols = [
  { key: "size", label: "Tam." },
  { key: "chest", label: "Seios" },
  { key: "height", label: "Altura" },
  { key: "length", label: "Comprimento" },
  { key: "shortLength", label: "Short/Comp." },
  { key: "age", label: "Idade" },
];

//
// TABELA FAN / RETRO
//

export const fanSizes: SizeRow[] = [
  { size: "P", chest: "50", height: "162-170", weight: "50-62", length: "72", shortLength: "40", shortWaist: "60" },
  { size: "M", chest: "52", height: "170-176", weight: "62-78", length: "74", shortLength: "42", shortWaist: "62" },
  { size: "G", chest: "54", height: "176-182", weight: "78-83", length: "76", shortLength: "44", shortWaist: "64" },
  { size: "XG", chest: "56", height: "182-190", weight: "83-90", length: "78", shortLength: "46", shortWaist: "66" },
  { size: "XXG", chest: "58", height: "190-195", weight: "90-97", length: "80", shortLength: "48", shortWaist: "68" },
  { size: "3XG", chest: "60", height: "192-197", weight: "97-104", length: "82" },
  { size: "4XG", chest: "62", height: "197-200", weight: "104-110", length: "84" },
];

//
// TABELA PLAYER
//

export const playerSizes: SizeRow[] = [
  { size: "P", chest: "46", height: "160-165", weight: "50-55", length: "71", shortLength: "42" },
  { size: "M", chest: "48", height: "165-170", weight: "55-60", length: "73", shortLength: "44" },
  { size: "G", chest: "50", height: "170-175", weight: "60-65", length: "75", shortLength: "46" },
  { size: "XG", chest: "52", height: "175-180", weight: "65-70", length: "78", shortLength: "48" },
  { size: "XXG", chest: "54", height: "180-185", weight: "70-75", length: "81", shortLength: "50" },
];

//
// TABELA INFANTIL
//

export const kidsSizes: SizeRow[] = [
  { size: "16", chest: "30", height: "90-105", length: "38", shortLength: "27", age: "3-4" },
  { size: "18", chest: "34", height: "105-115", length: "41", shortLength: "29", age: "4-5" },
  { size: "20", chest: "36", height: "115-125", length: "44", shortLength: "31", age: "5-6" },
  { size: "22", chest: "38", height: "125-135", length: "47", shortLength: "33", age: "6-7" },
  { size: "24", chest: "40", height: "135-145", length: "50", shortLength: "35", age: "8-9" },
  { size: "26", chest: "42", height: "145-155", length: "53", shortLength: "37", age: "10-11" },
  { size: "28", chest: "44", height: "155-165", length: "56", shortLength: "39", age: "12-13" },
];