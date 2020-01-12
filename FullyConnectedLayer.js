import { Layer } from "./Layer.js";

export class FullyConnectedLayer extends Layer {
  constructor(weights, biases, activationFunction) {
    super();
    this._biases = biases;
    this._weights = weights;
    if (activationFunction == "ReLU") {
      this._activationFunction = this._relu;
    }
  }

  feedForwardM(input) {
    let weightedInput = this._dotM(this._weights, input);
    let biasedInput = this._binaryMap(weightedInput, this._biases,
        (weightedInputRow, biasesRow) => {
          return weightedInputRow.map(e => e + biasesRow[0]);
        }
    );
    let output = this._mapM(biasedInput, e => this._activationFunction(e));
    return output;
  }
}
