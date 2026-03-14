import Fastify from "fastify";
import cors from "./plugins/cors.js";
import routes from "./routes/checkout.routes.js";

const app = Fastify({
  logger: true
});

await app.register(cors);

await app.register(routes);

export default app;