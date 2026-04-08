import { createCheckout, getCheckout, editCheckout, patchCheckout, createCheckoutBull } from "../controllers/checkout.controller.js";

export default async function checkoutRoutes(fastify) {
    fastify.post("/", createCheckout);
    fastify.get("/:id", getCheckout);
    fastify.put("/:id", editCheckout);
    fastify.patch("/:id", patchCheckout);
    fastify.post("/bull", createCheckoutBull);
}