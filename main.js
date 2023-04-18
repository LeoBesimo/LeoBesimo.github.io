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

    const p1 = [0.27];
    const p2 = [0.27, 0.23];
    const p3 = [0.27, 0.23, 0.19];

    percentages = nColors == 1 ? p1 : nColors == 2 ? p2 : p3;

    //let p = 1 / (nColors + 1) * f;

    let canv;

    let isRound = document.getElementById("is-round").value=="round";

    //colors.push(color(255,255));
    //colors.push(color(255,0,0,255));
    //colors.push(color(0,255,0,255));
    //colors.push(color(0,0,255,255));

    for(let i = 0; i < nColors; i++)
    {
        colors.push(color(map(i,0,nColors,0,191),255));
        //percentages.push(f - p * i);
    }

    strokeWeight(1);

    if(isRound)
    {
        canv = createCanvas(w,w);
        background(255);
        generateRound(canv);//, colors, percentages);
    }
    else
    {
        canv = createCanvas(w,h);
        background(255);
        generateRectangle(canv);//, colors, percentages);
    }

    //loadPixels();

    //console.log(pixels);

    //updatePixels();

    processImage(colors,percentages);

    //saveCanvas(date.toLocaleDateString(),'jpg');
}

function downloadPattern()
{
    let date = new Date(document.getElementById("date").value)
    saveCanvas(date.toLocaleDateString(),'jpg');
}

function generateRectangle(canv)//, colors, percentages)
{
    let xOff = 0;
    let yOff = 10000;

    loadPixels();
    for(let j = 0; j < canv.height; j++)
    {

        for(let i = 0; i < canv.width; i++)
        {
            let p = noise(xOff, yOff);
            /*let col = colors[0];
            for(let k = 1; k < percentages.length;k++)
            {
                if(p < percentages[k])
                {
                    col = colors[k]
                }
            }*/
            let col = p < 0.67 ? 255 : 0;
            let index = i + j * canv.width;
            stroke(col);
            fill(col);
            //point(i,j);
            set(i,j,col);
            //rect(i,j,1,1);
            //pixels[index] = color(col);
            xOff += 0.01;
            //console.log("Yeet");
        }
        //console.log("Xeet");
        yOff += 0.01;
    }

    updatePixels();
}

function generateRound(canv)//, colors, percentages)
{
    let xOff = 0;
    let yOff = 10000;

    loadPixels();

    let rad = canv.width / 2;

    for(let j = -rad; j < rad; j++)
    {
        for(let i = -rad; i < rad; i++)
        {
        
            let p = noise(xOff, yOff);
            /*let col = colors[0];
            for(let k = 1; k < percentages.length;k++)
            {
                if(p < percentages[k])
                {
                    col = colors[k]
                }
            }*/
            let col = p < 0.67 ? 255 : 0;

            //x * x + y * y < radius * radius + radius

            if(i * i + j * j < rad * rad + rad)
            {

                stroke(col);
                fill(col);
                //point(rad + i,rad + j);
                set(i,j,col);
                //rect(rad + i, rad + j,1,1);
                //pixels[index] = color(col);
            }
            xOff += 0.01;
            //console.log("Yeet");
        }
        //console.log("Xeet");
        yOff += 0.01;
    }

    updatePixels();
}

function processImage(colors, percentages)
{
    loadPixels();

    let previous = -1;

    let newCol = colors[floor(random(percentages.length))];
    //console.log(newCol);
    for(let j = 0; j < height; j++)
    {
        for(let i = 0; i < width; i++)
        {
            let index = i + j * width * 4;
            let currentCol = red(get(i,j));//calcColor(pixels[index], pixels[index+1], pixels[index+2], pixels[index+3]);
            //newCol = get(i,j);
            if(previous != currentCol)
            {
                newCol = colors[floor(random(percentages.length))];
            }
            if(currentCol == 255)//calcColor(255,255,255,255)) 
            {
                continue;
            }
            set(i,j,newCol);
            previous = currentCol;
        }
        //console.log("Yeet");
    }

    updatePixels();
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
