import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express, Request, Response } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Skin Health Care API',
      version: '1.0.0',
      description: 'API documentation for Skin Health Care Backend Service',
    },
    servers: [
      {
        url: '/',
        description: 'Default Server (Relative URL for dev/prod)',
      },
      {
        url: `http://localhost:${process.env.APP_PORT || 1915}`,
        description: 'Local Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Look for swagger comments in these files
  apis: [
    './src/modules/**/*.ts',
    './src/modules/**/*.js',
    './dist/src/modules/**/*.js',
    './dist/modules/**/*.js',
    './modules/**/*.js',
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express, port: number | string) {
  // Swagger Page
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    })
  );

  // Docs in JSON format
  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`✅ Swagger docs available at http://localhost:${port}/api-docs`);
}

