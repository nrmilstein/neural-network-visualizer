export class Network {
  constructor(layers) {
    this._layers = layers;
  }

  feedForward(input) {
    return this.feedForwardM([[input]]);
  }

  feedForwardM(input) {
    let a = input;
    for (let layer of this._layers) {
      a = layer.feedForwardM(a);
    }
    return a;
  }

  _columnVec(arr) {
    return arr.map(e => [e]);
  }

  _rowVec(arr) {
    return [arr];
  }
}

