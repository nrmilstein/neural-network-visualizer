import { DrawArea } from "./DrawArea.js";
import { NetworkLoader } from "./NetworkLoader.js";

$(document).ready(() => {
  let canvas = document.getElementById("drawArea");
  let drawArea = new DrawArea(canvas);

  let network;

  NetworkLoader.loadNetwork("network3.json")
    .then(loadedNetwork => {
      network = loadedNetwork;
      drawArea.onDraw(() => {
        let output = network.feedForward(drawArea.getX()).map(e => e[0]);
        let guess = argMax(output);
        $("#guess").text(guess);
      });
    });

  $("#clear").click(event => {
    drawArea.clear();
    $("#guess").text("");
  });
});


function argMax(array) {
  return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

