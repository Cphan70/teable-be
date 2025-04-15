import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';
import { envValidationSchema } from './env.validation.schema';
import { authConfig } from './auth.config';
import { loggerConfig } from './logger.config';

const configurations = [authConfig, loggerConfig];

@Module({})
export class ConfigsModule {
  static register(): Promise<DynamicModule> {
    return BaseConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: configurations,
      envFilePath: ['.env.development.local', '.env.development', '.env'].map(
        (str) => {
          //   const nextJsDir = nextJsConfig().dir;
          //   const envDir = nextJsDir
          //     ? path.join(process.cwd(), nextJsDir, str)
          //     : str;
          //   Logger.attachBuffer();
          //   Logger.log(`[Env File Path]: ${envDir}`);
          //   Logger.detachBuffer();
          return str;
        },
      ),
      validationSchema: envValidationSchema,
    });
  }
}
