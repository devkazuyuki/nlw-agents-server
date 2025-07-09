import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';

export const createQuestRoute: FastifyPluginCallbackZod = (app) => {
  app.post('/rooms/:roomId/questions', {
      schema: {
          body: z.object({
              question: z.string().min(1).max(255),
          }),
          params: z.object({
              roomId: z.string()
          })
      }
  },
      async (request, reply) => {
        const { question } = request.body;
        const { roomId } = request.params;

        const result = await db
            .insert(schema.questions)
            .values({
            question,
            roomId
        }).returning();

        const insertedQuestion = result[0];
          if (insertedQuestion) {
              return reply.status(201).send({roomId: insertedQuestion.id});
          } else {
              throw new Error('Error creating question');
          }
      });
};
