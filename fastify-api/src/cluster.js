import cluster from "cluster";
import os from "os";

const cpu = os.cpus().length;

if (cluster.isPrimary) {

  console.log(`Primary ${process.pid}`);

  for (let i = 0; i < cpu; i++)
    cluster.fork();

} else {

  import("./server.js");

}