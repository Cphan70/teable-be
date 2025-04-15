import {
  CorsOptions,
  CorsOptionsDelegate,
} from '@nestjs/common/interfaces/external/cors-options.interface';

const acceptedMethods = ['GET', 'POST', 'PUT', 'HEAD'];

const CORS_CONFIG: CorsOptions | CorsOptionsDelegate<any> = {
  origin: true,
  methods: acceptedMethods,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

export { CORS_CONFIG };
