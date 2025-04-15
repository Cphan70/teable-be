import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigsModule } from './configs/configs.module';
import { RouterModule } from '@nestjs/core';
import { UserModule } from './features/user/user.module';

const routingConfigs = () => [
  AuthModule,
  UserModule,
  RouterModule.register([
    {
      path: 'auth',
      module: AuthModule,
    },
    {
      path: 'user',
      module: UserModule,
    },
  ]),
];

@Module({
  imports: [
    ...routingConfigs(),
    DatabaseModule,
    AuthModule,
    ConfigsModule.register(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
