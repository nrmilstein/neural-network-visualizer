import { Layer } from "./Layer.js";

export class PoolLayer extends Layer {
  constructor(size) {
    super();
    this._size = size;
  }

  feedForwardM(input) {
    return this._mapM(input, e => {
      return this._maxPool(e);
    });
  }

  _maxPool(input) {
    let outputHeight = Math.floor(input.length / 2);
    let outputWidth = Math.floor(input[0].length / 2);

    let output = this._createNDArray([outputHeight, outputWidth]);

    for (let i = 0; i < outputHeight; i++) {
      for (let j = 0; j < outputWidth; j++) {
        output[i][j] = Math.max(
          input[i * 2][j * 2],
          input[i * 2 + 1][j * 2],
          input[i * 2][j * 2 + 1],
          input[i * 2 + 1][j * 2 + 1],
        );
      }
    }
    return output;
  }
}
