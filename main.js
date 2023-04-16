function generateImage(){
    let date = new Date(document.getElementById("date").value)
    let nColors = floor(document.getElementById("col-sel").value);
    let seed = date.getTime();
    let w = document.getElementById("width").value;
    let h = document.getElementById("height").value;
    noiseSeed(seed);

    let colors = [];
    let percentages = [];

    const f1 = 0.66;
    const f2 = 0.60;
    const f3 = 0.5;

    const p1 = [1, 0.3];
    const p2 = [1, 0.3, 0.25];
    const p3 = [1, 0.3, 0.25, 0.15];

    let f = nColors == 1 ? f1 : nColors == 2 ? f2 : f3;
    percentages = nColors == 1 ? p1 : nColors == 2 ? p2 : p3;

    //let p = 1 / (nColors + 1) * f;

    let canv;

    let isRound = document.getElementById("is-round").value=="round";

    for(let i = 0; i < nColors + 1; i++)
    {
        colors.push(color(map(i,0,nColors,255,0),255));
        //percentages.push(f - p * i);
    }

    strokeWeight(1);

    if(isRound)
    {
        canv = createCanvas(w,w);
        background(255);
        generateRound(canv, colors, percentages);
    }
    else
    {
        canv = createCanvas(w,h);
        background(255);
        generateRectangle(canv, colors, percentages);
    }

    //saveCanvas(date.toLocaleDateString(),'jpg');
}

function downloadPattern()
{
    let date = new Date(document.getElementById("date").value)
    saveCanvas(date.toLocaleDateString(),'jpg');
}

function generateRectangle(canv, colors, percentages)
{
    let xOff = 0;
    let yOff = 10000;

    //loadPixels();
    for(let j = 0; j < canv.height; j++)
    {

        for(let i = 0; i < canv.width; i++)
        {
            let p = noise(xOff, yOff);
            let col = colors[0];
            for(let k = 1; k < percentages.length;k++)
            {
                if(p < percentages[k])
                {
                    col = colors[k]
                }
            }
            //let col = p < 0.67 ? 255 : 0;
            let index = i + j * canv.width;
            stroke(col);
            fill(col);
            //point(i,j);
            rect(i,j,1,1);
            //pixels[index] = color(col);
            xOff += 0.01;
            //console.log("Yeet");
        }
        //console.log("Xeet");
        yOff += 0.01;
    }

    //updatePixels();
}

function generateRound(canv, colors, percentages)
{
    let xOff = 0;
    let yOff = 10000;

    //loadPixels();

    let rad = canv.width / 2;

    for(let j = -rad; j < rad; j++)
    {
        for(let i = -rad; i < rad; i++)
        {
        
            let p = noise(xOff, yOff);
            let col = colors[0];
            for(let k = 1; k < percentages.length;k++)
            {
                if(p < percentages[k])
                {
                    col = colors[k]
                }
            }

            //x * x + y * y < radius * radius + radius

            if(i * i + j * j < rad * rad + rad)
            {

                stroke(col);
                fill(col);
                //point(rad + i,rad + j);
                rect(rad + i, rad + j,1,1);
                //pixels[index] = color(col);
            }
            xOff += 0.01;
            //console.log("Yeet");
        }
        //console.log("Xeet");
        yOff += 0.01;
    }
}

function draw()
{
    if(document.getElementById("is-round").value=="round")
    {
        document.getElementById("height").style.visibility = 'hidden';
    }
    else
    {
        document.getElementById("height").style.visibility = 'visible';
    }
}
