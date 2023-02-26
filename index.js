import "dotenv/config";

// Create app express
import express from "express";
const app = express();

// Swagger Doc
import expressJSDocSwagger from "express-jsdoc-swagger";
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const options = {
    info: {
      version: '1.0.0',
      title: 'My Family Goal',
      license: {
        name: 'MIT',
      },
    },
    security: {
      TokenAuth : {
        type: 'http',
        scheme: 'bearer'
      }
    },
    baseDir: __dirname,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: './**/*.js',
    swaggerUIPath: '/api-docs'
  };
  expressJSDocSwagger(app)(options);

// Config cors
import cors from "cors";
app.use(cors());

// Config json & urlencoded
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Router
import { router } from "./app/routers/index.js";
app.use(router);

// launch server
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, ()=>{
    console.log(`Server launched on : http://localhost:${PORT}`);
});