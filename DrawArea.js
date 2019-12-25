class DrawArea {
  constructor(canvas) {
    this._onDrawCallback = () => {};

    this._canvas = canvas;
    paper.setup(canvas);
    paper.view.draw();

    let width = paper.view.viewSize.width, height = paper.view.viewSize.height;
    let backgroundRect = new paper.Rectangle(
      new paper.Point(0, 0),
      new paper.Point(width, height)
    );
    let background = new paper.Path.Rectangle(backgroundRect);
    background.fillColor = 'white';
    background.sendToBack();


    this._paths = [];

    let path;
    let that = this;
    paper.view.onMouseDown = function(event) {
      path = new paper.Path();
      that._paths.push(path);
      path.strokeWidth = 40;
      path.strokeCap = "round";
      path.add(event.point);
      path.strokeColor = 'black';
      that._onDrawCallback();
    }

    paper.view.onMouseDrag = function(event) {
      path.add(event.point);
      that._onDrawCallback();
    }
  }

  clear () {
    for (let path of this._paths) {
      path.remove();
    }
  }

  onDraw(callback) {
    this._onDrawCallback = callback;
  }

  getPgm() {
    let x = this.getX().map(e => Math.floor(e * 255).toString()).join(" ");
    return "P2\n28 28\n255\n" + x;
  }

  getX() {
    let canvas = this._canvas;
    let context = canvas.getContext("2d");
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;

    let pixels = Array(canvas.height).fill(0).map(e => Array(canvas.width));
    for (let i = 0; i < imageData.length; i += 4) {
      pixels[Math.floor(i / (4 * canvas.width))][(i / 4) % canvas.width] = imageData[i];
    }

    let xGrid = Array(28).fill(0).map(e => Array(28));
    let cellWidth = Math.floor(canvas.width / 28);
    let cellHeight = Math.floor(canvas.height / 28);

    for (let i = 0; i < 28; i++) {
      for (let j = 0; j < 28; j++) {
        let cellIntensitySum = 0;
        for (let x = i * cellWidth; x < (i + 1) * cellWidth; x++) {
          for (let y = j * cellHeight; y < (j + 1) * cellHeight; y++) {
            cellIntensitySum += pixels[x][y];
          }
        }
        let cellIntensityAverage = cellIntensitySum / (cellWidth * cellHeight);
        xGrid[i][j] = 1.0 - (cellIntensityAverage / 255.0);
      }
    }
    return xGrid.flat();
  }
}
