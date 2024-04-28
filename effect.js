class Effect {
  constructor(canvas, video) {
    this.canvas = canvas;
    this.video = video;
    this.ctx = canvas.getContext("2d");
    this.#animate();

    this.pinwheel = new Pinwheel();

    console.log(this);
  }

  #animate() {
    const { ctx, canvas, video } = this;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const locs = getLocationWithColor(imgData, { r: 0, g: 0, b: 255 });

    if (locs.length > 0) {
      const center = average(locs);
      const size = Math.sqrt(locs.length) * 5;
      // ctx.beginPath();
      // ctx.fillStyle = "red";
      // ctx.arc(center.x, center.y, 5, 0, Math.PI * 2);
      // ctx.fill();

      this.pinwheel.update(ctx, center, size);
    }

    requestAnimationFrame(this.#animate.bind(this));
  }
}
