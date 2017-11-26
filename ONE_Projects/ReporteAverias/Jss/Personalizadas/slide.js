function change(x,item)
{
	document.getElementById("current").id = "";
	item.id = "current";
	if((x * (-1))<(getElementPosition("elementos").left - 10)){
		distance = (x + getElementPosition("elementos").left) / 5;
		start = getElementPosition("elementos").left;
		for(i=0; i<=distance; i++){
			setTimeout("document.getElementById(\"elementos\").style.margin = \"0 -" + ((start * (-1)) + (i*5)) + "px\"", i*5);
			if(i==distance){
				setTimeout("document.getElementById(\"elementos\").style.margin = \"0 -" + x + "px\"", i*5);
			}
		}
	}else if((x * (-1))>(getElementPosition("elementos").left)){ 
		distance = ((x + getElementPosition("elementos").left) / 5)  * (-1);
		start = getElementPosition("elementos").left;		
		for(i=0; i<=distance; i++){
			setTimeout("document.getElementById(\"elementos\").style.margin = \"0 -" + ((start * (-1)) - (i*5)) + "px\"", i*5);
			if(i==distance)
				setTimeout("document.getElementById(\"elementos\").style.margin = \"0 -" + x + "px\"", i*5);
		}
	}
}

function getElementPosition(object){
	var position = new Object;
	position.left = parseInt(document.getElementById(object).style.marginLeft)
	position.top = parseInt(document.getElementById(object).style.marginTop)
	return position;
}