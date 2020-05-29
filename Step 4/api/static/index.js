
// this is for filling the city select box
let city_select = document.getElementById("city-select");

// put the cities names in this array
let cities = ["a","b","c","d"];

for (let city of cities) {
    let option = document.createElement("option");
    option.text = city;
    city_select.add(option); 
}
// ============================================================================

// this is for sending the request to the server
async function submit() {
  // Collection user data

  /* 
    let data = {};
    let inputs = document.getElementsByClassName("form-control");
    for (input of inputs) {
      datas[input.id] = input.value;
    }
 */

    let data = {};
    let inputs = ["category","area(m�)","room","bedroom","swimming_pool"]
    for (let input of inputs) {
        let val = document.getElementById(input).value;
        data[input] = val;
    }

//===========================================================================
// ajax to send the request
    fetch("/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(response => document.getElementById("prediction").innerHTML = response.prediction);
}