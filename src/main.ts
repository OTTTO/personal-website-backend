import { NestFactory } from '@nestjs/core';
import { AppModule } from 'modules/app.module';
import { UserService } from 'services/user.service';
import { createDatabase } from 'typeorm-extension';

declare const module: any;
async function bootstrap() {
  await createDatabase({ ifNotExist: true });

  const app = await NestFactory.create(AppModule);
  await app.listen(3001);

  const userService = app.get<UserService>(UserService);

  if (process.env.NODE_ENV === 'development') {
    await userService.signUpAdmin();
  }

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
