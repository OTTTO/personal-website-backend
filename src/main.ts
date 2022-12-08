import { NestFactory } from '@nestjs/core';
import { AppModule } from 'modules/app.module';
import {createDatabase} from "typeorm-extension";

declare const module: any;
async function bootstrap() { 

  await createDatabase({ifNotExist: true});

  const app = await NestFactory.create(AppModule);
  await app.listen(3001);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
