const getEl = (elem) => document.querySelector(elem);

const form = getEl(".form");
const btnReset = getEl(".btn-reset");
const list = getEl(".list");
const input = getEl("input");
const resultSection = getEl("result");

const voltageSupplyInput = getEl(".voltage-supply");
const resistanceSupplyInput = getEl(".resistance-supply");
const resistanceLoadInput = getEl(".resistance-load");
const powerOutputInput = getEl(".power-output");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // This function calculates power of supply
  let resultPowerSup = calcPowerSupply(
    voltageSupplyInput.value,
    resistanceSupplyInput.value
  );

  // This function calculates power of factor
  let resultPowerFact = calcPowerFactor(powerOutputInput.value, resultPowerSup);

  // This function calculates current-load
  let resultCurrentLoad = calcCurrentLoad(
    powerOutputInput.value,
    resistanceLoadInput.value
  );

  // This function calculates voltage-load
  let resultVoltageLoad = calcVoltageLoad(
    resultCurrentLoad,
    resistanceLoadInput.value
  );

  let finallyResult = `
  <li>P<sub>man</sub> = ${resultPowerSup} Wt</li>
  <li>K<sub>p</sub> = ${resultPowerFact}</li>
  <li>I<sub>yuk</sub> = ${resultCurrentLoad} A</li>
  <li>U<sub>yuk</sub> = ${resultVoltageLoad} V</li>
  `;

  list.innerHTML = finallyResult;
  resultSection.append(list);
});

const calcPowerSupply = (volt, resist) => {
  return (Math.pow(+volt, 2) / +resist).toExponential();
};

const calcPowerFactor = (powerOut, powerSup) => {
  return (+(+powerOut / +powerSup).toFixed(0)).toExponential();
};

const calcCurrentLoad = (powerOut, resistLoad) => {
  return Math.sqrt(+powerOut / +resistLoad).toFixed(3);
};

const calcVoltageLoad = (currentLoad, resistLoad) => {
  return (+currentLoad * +resistLoad).toFixed(3);
};

btnReset.addEventListener("click", () => form.reset());
