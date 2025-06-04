import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const studentNames = [
    // Primeira imagem
    "AGATHA LOUISE DOS SANTOS CORDEIRO",
    "ANA LIZ NASCIMENTO SIQUEIRA",
    "AYLA EMILLY RODRIGUES DO CARMO",
    "BEATRIZ ARANTES CARDOSO LEITE",
    "BERNARDO LACERDA BERGAMIN ALVES",
    "ELISA HUBINER THOMAS",
    "HELENA SOUZA GOMES",
    "JOSÉ EDUARDO FREIRE RODRIGUES",
    "KIARA AUGUSTO SILVA",
    "LUÍSA PETERLE OLIVEIRA",
    "LUIZA CLARINDO BOTELHO",
    "MALU GARCIA MENEGHEL",
    "MARIA EDUARDA BIANCHI PINHEIRO",
    "MARIA EDUARDA FERREIRA LEÃO",
    "RAVI MENELI VENTURIN MORAES",
    "THEO GOZER OLIVEIRA",
    "VALENTINE LOOSE DE ANDRADE",
    "VALETINA DA SILVA VIEIRA",

    // Segunda imagem
    "ABNER RIBEIRO DE SOUZA",
    "ANTONELLA SANTOS DE SOUZA LEMOS",
    "BERNARDO BAIÔCCO FRAGA",
    "DANILO LORENZUTTI WINGLER",
    "ELLIS HELENA SILVA SANTOS CARDOSO",
    "GAEL STANGE MERKLEIN",
    "GUILHERME MIRANDA DOS SANTOS",
    "HEITOR DE ASSIS RODRIGUES",
    "HELENA PAGIO",
    "HELENA TIM MENGALI",
    "ÍSIS PASTRORINI DE OLIVEIRA",
    "JOÃO GABRIEL ANDRADE BRAGA",
    "JULIA RODRIGUES CAMARGO",
    "KAIQUE LIMA OLIVEIRA",
    "LÍVIA MOREIRA DE SOUZA SILVA",
    "MAITÊ STANGE QUERINO",
    "MARIA VALENTINA RIGONI TEODORO",
    "RAVI RODRIGUES SCHADE",
    "RHUAN ALVES ANDREÃO GOMES",
    "VALENTINA ROSSI PORFIRIO",
  ];

  for (const name of studentNames) {
    await db.student.create({
      data: {
        name,
        serieId: 1, // ajuste conforme necessário
      },
    });
  }

  console.log("✅ Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(() => {
    db.$disconnect();
  });
