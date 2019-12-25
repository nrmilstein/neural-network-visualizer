class NetworkLoader {
  static loadNetwork(filename) {
    return $.getJSON(filename)
      .then(json => {
        return new Network(json.biases, json.weights);
      })
      .fail(() => {
        console.log("error: loadNetwork: could not load JSON network from " + filename);
      });
  }
}
