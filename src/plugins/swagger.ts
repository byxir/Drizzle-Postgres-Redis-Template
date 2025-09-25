// src/plugins/swagger.ts
import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { RegisterBody, LoginBody } from "src/controller/auth/authSchema";

export function setupSwagger(app: Express) {
  const registry = new OpenAPIRegistry();

  registry.register("RegisterBody", RegisterBody);
  registry.register("LoginBody", LoginBody);

  registry.registerPath({
    method: "post",
    path: "/api/v1/auth/register",
    request: { body: { content: { "application/json": { schema: RegisterBody } } } },
    responses: { 201: { description: "Signup successful" }, 422: { description: "Validation error" } }
  });

  registry.registerPath({
    method: "post",
    path: "/api/v1/auth/login",
    request: { body: { content: { "application/json": { schema: LoginBody } } } },
    responses: {
      200: { description: "Login successful" },
      401: { description: "Invalid credentials" },
      422: { description: "Validation error" }
    }
  });

  const generator = new OpenApiGeneratorV3(registry.definitions);
  const openApiDoc = generator.generateDocument({
    openapi: "3.0.3",
    info: { title: "API", version: "1.0.0" },
    servers: [{ url: "http://localhost:3000" }]
  });

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDoc));
  app.get("/docs-json", (_req, res) => res.json(openApiDoc));
}
