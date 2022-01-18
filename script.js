
var price, eth, eur, gaseth, gaseur;
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
		input2el['placeholder'] = price.toFixed(2);


		calcgas();
		total();
	})
}

function ethupdate() {
	fetch('https://api.cryptonator.com/api/ticker/eth-eur').then(response =>{
    	return response.json();
	}).then(data =>{
		price = data.ticker.price;

		// console.log(price);

		calcgas();
		change();
	})
}
setInterval(ethupdate, 30000);

function change (e) {
	console.log("were changing");

	if (e.target == document.getElementById("firstin")) {
		eur = (e.target.value * price).toFixed(2);
		document.getElementById('secondin').value = eur;

	}
	else {
		eth = e.target.value / price;
		document.getElementById('firstin').value = eur;
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
	document.getElementById("gaspriceETH").innerHTML = "Ξ " + gas;
}

function switchinputs() {
	var input2 = document.getElementById("secondin").value;
	document.getElementById("secondin").value = document.getElementById("firstin").value;
	document.getElementById("firstin").value = input2;

	var select1 = document.getElementById("select1").value
	document.getElementById("select1").value = document.getElementById("select2").value;
	document.getElementById("select2").value = select1;
}

function total() {
	
	document.getElementById("totaleur").innerHTML = "&euro; " + (Number(eur) + Number(gaseur)).toFixed(2);
	document.getElementById("totaleth").innerHTML = "Ξ " + (Number(gaseth) + Number(eth));
	
}