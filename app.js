'use strict';

// ************************* Global Variables *************************
let myContainer = document.getElementById('container');

let showResultsbBtn = document.getElementById('show-results-btn');

let imageOne = document.getElementById('img-one');
let imageTwo = document.getElementById('img-two');
let imageThree = document.getElementById('img-three');

const productArray = [];
let maxVotes = 25;
console.log(productArray);

// Constructor Function

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.votes = 0;
  productArray.push(this);
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

function getRandomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

function renderProductImages() {
  let productOneIndex = getRandomIndex();
  let productTwoIndex = getRandomIndex();
  let productThreeIndex = getRandomIndex();

  while (productOneIndex === productTwoIndex) {
    productTwoIndex = getRandomIndex();
  }

  while (productTwoIndex === productThreeIndex) {
    productThreeIndex = getRandomIndex();

    while (productOneIndex === productThreeIndex) {
      productThreeIndex = getRandomIndex();
    }
  }

  imageOne.src = productArray[productOneIndex].src;
  imageOne.alt = productArray[productOneIndex].name;
  productArray[productOneIndex].views++;

  imageTwo.src = productArray[productTwoIndex].src;
  imageTwo.alt = productArray[productTwoIndex].name;
  productArray[productTwoIndex].views++;

  imageThree.src = productArray[productThreeIndex].src;
  imageThree.alt = productArray[productThreeIndex].name;
  productArray[productThreeIndex].views++;


}

renderProductImages();

// Events

function handleClick(event) {
  maxVotes--;
  let imageClicked = event.target.alt;
  for (let i = 0; i < productArray.length; i++) {
    if (imageClicked === productArray[i].name) {
      productArray[i].votes++;
    }
  }

  renderProductImages();

  if (maxVotes === 0) {
    myContainer.removeEventListener('click', handleClick);
  }
}

myContainer.addEventListener('click', handleClick);

function handleShowResults(event) {
  let resultsList = document.getElementById('display-results');
  if (maxVotes === 0) {
    for (let i = 0; i < productArray.length; i++) {
      let li = document.createElement('li');
      li.textContent = `${productArray[i].name} was viewed ${productArray[i].views} times and was voted for ${productArray[i].votes} times.`;
      resultsList.appendChild(li);
    }
  }
}

showResultsbBtn.addEventListener('click', handleShowResults);




