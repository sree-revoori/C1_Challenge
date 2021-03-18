var da, aa, id, od, curr;
var prices = []

function process() {
  prices = [];
  da = document.getElementById("l1").value;
  aa = document.getElementById("l2").value;
  od = document.getElementById("l3").value;
  id = document.getElementById("l4").value;
  curr = document.getElementById("l5").value;
  console.log(da, aa, od, id, curr);
  fetch();
}
function fetch() {
  const data = null;
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.open(
    "GET",
    "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/" +
      curr +
      "/en-US/" +
      da +
      "-sky/" +
      aa +
      "-sky/" +
      od
  );
  xhr.setRequestHeader(
    "x-rapidapi-key",
    "61b462a482msh47182fa8dc9c13dp187191jsn724ee5c0d00d"
  );
  xhr.setRequestHeader(
    "x-rapidapi-host",
    "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
  );
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      var j = JSON.parse(this.responseText);
      var hashmap = {};
      for (var u in j.Carriers) {
        hashmap[j.Carriers[u]["CarrierId"]] = j.Carriers[u]["Name"];
      }
      for (var k in j.Quotes) {
        prices.push([
          j.Quotes[k],
          hashmap[j.Quotes[k].OutboundLeg.CarrierIds[0]]
        ]);
      }
      showResults();
    }
  });
  xhr.send(data);
}
function showResults() {
  var minIndex = 0;
  var minCost = 1000000;
  for (var x = 0; x < prices.length; x++) {
    if (prices[x][0].minPrice < minCost) {
      minCost = prices[0][x].minPrince;
      minIndex = x;
    }
  }
  var displayString = "<br>";
  for (var i = 0; i < prices.length; i++) {
    if (i == minIndex) {
      displayString += "Best Price-> ";
    }
    var cost = prices[i][0].MinPrice;
    displayString += curr + " " + cost + " with " + prices[i][1] + "<br>";
    displayString += "<br>";
  }
  var res = document.getElementById("results");
  res.innerHTML = displayString;
}
