let unitType = "metric";

function getWeather(){
	document.querySelector(".weather-info").style.display = "block";
	const cityName = document.querySelector("input").value;

	$.ajax({
		url:
		`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=95d9d3a5000b4fbba32450cff464b5d7&units=${unitType}`,
		success: function(data){
			console.log(data);
			document.querySelector(".city-name").innerHTML = data.name;
			document.querySelector(".temp>span").innerHTML = Math.round(data.main.temp);
			document.querySelector(".description").innerHTML = data.weather[0].main;
			document.querySelector(".min").innerHTML = data.main.temp_min;
			document.querySelector(".max").innerHTML = data.main.temp_max;
			document.querySelector("#icon").innerHTML = "<img  class = 'bg-img' src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>";
			let time = data.dt;
			let sunrise = data.sys.sunrise;
			let sunset = data.sys.sunset;
			if(time>sunrise){
				document.querySelector("body").style.backgroundImage = "url(Day.png)";
			}
			if(time>sunset){
				document.querySelector("body").style.backgroundImage = "url(raat.png)";
			}

 },
 error: function(error){
 	alert(error.responseJSON.message);
 }
});

}

function toggle(e) {
	const isChecked = document.querySelector("#abc").checked;
	if(isChecked === false){ 
		unitType = "metric";
	} else { 
		unitType = "Imperial";
	}
	getWeather();	
}


let bgImgs = ["Day.png", "raat.png"];
function themeChanger(){
	setInterval(function(){
		let bgRound = parseInt(Math.random()*bgImgs.length);
		document.querySelector(".body1").style["background-image"] = `url(${bgImgs[bgRound]})`;
	},3000);
}
themeChanger();


