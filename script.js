const getUserInput = () => document.querySelector(".pasteText").value;
const printInput = input =>
  (document.getElementById("output").innerHTML = input);
  
const clearInput = str =>
  str
    .replace(/[?.!,"\(\)]/g, "")
    .replace(/[ ]{2,}/g, "")
    .trim()
    .toLowerCase();

const wordFrequency = string =>
  string
    .split(/\s/)
    .reduce(
      (output, word) =>
        Object.assign(output, { [word]: output[word] ? output[word] + 1 : 1 }),
      {}
    );

const sortByValue = obj =>
  Object.entries(obj)
    .map(currentValue => [currentValue[1], currentValue[0]])
    .sort((a, b) => parseInt(b) - parseInt(a))
    .map((currentValue, index) => [
      index + 1,
      currentValue[0],
      currentValue[1]
    ]);

const divFrequency = "wordTable";
const headerFrequency = ["Rank", "Count", "Word"];

const addTable = (divId, headers, data) => {
  const wordTable = document.getElementById(divId);
  const table = document.createElement("table");

  //TABLE Headers
  const tr = document.createElement("tr");
  table.appendChild(tr);
  headers.forEach(currentValue => {
    const th = document.createElement("th");
    th.appendChild(document.createTextNode(currentValue));
    tr.appendChild(th);
  });

  //TABLE ROWS
  data.forEach(currentValue => {
    const tr = document.createElement("tr");
    currentValue.forEach(currentValue => {
      const td = document.createElement("td");
      td.appendChild(document.createTextNode(currentValue));
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  wordTable.appendChild(table);
};

const processData = () => {
  const sortedFrequency = sortByValue(wordFrequency(clearInput(getUserInput())));
  document.getElementById("wordTable").innerHTML = "";
  addTable(divFrequency, headerFrequency, sortedFrequency);
};

$(document).ready(function () {
  $("#countWords").on("click", processData);
});
