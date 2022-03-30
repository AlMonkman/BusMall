'use strict';

// ************************* Global Variables *************************
let myContainer = document.getElementById('container');

let showResultsBtn = document.getElementById('show-results-btn');

let imageOne = document.getElementById('img-one');
let imageTwo = document.getElementById('img-two');
let imageThree = document.getElementById('img-three');
// localStorage.clear();

let productArray = JSON.parse(localStorage.getItem('product')) ?? [];
let shownProducts = [];
let maxVotes = 25;
console.log(productArray);

// Constructor Function

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.votes = 0;
  if (productArray.length < 19){
    productArray.push(this);
  }
 
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
  while (shownProducts.length < 6) {
    let num = getRandomIndex();
    while (shownProducts.includes(num)) {
      num = getRandomIndex();
    }
    shownProducts.push(num);
  }

  let productIndexOne = shownProducts.shift();
  let productIndexTwo = shownProducts.shift();
  let productIndexThree = shownProducts.shift();
  // console.log(shownProducts);

  imageOne.src = productArray[productIndexOne].src;
  imageOne.alt = productArray[productIndexOne].name;
  productArray[productIndexOne].views++;

  imageTwo.src = productArray[productIndexTwo].src;
  imageTwo.alt = productArray[productIndexTwo].name;
  productArray[productIndexTwo].views++;

  imageThree.src = productArray[productIndexThree].src;
  imageThree.alt = productArray[productIndexThree].name;
  productArray[productIndexThree].views++;
}

renderProductImages();

// Local Storage

function addToStorage(storedProduct) {
  for (let i = 0; i < productArray.length; i++) {
    storedProduct = JSON.stringify(productArray);
    localStorage.setItem('product', storedProduct);
  }

}



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

function handleShowResults() {

  for (let i = 0; i < productArray.length; i++) {
    addToStorage(productArray);
  }

  let resultsList = document.getElementById('display-results');
  if (maxVotes === 0) {
    imageOne.style.display = 'none';
    imageTwo.style.display = 'none';
    imageThree.style.display = 'none';
    let ul = document.createElement('ul');
    resultsList.appendChild(ul);
    for (let i = 0; i < productArray.length; i++) {
      let li = document.createElement('li');
      li.textContent = `${productArray[i].name} was viewed ${productArray[i].views} times and voted for ${productArray[i].votes} times.`;
      ul.appendChild(li);
    }
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Bag', 'Banana', 'Bathroom', 'Boots', 'Breakfast', 'Bubblegum', 'Chair', 'Cthulu', 'Dog-Duck', 'Dragon', 'Pen', 'Pet-Sweep', 'Scissors', 'Shark', 'Sweep', 'Tauntaun', 'Unicorn', 'Water-Can', 'Wine-Glass'],
        datasets: [{
          label: '# of Votes',
          data: [productArray[0].votes, productArray[1].votes, productArray[2].votes, productArray[3].votes, productArray[4].votes, productArray[5].votes, productArray[6].votes, productArray[7].votes, productArray[8].votes, productArray[9].votes, productArray[10].votes, productArray[11].votes, productArray[12].votes, productArray[13].votes, productArray[14].votes, productArray[15].votes, productArray[16].votes, productArray[17].votes, productArray[18].votes],
          backgroundColor: [
            'purple'
          ],
          borderColor: [
            'purple'
          ],
          borderWidth: 1
        }, {
          label: '# of Veiws',
          data: [productArray[0].views, productArray[1].views, productArray[2].views, productArray[3].views, productArray[4].views, productArray[5].views, productArray[6].views, productArray[7].views, productArray[8].views, productArray[9].views, productArray[10].views, productArray[11].views, productArray[12].views, productArray[13].views, productArray[14].views, productArray[15].views, productArray[16].views, productArray[17].views, productArray[18].views],
          backgroundColor: [
            'green'
          ],
          borderColor: [
            'green'
          ],
          borderWidth: 1
        }]

      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true
      }
    });
  }
}



showResultsBtn.addEventListener('click', handleShowResults);




