import { createCheckout, getCheckout, editCheckout } from "../controllers/checkout.controller.js";

export default async function checkoutRoutes(fastify) {
    fastify.post("/", createCheckout);
    fastify.get("/", getCheckout);
    fastify.put("/", editCheckout);
}