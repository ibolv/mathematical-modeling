
let y = x => x - Math.tan(x);

function halfDivMethod() {
  let a = 3.1, b = 4.7;
  let eps = 1.0e-7;
  let niter = 100;
  if ((y(a) * y(b)) > 0) console.log('Mistake a = ' + a + ' b = ' + b);
  else {
    for (let i = 0; i < niter; i++) {
      let xx = (a + b)/2;
      (y(a) * y(xx) < 0) ? b = xx : a = xx;
      //console.log('i=' + i + ' a=' + a + ' b=' + b + ' x=' + xx);
      let dx = b - a;
      if (Math.abs(dx) < eps) {
        let nev = y(xx);
        console.log('Решение x=' + xx + ' Невязка='+ nev + ' Число итераций=' + i);
        break;
      }
    }
  } 
}

halfDivMethod();


window.onload = () => {
    let scale = 50;
    let step = 1;
    let cnvs = document.querySelector('canvas');
    let ctx = cnvs.getContext('2d');
    
    ctx.lineWidth = 0.5;
    
    for (let i = step*scale; i < cnvs.width; i += step*scale) { //вертикальные
      polyline('#7a7979', [[i, 0], [i, cnvs.height]]);
    }
    
    for (let i = step*scale; i < cnvs.height; i += step*scale) { //Горизонтальные
      polyline('#7a7979', [[0, i], [cnvs.width, i]]);
    }

    for (let i = -cnvs.height; i < cnvs.height; i += step*scale) {
      polyline('green', [[4, cnvs.height - i]], (i)/scale - 4);
    }

    for (let i = 0; i < cnvs.width; i += step*scale) {
      polyline('green', [[cnvs.width - i, cnvs.height/2 + 11]], (cnvs.width - i)/scale);
    }

    
    ctx.lineWidth = 2;
    let pts = [];
    for(let x = 0; x<cnvs.width; x+=Math.PI/2) {
        pts.push([x, cnvs.height/2 - y(x/scale)*scale]);
    }
    polyline('blue', pts);
    
    //Ось X 
    polyline('red', [[0, cnvs.height / 2], [cnvs.width, cnvs.height / 2]]);
    
    // ось Y
    polyline('green', [[0, 0], [0, cnvs.height]]);
    
    function polyline(color, pts, text) {
      ctx.strokeStyle = color;
      if (text) {
        pts.forEach((p) => ctx.fillText(text + '', ...p));
      } else {
        ctx.beginPath();
        pts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p));
        ctx.stroke();
      }
    }
}
