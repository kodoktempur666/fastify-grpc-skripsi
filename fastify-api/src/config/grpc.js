import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const packageDef = protoLoader.loadSync(
  "../grpc-server/proto/checkout.proto",
  {}
);

const proto = grpc.loadPackageDefinition(packageDef).checkout;

const client = new proto.CheckoutService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

export default client;