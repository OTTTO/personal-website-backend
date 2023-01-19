import { NestFactory } from '@nestjs/core';
import { AppModule } from 'modules/app.module';
import { UserService } from 'services/user.service';
import { createDatabase } from 'typeorm-extension';
import fs from 'fs';
import path from 'path';

declare const module: any;
async function bootstrap() {
  await createDatabase({ ifNotExist: true });
  const httpsOptions =
    process.env.NODE_ENV !== 'development'
      ? {
          key: fs.readFileSync(path.resolve(__dirname, '../../privkey.pem')),
          cert: fs.readFileSync(path.resolve(__dirname, '../../fullchain.pem')),
        }
      : null;

  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors();
  await app.listen(3001);

  const userService = app.get<UserService>(UserService);

  await userService.signUpAdmin();

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
