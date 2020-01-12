import { Layer } from "./Layer.js";

export class FlattenLayer extends Layer {
  constructor() {
    super();
  }

  feedForwardM(input) {
    return this._transposeM(this._transposeM(input).map(e => e.flat(2)));
  }
}
