
var price, previousprice, eth, eur, gaseth, gaseur;
window.onload = function() {
	const input1el = document.getElementById("firstin");
	const input2el = document.getElementById("secondin");
	const gweiin = document.getElementById("gwei");

	input1el.addEventListener("input", change);
	input2el.addEventListener("input", change);
	gweiin.addEventListener("input", calcgas);

	document.getElementById("select1").value = "eth";
	document.getElementById("select2").value = "eur";
	document.getElementById("gwei").value = 100;

	input1el.value = 1;

	eth = 1;
	// calcgas();

	fetch('https://api.cryptonator.com/api/ticker/eth-eur').then(response =>{
    	return response.json();
	}).then(data =>{
		price = data.ticker.price;
		eur = price;
		input1el['placeholder'] = eth;
		input2el['placeholder'] = price;


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
		change();
	})
}
setInterval(ethupdate, 5000);

//meant for updating the price calculation
function change () {
	console.log("were changing");
	
	if (document.getElementById("firstin").value != eth) {
		eth = document.getElementById("firstin").value
		eur = (eth * price).toFixed(2);
		document.getElementById('secondin').value = eur;
	}
	else if (document.getElementById("secondin").value != eur) {
		eth = eur / price;
		document.getElementById('firstin').value = eth;
	}
	else {
		previousprice = price;
	}
	total();
}

function calcgas() {
	console.log("we out here calcing gas");

    var gwei = Number(document.getElementById('gwei').value);
	var gas = (gwei * 200000 / (10**9));

	gaseur = (gas * price).toFixed(2);
	gaseth = gas;

	document.getElementById("gasprice").innerHTML = "&euro; " + gaseur;
	document.getElementById("gaspriceETH").innerHTML = "Ξ " + gaseth;
	total();
}

function switchinputs() {
	// var input2 = document.getElementById("secondin").value;
	// document.getElementById("secondin").value = document.getElementById("firstin").value;
	// document.getElementById("firstin").value = input2;

	// var select1 = document.getElementById("select1").value
	// document.getElementById("select1").value = document.getElementById("select2").value;
	// document.getElementById("select2").value = select1;
}

function total() {
	console.log("calcing tottaaalall")
	document.getElementById("totaleur").innerHTML = "&euro; " + (Number(eur) + Number(gaseur)).toFixed(2);
	document.getElementById("totaleth").innerHTML = "Ξ " + (Number(gaseth) + Number(eth));
	// console.log(gaseth + eth)
}