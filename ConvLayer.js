import { Layer } from "./Layer.js";

export class ConvLayer extends Layer {
  // `weights` must be a weight matrix. Each row is an output layer, each column
  // an input layer, and each entry a 2D filter.
  // `biases` must be a column vector of biases.
  constructor(weights, biases, activationFunction) {
    super();
    this._weights = weights;
    this._biases = biases;
    if (activationFunction == "ReLU") {
      this._activationFunction = this._relu;
    }
  }

  // input must be a column vector of 2-dimensional input matrices
  feedForwardM(input) {
    let weights = this._weights, biases = this._biases;

    // convolve with weights
    let sumFunc = (a, b) => this._addM(a, b);
    let productFunc = (filter, input) => this._conv2D(filter, input);
    let convolvedInput = this._dotMWith(weights, input, sumFunc, productFunc);

    // add the biases
    let biasedInput = this._binaryMap(convolvedInput, biases,
        (convolvedInputRow, biasesRow) => {
          return convolvedInputRow.map(img => this._mapM(img, e => e + biasesRow[0]));
        }
    );

    // apply the activation function
    let output = this._mapM(biasedInput, img => {
      return this._mapM(img, e => this._activationFunction(e));
    });

    return output;
  }

  _conv2D(filter, input) {
    let inputHeight = input.length;
    let inputWidth = input[0].length;

    let filterHeight = filter.length;
    let filterWidth = filter[0].length;

    let outputHeight = inputHeight - filterHeight + 1;
    let outputWidth = inputWidth - filterWidth + 1;

    let output = this._createNDArray([outputHeight, outputWidth]);

    for (let i = 0; i < outputHeight; i++) {
      for (let j = 0; j < outputWidth; j++) {
        let sum = 0;
        for (let filterI = 0; filterI < filterHeight; filterI++) {
          for (let filterJ = 0; filterJ < filterWidth; filterJ++) {
            sum += input[i + filterI][j + filterJ] * filter[filterI][filterJ];
          }
        }
        output[i][j] = sum;
      }
    }
    return output;
  }
}
