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
  apis: ['./src/modules/**/*/router.ts', './src/modules/**/*/*_router.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express, port: number | string) {
  // Swagger Page
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`✅ Swagger docs available at http://localhost:${port}/api-docs`);
}
