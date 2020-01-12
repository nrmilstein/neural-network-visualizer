import { Network } from "./Network.js";
import { ConvLayer } from "./ConvLayer.js";
import { PoolLayer } from "./PoolLayer.js";
import { FlattenLayer } from "./FlattenLayer.js";
import { FullyConnectedLayer } from "./FullyConnectedLayer.js";
import { SoftmaxLayer } from "./SoftmaxLayer.js";

export class NetworkLoader {
  static loadNetwork(filename) {
    return $.getJSON(filename)
      .then(json => {
        return new Network(json.map(desc => {
          if (desc.type == "ConvLayer") {
            return new ConvLayer(desc.weights, desc.biases, desc.activationFunction);
          } else if (desc.type == "PoolLayer") {
            return new PoolLayer(desc.size);
          } else if (desc.type == "FlattenLayer") {
            return new FlattenLayer();
          } else if (desc.type == "FullyConnectedLayer") {
            return new FullyConnectedLayer(desc.weights, desc.biases, desc.activationFunction);
          } else if (desc.type == "SoftmaxLayer") {
            return new SoftmaxLayer(desc.weights, desc.biases);
          }
        }));
      })
      .fail(err => {
        console.error(err);
        // console.log("error: loadNetwork: could not load JSON network from " + filename + ": " + err.message);
      });
  }
}
