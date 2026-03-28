import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const packageDef = protoLoader.loadSync(
    "src/proto/checkout.proto",
  {}
);

const proto = grpc.loadPackageDefinition(packageDef).checkout;

const client = new proto.CheckoutService(
  "grpc_server:50051",
  grpc.credentials.createInsecure()
);

export default client;