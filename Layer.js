export class Layer {
  _relu(z) {
    return Math.max(0, z);
  }

  // maps `func` over matrix `m`
  _mapM(m, func) {
    let result = this._createNDArray([m.length, m[0].length]);
    for (let i = 0; i < m.length; i++) {
      for (let j = 0; j < m[0].length; j++) {
        result[i][j] = func(m[i][j]);
      }
    }
    return result;
  }

  _colMapM(m, func) {
    return this._transposeM(this._transposeM(m).map(func));
  }

  _transposeM(m) {
    let result = this._createNDArray([m[0].length, m.length]);
    for (let i = 0; i < m.length; i++) {
      for (let j = 0; j < m[0].length; j++) {
        result[j][i] = m[i][j];
      }
    }
    return result;
  }

  _binaryMap(v1, v2, func) {
    let result = Array(v1.length);
    for (let i = 0; i < v1.length; i++) {
      result[i] = func(v1[i], v2[i]);
    }
    return result;
  }

  // pairwise feeds each element of `m1` and `m2` into `func` and returns
  // a matrix of the same shape with the results.
  _binaryMapM(m1, m2, func) {
    let result = this._createNDArray([m1.length, m1[0].length]);
    for (let i = 0; i < m1.length; i++) {
      for (let j = 0; j < m1[0].length; j++) {
        result[i][j] = func(m1[i][j], m2[i][j]);
      }
    }
    return result;
  }

  // Adds matrices `m1` and `m2` and returns the result
  _addM(m1, m2) {
    let result = this._createNDArray([m1.length, m1[0].length]);
    for (let i = 0; i < m1.length; i++) {
      for (let j = 0; j < m1[0].length; j++) {
        result[i][j] = m1[i][j] + m2[i][j];
      }
    }
    return result;
  }

  // Multiplies matrix `m1` and `m2`.
  _dotM(m1, m2) {
    let result = this._createNDArray([m1.length, m2[0].length]);
    for (let i = 0; i < m1.length; i++) {
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

  // Multiplies matrix `m1` and `m2`, using the binary function `binaryFunction`
  // instead of the normal scalar product (*) function
  _dotMWith(m1, m2, sumFunc, productFunc) {
    let result = this._createNDArray([m1.length, m2[0].length]);
    for (let i = 0; i < m1.length; i++) {
      for (let j = 0; j < m2[0].length; j++) {
        let sum = productFunc(m1[i][0], m2[0][j]);
        for (let k = 1; k < m1[0].length; k++) {
          sum = sumFunc(sum, productFunc(m1[i][k], m2[k][j]));
        }
        result[i][j] = sum;
      }
    }
    return result;
  }

  // creates an n-dimensional array of undefined values. `shape` is an array of
  // lengths for each dimension.
  _createNDArray(shape) {
    if (shape.length == 1) {
      return Array(shape[0]);
    }
    return this._mapNewArray(shape[0], e => {
      return this._createNDArray(shape.slice(1));
    });
  }

  _mapNewArray(size, mapFunction) {
    return Array(size).fill(0).map(mapFunction);
  }
}
