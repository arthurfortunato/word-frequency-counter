function analyze() {
  if (document.querySelector('table')) document.querySelector('table').remove();
  let text = document.querySelector('.pasteText').value;
  let rows = text.split('\n').map( (str) => str.split(' '));

  function concat_array(array) {
    return array.reduce( (new_array, item) => new_array.concat( Array.isArray(item) ? concat_array(item) : item), []);
  }

  document.querySelector('.countWords').insertAdjacentHTML('afterend', `
    <table>
      <tr>
        <th>Palavra</th>
        <th>Quantidade</th>
      </tr>
    </table>`)

  let words = concat_array(rows);
  let map = new Map();
  for (let word of words) {
    let n_word = word.replace(/[?.!,"\(\)]/g, "").replace(/[ ]{2,}/g, "").trim().toLowerCase();
    if (!(map.has(n_word))) map.set(n_word, 1);
    else {
      let count = map.get(n_word);
      ++count;
      map.set(n_word, count);
    }
  }

  for (let [word, count] of Array.from(map.entries()).sort( (a, b) => b[1]-a[1])) {
    document.querySelector('table').insertAdjacentHTML('beforeend', `
    <tr>
      <td>${word}</td>
      <td>${count}</td>
    </tr>`);
  }
}