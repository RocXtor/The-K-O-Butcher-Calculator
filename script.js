
function toggleRole() {
  const role = document.getElementById("userRole").value;
  const managerFields = document.querySelectorAll(".manager-only");
  managerFields.forEach(el => {
    el.style.display = (role === "manager") ? "block" : "none";
  });
}

function calculate() {
  const beef = parseFloat(document.getElementById("beef").value) || 0;
  const hearts = parseFloat(document.getElementById("hearts").value) || 0;
  const trayWeight = parseFloat(document.getElementById("trayWeight").value) || 0.35;
  const pricePerTray = parseFloat(document.getElementById("pricePerTray").value) || 0;

  const priceBeef = parseFloat(document.getElementById("priceBeef").value) || 0;
  const priceHearts = parseFloat(document.getElementById("priceHearts").value) || 0;
  const priceSoya = parseFloat(document.getElementById("priceSoya").value) || 0;
  const priceWater = parseFloat(document.getElementById("priceWater").value) || 0;
  const priceFat = parseFloat(document.getElementById("priceFat").value) || 0;
  const priceSpices = parseFloat(document.getElementById("priceSpices").value) || 0;

  const meatTotal = beef + hearts;
  const meatPercent = 0.55;
  const totalBatch = meatTotal / meatPercent;

  const ingredients = {
    Beef: { qty: beef, price: priceBeef },
    Hearts: { qty: hearts, price: priceHearts },
    Soya: { qty: totalBatch * 0.25, price: priceSoya },
    Water: { qty: totalBatch * 0.10, price: priceWater },
    Fat: { qty: totalBatch * 0.06, price: priceFat },
    Spices: { qty: totalBatch * 0.04, price: priceSpices }
  };

  let table = "<table><tr><th>Ingredient</th><th>Qty (kg)</th><th>Cost (M)</th></tr>";
  let totalCost = 0;

  for (let key in ingredients) {
    const ing = ingredients[key];
    const cost = ing.qty * ing.price;
    table += `<tr><td>${key}</td><td>${ing.qty.toFixed(2)}</td><td>${cost.toFixed(2)}</td></tr>`;
    totalCost += cost;
  }

  const totalTrays = totalBatch / trayWeight;
  const totalSales = pricePerTray * totalTrays;
  const profit = totalSales - totalCost;

  table += `</table><br><strong>Total Batch:</strong> ${totalBatch.toFixed(2)} kg<br>`;
  table += `<strong>Total Trays:</strong> ${Math.floor(totalTrays)}<br>`;
  table += `<strong>Total Cost:</strong> M${totalCost.toFixed(2)}<br>`;
  table += `<strong>Total Sales:</strong> M${totalSales.toFixed(2)}<br>`;
  table += `<strong>Profit:</strong> M${profit.toFixed(2)}<br>`;

  document.getElementById("results").innerHTML = table;
}

function saveBatch() {
  const batchData = {
    beef: document.getElementById("beef").value,
    hearts: document.getElementById("hearts").value,
    trayWeight: document.getElementById("trayWeight").value,
    pricePerTray: document.getElementById("pricePerTray").value,
    prices: {
      beef: document.getElementById("priceBeef").value,
      hearts: document.getElementById("priceHearts").value,
      soya: document.getElementById("priceSoya").value,
      water: document.getElementById("priceWater").value,
      fat: document.getElementById("priceFat").value,
      spices: document.getElementById("priceSpices").value
    }
  };
  localStorage.setItem("lastBatch", JSON.stringify(batchData));
  alert("Batch saved!");
}

function loadBatch() {
  const data = JSON.parse(localStorage.getItem("lastBatch"));
  if (!data) return alert("No saved batch found.");
  document.getElementById("beef").value = data.beef;
  document.getElementById("hearts").value = data.hearts;
  document.getElementById("trayWeight").value = data.trayWeight;
  document.getElementById("pricePerTray").value = data.pricePerTray;

  document.getElementById("priceBeef").value = data.prices.beef;
  document.getElementById("priceHearts").value = data.prices.hearts;
  document.getElementById("priceSoya").value = data.prices.soya;
  document.getElementById("priceWater").value = data.prices.water;
  document.getElementById("priceFat").value = data.prices.fat;
  document.getElementById("priceSpices").value = data.prices.spices;

  alert("Batch loaded!");
}

function generatePDF() {
  alert("PDF Export feature will be added in next version.");
}

window.onload = toggleRole;
