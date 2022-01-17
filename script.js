
var price;
window.onload = function() {
	const input1el = document.getElementById("firstin");
	const input2el = document.getElementById("secondin");
	const gweiin = document.getElementById("gwei");

	input1el.addEventListener("input", change);
	input2el.addEventListener("input", change);
	gweiin.addEventListener("input", calcgas);
	document.getElementById("select1").value = "eth";
	document.getElementById("select2").value = "eur";
	// switchinputs();

	fetch('https://api.cryptonator.com/api/ticker/eth-eur').then(response =>{
    	return response.json();
	}).then(data =>{
		price = data.ticker.price;
		input1el['placeholder'] = "1";
		input2el['placeholder'] = price;
		console.log(price);
		calcgas();
	})
}

function ethupdate() {
	fetch('https://api.cryptonator.com/api/ticker/eth-eur').then(response =>{
    	return response.json();
	}).then(data =>{
		price = data.ticker.price;
		console.log(price);
		calcgas();
		// change();
	})
}
setInterval(ethupdate, 30000);

function change (e) {
	console.log("were changing");

	if (e.target == document.getElementById("firstin")) {
		document.getElementById('secondin').value = (e.target.value * price).toFixed(2);
	}
	else {
		document.getElementById('firstin').value = e.target.value / price;
	}
}

function calcgas() {
	console.log("we out here calcing gas");

    var gwei = Number(document.getElementById('gwei').value);
	var eth = (gwei * 200000 / (10**9));

	document.getElementById("gasprice").innerHTML = "&euro; " + (eth * Number(price)).toFixed(2);
	document.getElementById("gaspriceETH").innerHTML = "Ξ " + eth;
}

//doesnt work
function switchinputs() {
	var input2 = document.getElementById("secondin").value;
	// console.log("were switching");
	// console.log(input2)
	document.getElementById("secondin").value = document.getElementById("firstin").value;
	document.getElementById("firstin").value = input2;

	var select1 = document.getElementById("select1").value
	document.getElementById("select1").value = document.getElementById("select2").value;
	document.getElementById("select2").value = select1;
}