var width = 600;
var height = 400;
var styles = ["horizontalBars", "verticalBars", "cross"]
var features = [true,false]
var flagColours = ["e0201b","a22b2b","b1793a","25369d","eeede9","4690c9","100e10","3d9139","626051","f5d126","ffffff","e6194B","3cb44b","ffe119","4363d8","f58231","42d4f4","469990","800000","aaffc3","000075"]
var usedColours = []

class Flag{
    constructor(style,feature,colours){
        this.style = style;
        this.feature = feature;
        this.colours = colours;
    }

    getStyle(){
        return this.style;
    }

    getFeature(){
        return this.feature;
    }

    getcolours(){
        return this.colours;
    }
}

function getRandomColor() {
    var colour = flagColours[Math.floor(Math.random()*flagColours.length)]
    return "#" + colour;
}

function buildFlag(){

    var style = styles[Math.floor(Math.random()*styles.length)];
    var feature = features[Math.floor(Math.random()*features.length)];
    var colours = Math.floor(Math.random() * 3)+ 1;

    if(colours <3){
        feature = true;
    }

    flag = new Flag(style,feature,colours) 
    drawFlag(flag)
}


function drawFlag(flag){

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    style = flag.getStyle();
    colours = flag.getcolours();
    feature = flag.getFeature();
    usedColours = []
    

    //draw vertical flag
    if(style == "verticalBars"){
        if(colours == 1){
            c = getRandomColor();
            usedColours.push(c)
            ctx.fillStyle = c;
            ctx.fillRect(0,0, width,height);
        } else {
            for(i=0; i < colours; i++){
                c = getRandomColor();
                usedColours.push(c)
                ctx.fillStyle = c;
                ctx.fillRect(0,0, width/colours,height);
                c2 = getRandomColor();
                usedColours.push(c2)
                ctx.fillStyle = c2;
                ctx.fillRect((width/colours)*i, 0, width/colours,height);
            }

            if(colours == 3){
                usedColours = [];
  
            }
        }
    }

    //draw horizontal flag
    if(style == "horizontalBars"){
        if(colours == 1){
            c = getRandomColor();
            usedColours.push(c)
            ctx.fillStyle = c;
            ctx.fillRect(0,0, width,height);
        } else {
            for(i=0; i < colours; i++){
                c = getRandomColor();
                usedColours.push(c)
                ctx.fillStyle = c;
                ctx.fillRect(0,0, width, height/colours);
                c2 = getRandomColor();
                usedColours.push(c2)
                ctx.fillStyle = c2;
                ctx.fillRect(0, (height/colours)*i, width, height/colours);
            }
        }
    }

    if(style == "cross"){

        ctx.fillStyle = getRandomColor();
        ctx.fillRect(0, 0, width, height);

        ctx.beginPath();  
        ctx.rect(0, height/3,  width, height/3);
        ctx.fillStyle = getRandomColor();
        ctx.fill();

        ctx.beginPath();  
        ctx.rect(225 , 0, 150,height);
        ctx.fill();

    }

    //draw feature
    if(feature){

        drawFeature()

    }
  
}

function drawFeature(){

    var canvas = document.getElementById("canvas");
    var canvas2 = document.getElementById("canvas2");
    var ctx = canvas.getContext("2d");
    var ctx2 = canvas2.getContext("2d");
    var centerX = width/2;
    var centerY = height/2;
    var radius = 120;
    var option = Math.floor((Math.random() * 38) + 1);
    var imgPath = "images/" + option + ".png";
    var img = new Image();

    img.src = imgPath;
    img.onload = function(){
        
        ogWidth = img.naturalWidth;
        ogHeight = img.naturalHeight;
        newHeight = 180;

        reduction = newHeight/ogHeight
        newWidth = ogWidth*reduction
        c = getRandomColor();
        
        while(usedColours.includes(c)){
            c = getRandomColor();       
        } 

        ctx2.fillStyle = c
        ctx2.fillRect(0, 0, width, height);
        ctx2.globalCompositeOperation = "destination-in";
        ctx2.drawImage(img,centerX-(newWidth/2),centerY-(newHeight/2),newWidth,newHeight);
        ctx.drawImage(canvas2,0,0)
    };   

}
buildFlag()
