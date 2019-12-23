class Network {
  constructor(biases, weights) {
    this._biases = biases;
    this._weights = weights;
  }

  feedForward(a) {
    return this.feedForwardM(this._columnVec(a));
  }

  feedForwardM(a) {
    for (let i = 0; i < this._weights.length; i++) {
      a = this.sigmoidM(this._addM(this._dotM(this._weights[i], a), this._biases[i]));
    }
    return a;
  }

  sigmoidM(m) {
    return m.map(row => {
      return row.map(z => {
        return 1.0 / (1.0 + Math.exp(-z));
      });
    });
  }

  _columnVec(arr) {
    return arr.map(e => [e]);
  }

  _rowVec(arr) {
    return [arr];
  }

  _addM(m1, m2) {
    let result = [];
    for (let i = 0; i < m1.length; i++) {
      result[i] = [];
      for (let j = 0; j < m1[0].length; j++) {
        result[i][j] = m1[i][j] + m2[i][j];
      }
    }
    return result;
  }


  _dotM(m1, m2) {
      let result = [];
      for (let i = 0; i < m1.length; i++) {
          result[i] = [];
          for (let j = 0; j < m2[0].length; j++) {
              let sum = 0;
              for (let k = 0; k < m1[0].length; k++) {
                  sum += m1[i][k] * m2[k][j];
              }
              result[i][j] = sum;
          }
      }
      return result;
  }
}
