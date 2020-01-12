import { Layer } from "./Layer.js";

export class SoftmaxLayer extends Layer {
  constructor(weights, biases) {
    super();
    this._weights = weights;
    this._biases = biases;
  }

  feedForwardM(input) {
    let weightedInput = this._dotM(this._weights, input);
    let biasedInput = this._binaryMap(weightedInput, this._biases,
        (weightedInputRow, biasesRow) => {
          return weightedInputRow.map(e => e + biasesRow[0]);
        }
    );
    let output = this._colMapM(biasedInput, col => {
      let exps = col.map(z => Math.exp(z));
      let sum = exps.reduce((a, b) => a + b, 0);
      return exps.map(a => a / sum);
    });
    return output;
  }
}
