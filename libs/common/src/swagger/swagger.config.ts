import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  constructor(
    protected readonly app: INestApplication,
    protected readonly path: string = 'api',
    protected readonly title: string = 'My APP',
    protected readonly description: string = 'My Applications',
    protected readonly version: string = '1.0',
  ) {
    this.setupSwagger();
  }

  private setupSwagger(): void {
    const options = new DocumentBuilder()
      .setTitle(this.title)
      .setDescription(this.description)
      .setVersion(this.version)
      .build();

    const document = SwaggerModule.createDocument(this.app, options);
    SwaggerModule.setup(this.path, this.app, document);
  }
}
