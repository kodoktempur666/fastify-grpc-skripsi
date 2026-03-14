import client from "../config/grpc.js";
import redis from "../config/redis.js";
import checkoutQueue from "../queue/checkout.queue.js";

export const createCheckout = async (req, reply) => {

  await checkoutQueue.add("createCheckout", req.body);

  return reply.code(202).send({
    message: "Checkout queued"
  });

};

export const getCheckout = async (req, reply) => {

  const cache = await redis.get("checkout");

  if (cache) {
    return reply.send(JSON.parse(cache));
  }

  client.GetCheckout({}, async (err, response) => {

    if (err) {
      return reply.code(500).send(err);
    }

    await redis.set("checkout", JSON.stringify(response), "EX", 60);

    reply.send(response);

  });

};

export const editCheckout = async (req, reply) => {

  client.EditCheckout(req.body, async (err, response) => {

    if (err) {
      return reply.code(500).send(err);
    }

    await redis.del("checkout");

    reply.send(response);

  });

};