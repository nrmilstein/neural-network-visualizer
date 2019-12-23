$(document).ready(() => {
  let network = DefaultNetwork.getDefaultNetwork();

  let canvas = document.getElementById("drawArea");
  drawArea = new DrawArea(canvas);
  drawArea.onDraw(() => {
    let output = network.feedForward(drawArea.getX()).map(e => e[0]);
    let guess = argMax(output);
    $("#guess").text(guess);
  });

  $("#clear").click(event => {
    drawArea.clear();
    $("#guess").text("");
  });
});


function argMax(array) {
  return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}


