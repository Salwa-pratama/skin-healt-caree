"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const options = {
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function setupSwagger(app, port) {
    // Swagger Page
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    }));
    // Docs in JSON format
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(`✅ Swagger docs available at http://localhost:${port}/api-docs`);
}
