function loadItems() {
  return fetch('data/data.json')
    .then((res) => res.json())
    .then((json) => json.items);
}

function displayItems(items) {
  const container = document.querySelector('.items');

  container.innerHTML = items.map((item) => createHTMLstring(item)).join('');
}

function updateItems(list, key, value) {
  list.forEach((item) => {
    if (item.dataset[key] === value) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

function createHTMLstring(item) {
  return `
    <li class="item" data-type="${item.type}" data-color="${item.color}">
      <img src="${item.image}" alt="${item.type}, ${item.color}" class="item_thumbnail" />
      <span class="item_description">${item.gender}, ${item.size}</span>
    </li>
  `;
}

function onButtonClick(e) {
  const dataset = e.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (!key || !value) {
    return;
  }

  const list = document.querySelectorAll('.item');
  updateItems(list, key, value);
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');

  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', onButtonClick);
}

loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
