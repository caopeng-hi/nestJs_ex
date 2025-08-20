import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { ConfigService } from '@nestjs/config';
import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)

  const errorFilterFlag = configService.get('ALL_ERROR_FILTER')

  const cors = configService.get('CORS', false)
  
  const prefix = configService.get('PREFIX', '/api')
  
  const versionStr = configService.get('VERSION',1)


  let version = [versionStr]
  if (versionStr && versionStr.indexOf(',')) {
    version = versionStr.split(',')
  }

   
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  app.setGlobalPrefix(prefix)
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion:typeof versionStr === 'undefined' ? VERSION_NEUTRAL : version
  })

  const httpAdapter = app.get(HttpAdapterHost)

  if (cors === 'true') {
    app.enableCors()
   }

  if (errorFilterFlag === 'true') {

   app.useGlobalFilters(new AllExceptionFilter(httpAdapter))
  
  }

  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
