import { FastifyPluginAsync, RouteHandlerMethod } from 'fastify';

export const health: FastifyPluginAsync = async function (instance, options): Promise<void> {
    instance.route({
        method: 'GET',
        url: '/health',
        handler,
    });
};

export const handler: RouteHandlerMethod = async function (request, reply): Promise<void> {
    reply.send('alive');
};
