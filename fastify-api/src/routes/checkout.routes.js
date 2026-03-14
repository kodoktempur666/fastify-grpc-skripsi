import { createCheckout, getCheckout, editCheckout } from "../controllers/checkout.controller.js";

export default async function checkoutRoutes(fastify) {
    fastify.post("/checkout", createCheckout);
    fastify.get("/checkout", getCheckout);
    fastify.put("/checkout", editCheckout);
}