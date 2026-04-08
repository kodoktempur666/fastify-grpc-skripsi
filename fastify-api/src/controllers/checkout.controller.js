import client from "../config/grpc.js";
import redis from "../config/redis.js";
import checkoutQueue from "../queue/checkout.queue.js";


const getCheckoutGrpc = (id) => {
  return new Promise((resolve, reject) => {
    client.GetCheckout({ id }, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

const editCheckoutGrpc = (data) => {
  return new Promise((resolve, reject) => {
    client.EditCheckout(data, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

const patchCheckoutGrpc = (data) => {
  return new Promise((resolve, reject) => {
    client.PatchCheckout(data, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};



export const createCheckoutBull = async (req, reply) => {
  await checkoutQueue.add("createCheckout", req.body);

  return reply.code(202).send({
    success: true,
    message: "Checkout queued"
  });
};

export const createCheckout = async (req, reply) => {
  try {
    // Panggil gRPC client secara sync (dibalut Promise)
    const result = await new Promise((resolve, reject) => {
      client.CreateCheckout(req.body, (err, response) => {
        if (err) reject(err);
        else resolve(response);
      });
    });

    return reply.code(201).send({
      success: true,
      message: "Checkout created (sync gRPC)",
      data: result
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: "Failed to create checkout",
      error: error.message
    });
  }
}


export const getCheckout = async (req, reply) => {
  const { id } = req.params;

  try {
    const cache = await redis.get(`checkout:${id}`);

    if (cache) {
      return reply.code(200).send({
        success: true,
        message: "Checkout fetched from cache",
        data: JSON.parse(cache)
      });
    }

    const response = await getCheckoutGrpc(id);

    if (!response || !response.id) {
      return reply.code(404).send({
        success: false,
        message: "Checkout not found"
      });
    }

    await redis.set(
      `checkout:${id}`,
      JSON.stringify(response),
      "EX",
      60
    );

    return reply.code(200).send({
      success: true,
      message: "Checkout fetched successfully",
      data: response
    });

  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: "Failed to fetch checkout",
      error: error.message
    });
  }
};


export const editCheckout = async (req, reply) => {
  const { id } = req.params;

  try {
    const response = await editCheckoutGrpc({ ...req.body, id });

    if (!response || !response.id) {
      return reply.code(404).send({
        success: false,
        message: "Checkout not found"
      });
    }

    await redis.del(`checkout:${id}`);

    return reply.code(200).send({
      success: true,
      message: "Checkout updated successfully",
      data: response
    });

  } catch (err) {
    return reply.code(500).send({
      success: false,
      message: "Failed to update checkout",
      error: err.message
    });
  }
};


export const patchCheckout = async (req, reply) => {
  const { id } = req.params;

  try {
    const response = await patchCheckoutGrpc({ ...req.body, id });

    if (!response || !response.id) {
      return reply.code(404).send({
        success: false,
        message: "Checkout not found"
      });
    }

    await redis.del(`checkout:${id}`);

    return reply.code(200).send({
      success: true,
      message: "Checkout patched successfully",
      data: response
    });

  } catch (err) {
    return reply.code(500).send({
      success: false,
      message: "Failed to patch checkout",
      error: err.message
    });
  }
};