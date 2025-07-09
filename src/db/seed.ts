import { reset, seed } from 'drizzle-seed';
import { schema } from './schema/index.ts';
import { db, sql } from './connection.ts';

await reset(db, schema);

await seed(db, schema).refine((f) => {
  return {
    rooms: {
      count: 28,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
        createdAt: f.date({ minDate: new Date('2023-01-01'), maxDate: new Date() }),
      },
    },
    questions: {
      count: 20
    }
  };
});

await sql.end();

console.log('Seed successfully closed');
