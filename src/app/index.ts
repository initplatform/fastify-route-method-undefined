import fastify, {
    FastifyInstance,
    FastifyLoggerInstance,
    FastifyServerOptions,
    RawServerDefault,
} from 'fastify';
import fastifyCors from 'fastify-cors';
import helmet from 'fastify-helmet';
import { LoggerOptions, stdSerializers } from 'pino';

import { health } from '#app/plugins';

import { requestSerializer, responseSerializer } from './serializers';

export class FastifyApp {
    _server!: FastifyInstance;

    loggerOptions: LoggerOptions = {
        level: 'debug',
        prettyPrint: true,
        redact: ['req.headers.authorization'],
        serializers: {
            res: responseSerializer,
            req: requestSerializer,
            err: stdSerializers.err,
        },
    };

    constructor() {

        this._server = fastify({
            logger: this.loggerOptions,
        } as FastifyServerOptions<RawServerDefault, FastifyLoggerInstance>);

        // Fastify Plugins
        this._server.register(helmet);
        this._server.register(fastifyCors);

        // Features Routes
        this._server.register(health, { prefix: '/health-a' });
        this._server.register(health, { prefix: '/health-c' });

        this._server.ready(() => {
            console.log(this._server.printRoutes());
            console.log(
                `\n### INFO: HEALTH CHECK: http://0.0.0.0:${8786}/api/latest/health\n`
            );
        });
        return this;
    }

    listen(): void {
        try {
            this._server.listen(8786, '0.0.0.0');
        } catch (error) {
            this._server.log.error(error);
            process.exit(1);
        }
    }
}
