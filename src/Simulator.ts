import QueueEnvironment from "./QueueEnvironment";
import Queue from "./Queue";
import { readFileSync } from "fs";

try {
  var parameters = JSON.parse(readFileSync("./model.json", "utf8"));
  const environment: QueueEnvironment = new QueueEnvironment(parameters);

  while (environment.random.hasNext()) {
    environment.step();
  }

  for (const queueId of environment.listQueues()) {
    const queue: Queue = environment.getQueue(queueId)!;
    console.log(`Queue:   ${queue.getId()} (Servers: ${queue.servers})`);
    console.log(`Service Time: ${queue.minDeparture} - ${queue.maxDeparture}`);
    console.log("------------------------------------------------------");
    console.log("     State   |        Time        |    Probability    ");
    console.log("------------------------------------------------------");

    for (const [state, time] of queue.statistics) {
      console.log(
        `${state.toString().padStart(7)}${time.toFixed(4).padStart(21)}${(
          (time / (environment.time + environment.accumulatedTime)) *
          100
        )
          .toFixed(2)
          .padStart(21)}%`
      );
    }

    console.log(`\nLosses: ${queue.lost}\n`);
  }

  console.log(
    `Simulation time: ${environment.time + environment.accumulatedTime}`
  );
} catch (error) {
  console.error(error);
}
