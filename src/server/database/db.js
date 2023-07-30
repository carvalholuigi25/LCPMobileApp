import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("lcpmobileapp.db", "1.0.0", "LCP Mobile App", 200000);

const initDatabase = () => {
  if(db) {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS games (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT NULL,
          platforms TEXT NULL,
          category TEXT NULL,
          gamemodes TEXT NULL,
          releaseDate DATETIME NULL,
          rating NUMBER NULL,
          ageRate NUMBER NULL,
          publishers TEXT NULL,
          companies TEXT NULL,
          image TEXT NULL,
          cover TEXT NULL,
          isFeatured BOOLEAN NULL
        );`
      );
    });
  }
};

const initTableSeedValues = (isSeedVals) => {
  if(isSeedVals && db) {
    db.transaction(tx => {
      tx.executeSql(`
        INSERT INTO games (title, description, platforms, category, gamemodes, releaseDate, rating, ageRate, publishers, companies, image, cover, isFeatured)
        VALUES ("GTA V", "Grand Theft Auto V é um jogo eletrônico de ação-aventura desenvolvido pela Rockstar North e publicado pela Rockstar Games. É o sétimo título principal da série Grand Theft Auto e foi lançado originalmente em 17 de setembro de 2013 para PlayStation 3 e Xbox 360, com remasterizações lançadas em 2014 para PlayStation 4 e Xbox One, em 2015 para Microsoft Windows e em 2022 para PlayStation 5 e Xbox Series X/S. O jogo se passa no estado ficcional de San Andreas, com a história da campanha um jogador seguindo três criminosos e seus esforços para realizarem assaltos sob a pressão de uma agência governamental. O mundo aberto permite que os jogadores naveguem livremente pelas áreas rurais e urbanas de San Andreas. Src: https://pt.wikipedia.org/wiki/Grand_Theft_Auto_V", "PS3, Xbox 360, PS4, Xbox One, PC, PS5, Xbox Series X|S", "Action/Adventure", "Single Player / Multi Player", "2013-09-17T00:00:00", 9, 18, "Rockstar Games", "Rockstar Games / North & Take Two Interactive", "games/images/gtav.png", "games/covers/gtav.png", true);
      `);
    });
  }
};

db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
  console.log('Foreign keys turned on')
);

initDatabase();
initTableSeedValues(true);

export default db;

// src: https://chat.openai.com/share/dce203e7-1502-4dae-b708-7bbf49142100