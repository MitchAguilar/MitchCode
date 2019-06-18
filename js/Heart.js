window.onload = function() {
  var canvas = document.getElementById("canv");
  var ctx = canvas.getContext("2d");
  // Utilities
  function randomColor() {
    return '#' + Math.random().toString(16).slice(2, 8);
  }
  
  function randomWord() {
  var word = words[Math.floor(Math.random() * words.length)];
  return word;
}
  
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  //Make the canvas occupy the full page
  var W = window.innerWidth,
    H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  var particles = [];
  var mouse = {};
  //Lets create some particles now
  var particle_count = 100;
  for (var i = 0; i < particle_count; i++) {
    particles.push(new particle());
  }
  canvas.addEventListener('mousedown', track_mouse, false);
  canvas.addEventListener('touch', track_mouse, false);

  function track_mouse(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;

    for (var i = 0; i < particle_count; i++) {
      particles.push(new particle());
    }
  }

  function particle() {
    //speed, life, location, life, colors
    //speed range = -2.5 to 2.5
    this.speed = {
      x: -2.5 + Math.random() * 5,
      y: -2.5 + Math.random() * 5
    };
    //location = center of the screen
    if (mouse.x && mouse.y) {
      this.location = {
        x: mouse.x,
        y: mouse.y
      };
    } else {
      this.location = {
        x: W / 2,
        y: H / 2
      };
    }
    this.color = randomColor()

    this.font = {
      size: randomInt(3, 15)
    }
    
    this.word = randomWord()
  }

  function draw() {
    ctx.globalCompositeOperation = "source-over";
    //Painting the canvas black
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) {
        ctx.strokeStyle = 'rgb(0, ' + Math.floor(255 - 42.5 * i) + ', ' + 
                         Math.floor(255 - 42.5 * j) + ')';
        ctx.beginPath();
        ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
        ctx.stroke();
      }
    }
    //ctx.fillStyle = "black";
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.font = p.font.size + "vh Luckiest Guy";
      ctx.textAlign = "center";
      ctx.transition = "all 2s ease";
      ctx.fillStyle = p.color;
      ctx.fillText(p.word, p.location.x, p.location.y);
      ctx.fill();
      ctx.stroke();

      //lets move the particles
      p.location.x += p.speed.x;
      p.location.y += p.speed.y;
      
      p.speed.x += randomInt(-0.01, 0.01);
      p.speed.y += randomInt(-0.01, 0.01);
      
      // Make 'em big and small
      // Warning: Causes extreme lag
      //p.font.size += randomInt(-0.1, 0.1)
    }
  }
  setInterval(draw, 10);
};

// Big Word Array
words = [ "Eres","incre\u00cdble","Yuli","Te amo"];