window.onmousemove = function(event){
	var b = event.clientY;
	let h = window.innerHeight;
	if (b > (500))
	{
	  window.scrollBy(0,10);
	} else if (b < 300){
    window.scrollBy(0,-10);      
  }
};