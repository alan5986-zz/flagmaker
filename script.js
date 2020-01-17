

var width = 600;
var height = 400;

var styles = ["horizontalBars", "verticalBars", "cross"]
var features = [true,false]

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
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function buildFlag(){

    var style = styles[Math.floor(Math.random()*styles.length)];
    var feature = features[Math.floor(Math.random()*features.length)];
    var colours = Math.floor(Math.random() * 3)+ 1;

    if(colours <3){
        feature = true;
    }

    flag = new Flag(style,feature,colours) 
    console.log(flag) 
    drawFlag(flag)
}


function drawFlag(flag){

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    style = flag.getStyle();
    colours = flag.getcolours();
    feature = flag.getFeature();

    //draw vertical flag
    if(style == "verticalBars"){
        if(colours == 1){
            ctx.fillStyle = getRandomColor();
            ctx.fillRect(0,0, width,height);
        } else {
            for(i=0; i < colours; i++){
                ctx.fillStyle = getRandomColor();
                ctx.fillRect(0,0, width/colours,height);
                ctx.fillStyle = getRandomColor();
                ctx.fillRect((width/colours)*i, 0, width/colours,height);
            }
        }
    }

    //draw horizontal flag
    if(style == "horizontalBars"){
        if(colours == 1){
            ctx.fillStyle = getRandomColor();
            ctx.fillRect(0,0, width,height);
        } else {
            for(i=0; i < colours; i++){
                ctx.fillStyle = getRandomColor();
                ctx.fillRect(0,0, width, height/colours);
                ctx.fillStyle = getRandomColor();
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

        drawFeature(feature)

    }
  
}

function drawFeature(feature){

    var canvas = document.getElementById("canvas");
    var canvas2 = document.getElementById("canvas2");
    var ctx = canvas.getContext("2d");
    var ctx2 = canvas2.getContext("2d");
    var centerX = width/2;
    var centerY = height/2;
    var radius = 120;
    
    
    var option = Math.floor((Math.random() * 28) + 1);
    var imgPath = "images/" + option + ".png";
    console.log(imgPath)
    var imgObj = new Image();

    

    imgObj.src = imgPath;
    imgObj.onload = function(){
        
        console.log("image loaded")
        ctx2.fillStyle = getRandomColor();
        ctx2.fillRect(0, 0, width, height);
        ctx2.globalCompositeOperation = "destination-in";
        ctx2.drawImage(imgObj,centerX-100,centerY-100,200,200);
        ctx.drawImage(canvas2,0,0)
 
    };   

}



buildFlag()
