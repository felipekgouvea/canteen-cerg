import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  await db.student.create({
    data: {
      name: "CARLOS OFRANTE VENTURA",
      serieId: 3,
    },
  });
  await db.student.create({
    data: {
      name: "DAVI MIRANDA SANTOS",
      serieId: 3,
    },
  });
  await db.student.create({
    data: {
      name: "HEITOR CEBIN CASAGRANDE",
      serieId: 3,
    },
  });
  await db.student.create({
    data: {
      name: "HEITOR FANTONI CAETANO",
      serieId: 3,
    },
  });
  await db.student.create({
    data: {
      name: "HEITOR ROCHA KRAUSE",
      serieId: 3,
    },
  });
  await db.student.create({
    data: {
      name: "ISABELLA ZANETTI SONCINI",
      serieId: 3,
    },
  });
  await db.student.create({
    data: {
      name: "LIZ FERNANDES NASCIMENTO",
      serieId: 3,
    },
  });
  await db.student.create({
    data: {
      name: "KALEB MARQUES BASTOS",
      serieId: 3,
    },
  });
  await db.student.create({
    data: {
      name: "MAITÊ SOUZA MORAES",
      serieId: 3,
    },
  });
  await db.student.create({
    data: {
      name: "MIGUEL WALTER LIRIO",
      serieId: 3,
    },
  });
  await db.student.create({
    data: {
      name: "OTNIEL NUNES SIQUEIRA",
      serieId: 3,
    },
  });
  await db.student.create({
    data: {
      name: "RAYSA EMANUELLY DA SILVA DIAS",
      serieId: 3,
    },
  });
  await db.student.create({
    data: {
      name: "THÉO ALÍPIO EMERICH BATISTA",
      serieId: 3,
    },
  });
  await db.student.create({
    data: {
      name: "THOMAS DE SOUZA MONFORDINI",
      serieId: 3,
    },
  });
  await db.student.create({
    data: {
      name: "TITO DELPUPO BORGES",
      serieId: 3,
    },
  });
  await db.student.create({
    data: {
      name: "VICENTE MENELI VENTURIN MODESTO",
      serieId: 3,
    },
  });
  await db.student.create({
    data: {
      name: "VICENTE PONTES SANTANA",
      serieId: 3,
    },
  });
  await db.student.create({
    data: {
      name: "ARTHUR ZACHÉ DE FIGUEREDO",
      serieId: 4,
    },
  });
  await db.student.create({
    data: {
      name: "BERNARDO ARANTES CARDOSO LEITE",
      serieId: 4,
    },
  });
  await db.student.create({
    data: {
      name: "CARLOS EDUARDO DE SOUZA PINHEIRO",
      serieId: 4,
    },
  });
  await db.student.create({
    data: {
      name: "HEITOR OLIVEIRA SEIBEL",
      serieId: 4,
    },
  });
  await db.student.create({
    data: {
      name: "HELOISE SOUZA MIRANDA CARDOSO",
      serieId: 4,
    },
  });
  await db.student.create({
    data: {
      name: "HENRIQUE FREIRE DE CASTRO",
      serieId: 4,
    },
  });
  await db.student.create({
    data: {
      name: "ISABELLA BUENO CÔCO",
      serieId: 4,
    },
  });
  await db.student.create({
    data: {
      name: "JOÃO MIGUEL RODRIGUES VENTURA",
      serieId: 4,
    },
  });
  await db.student.create({
    data: {
      name: "LARA PEREIRA LIMA",
      serieId: 4,
    },
  });
  await db.student.create({
    data: {
      name: "LUCAS GONZÁLEZ DISCHER DA SILVA",
      serieId: 4,
    },
  });
  await db.student.create({
    data: {
      name: "MANOELA LAURENTINO SANTOLIN DOS SANTOS",
      serieId: 4,
    },
  });
  await db.student.create({
    data: {
      name: "MARIA FLOR CRUZ INTRA",
      serieId: 4,
    },
  });
  await db.student.create({
    data: {
      name: "MARIANA DE OLIVEIRA MORAIS",
      serieId: 4,
    },
  });
  await db.student.create({
    data: {
      name: "MATHEUS FERREIRA DOS SANTOS MATIAS",
      serieId: 4,
    },
  });
  await db.student.create({
    data: {
      name: "MURILO SIMMER PIRES",
      serieId: 4,
    },
  });
  await db.student.create({
    data: {
      name: "NICOLAS GOMES GUIMARÃES",
      serieId: 4,
    },
  });
  await db.student.create({
    data: {
      name: "OTÁVIO ROCHA BRAGA",
      serieId: 4,
    },
  });
  await db.student.create({
    data: {
      name: "PETRICK FRANCISCO BRAGA",
      serieId: 4,
    },
  });
  await db.student.create({
    data: {
      name: "SARA DA SILVA DE SOUZA",
      serieId: 4,
    },
  });
  await db.student.create({
    data: {
      name: "THAILA RAMOS CRUZ",
      serieId: 4,
    },
  });
  await db.student.create({
    data: {
      name: "ALICE MORELLATO PANSINI",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "ALICIA DA FONSECA BATISTA",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "ARTHUR ROCHA KRAUSE",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "BENÍCIO DOS SANTOS RIBEIRO",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "BERNARDO CORTELLETI DA SILVA GOUVÊA",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "DAVI MARQUES MOREIRA",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "DIANNA DA SILVA FIGUEIRA",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "ENZO TARGA SANTANA",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "JOANNA DE ANGELIS RIBEIRO BORGES",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "JOÃO MIGUEL ROSA RAMOS",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "JOHNATAN LEMOS DO NASCIMENTO FILHO",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "JOSÉ ANTÔNIO VIEIRA GOMES",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "LAURA ALAIDE NUNES SIQUEIRA",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "LIAM ERLACHER MELO",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "LORENZO MATTEDI CARVALHO",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "LUÍSA MARQUES DA SILVA",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "MARIA EDUARDA TAVARES DOS SANTOS OLIVEIRA",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "MARINA RODRIGUES CASSUNDE",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "MATHEUS ZANETTI SONCINI",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "NYCOLAS RODRIGUES DE PINHO",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "RAFAEL CAMPORESI DEBONA",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "TIAGO MIGUEL DE SOUZA MARQUES",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "VALENTINA ABREU DOS SANTOS",
      serieId: 5,
    },
  });
  await db.student.create({
    data: {
      name: "ANA BEATRIZ SANTOS RODRIGUES",
      serieId: 6,
    },
  });
  await db.student.create({
    data: {
      name: "ANA CLARA GOMES DE OLIVEIRA",
      serieId: 6,
    },
  });
  await db.student.create({
    data: {
      name: "ANA PAULA CESTARI RODRIGUES",
      serieId: 6,
    },
  });
  await db.student.create({
    data: {
      name: "ARTHUR GOMES TOREZANI",
      serieId: 6,
    },
  });
  await db.student.create({
    data: {
      name: "BENJAMIM CASTRO QUINUP",
      serieId: 6,
    },
  });
  await db.student.create({
    data: {
      name: "BERNARDO AUGUSTO DE SOUZA LEMOS DOS SANTOS",
      serieId: 6,
    },
  });
  await db.student.create({
    data: {
      name: "DANIEL OLIVEIRA DIAS MIRANDA",
      serieId: 6,
    },
  });
  await db.student.create({
    data: {
      name: "DAVI OLIVEIRA FITARONI",
      serieId: 6,
    },
  });
  await db.student.create({
    data: {
      name: "EDUARDO ARAUJO PEDRUZZI",
      serieId: 6,
    },
  });
  await db.student.create({
    data: {
      name: "HAABE HELENA TAVARES DE SOUZA",
      serieId: 6,
    },
  });
  await db.student.create({
    data: {
      name: "HADASSA HELENA DE SOUZA",
      serieId: 6,
    },
  });
  await db.student.create({
    data: {
      name: "LAURA HELLEN DA SILVA SANTOS",
      serieId: 6,
    },
  });
  await db.student.create({
    data: {
      name: "MIGUEL GOUVÊA CRUZ",
      serieId: 6,
    },
  });
  await db.student.create({
    data: {
      name: "SOPHIA DUTRA MACEDO",
      serieId: 6,
    },
  });
  await db.student.create({
    data: {
      name: "THÉO SILVINO GROLLA",
      serieId: 6,
    },
  });
  await db.student.create({
    data: {
      name: "ANA JÚLIA FRANCO MARÇAL",
      serieId: 7,
    },
  });
  await db.student.create({
    data: {
      name: "BIANCA VIEIRA FARIA",
      serieId: 7,
    },
  });
  await db.student.create({
    data: {
      name: "GIOVANNA GUIMARÃES BARCELLOS",
      serieId: 7,
    },
  });
  await db.student.create({
    data: {
      name: "GUILHERME LUIZ DE OLIVEIRA",
      serieId: 7,
    },
  });
  await db.student.create({
    data: {
      name: "ÍCARO AIGNER BORGES",
      serieId: 7,
    },
  });
  await db.student.create({
    data: {
      name: "ÍCARO ROCHA BRAGA",
      serieId: 7,
    },
  });
  await db.student.create({
    data: {
      name: "ISABELLA PANSINI COUTO",
      serieId: 7,
    },
  });
  await db.student.create({
    data: {
      name: "ISABELLY MENDES DA SILVA",
      serieId: 7,
    },
  });
  await db.student.create({
    data: {
      name: "LAURA CLARINDO BOTELHO",
      serieId: 7,
    },
  });
  await db.student.create({
    data: {
      name: "LORENZO COMINOTE DA SILVA",
      serieId: 7,
    },
  });
  await db.student.create({
    data: {
      name: "LUCAS JUSTI GOMES DOS SANTOS",
      serieId: 7,
    },
  });
  await db.student.create({
    data: {
      name: "MANOELA RODRIGUES CAMARGO",
      serieId: 7,
    },
  });
  await db.student.create({
    data: {
      name: "MATHEUS PERALTA MOREIRA DE OLIVEIRA",
      serieId: 7,
    },
  });
  await db.student.create({
    data: {
      name: "NÍCOLAS HIANC NICOLINE",
      serieId: 7,
    },
  });
  await db.student.create({
    data: {
      name: "RAFAEL PASCOAL COSTA",
      serieId: 7,
    },
  });
  await db.student.create({
    data: {
      name: "THÉO FONSECA LAIBER",
      serieId: 7,
    },
  });
  await db.student.create({
    data: {
      name: "VICTÓRIA MARTINS FRAGA",
      serieId: 7,
    },
  });
  await db.student.create({
    data: {
      name: "ALICE FERREIRA FERNANDES",
      serieId: 8,
    },
  });
  await db.student.create({
    data: {
      name: "BEATRIZ ANDRADE VASCONCELLOS",
      serieId: 8,
    },
  });
  await db.student.create({
    data: {
      name: "CAMILLY VICTÓRIA BERNARDO DA SILVA",
      serieId: 8,
    },
  });
  await db.student.create({
    data: {
      name: "MIGUEL DANTAS FREIRE",
      serieId: 8,
    },
  });
  await db.student.create({
    data: {
      name: "REBECA FERNANDES CORDEIRO",
      serieId: 8,
    },
  });
  await db.student.create({
    data: {
      name: "REBECA PAIM SPÍNOLA",
      serieId: 8,
    },
  });
  await db.student.create({
    data: {
      name: "SOFIA FRANCISCHETTO MACHADO",
      serieId: 8,
    },
  });
}

main().finally(() => db.$disconnect());
