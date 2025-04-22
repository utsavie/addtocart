let receipt = [];
let userInput, submitButton;
let stars = [];
let priceTags = [];
let basketY;
let cartImage, starImage;

let fonts = ['Courier New', 'Georgia', 'Arial', 'Verdana', 'Times New Roman', 'Comic Sans MS'];

function preload() {
  cartImage = loadImage('cart.png');
  starImage = loadImage('star3.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  basketY = height - 400 - 10;

  textFont('Courier');
  textSize(14);

  userInput = createInput('');
  userInput.position(20, height - 40);
  userInput.size(200);

  submitButton = createButton('Add to receipt');
  submitButton.position(userInput.x + userInput.width + 10, height - 40);
  submitButton.mousePressed(handleAdd);
}

function draw() {
  background(245);
  drawReceiptArea();
  drawCartArea();
  drawBasket();
}

function drawReceiptArea() {
  textAlign(CENTER);
  textSize(20);
  let centerX = width / 4;
  let startY = 50;
  let lineSpacing = 35;

  for (let i = 0; i < receipt.length; i++) {
    let y = startY + i * lineSpacing;
    let font = fonts[i % fonts.length];
    textFont(font);
    fill(0);
    text(receipt[i], centerX, y);
  }

  stroke(200);
  line(width / 2, 0, width / 2, height);
}

function drawCartArea() {
  for (let star of stars) {
    star.update();
    star.display();
  }

  for (let tag of priceTags) {
    tag.update();
    tag.display();
  }
}

function drawBasket() {
  let basketWidth = 400;
  let basketHeight = 400;
  let basketX = width / 2 + 100;
  image(cartImage, basketX, basketY, basketWidth, basketHeight);
}

function handleAdd() {
  let val = userInput.value().trim();
  if (val.length > 0) {
    let price = "£" + nf(random(0.99, 99.99), 2, 2);
    let entry = val + " – " + price;
    receipt.push(entry);

    stars.push(new Star());
    priceTags.push(new PriceTag(price));

    userInput.value('');
  }
}

class Star {
  constructor() {
    this.x = random(width / 2 + 30, width - 60);
    this.y = -20;
    this.size = random(100, 180); // BIGGER
    this.speed = random(2, 5);
    this.alpha = random(100, 255);
    this.settled = false;
  }

  update() {
    if (!this.settled) {
      this.y += this.speed;
      if (this.y > basketY + 280) {
        this.y = basketY + 280;
        this.settled = true;
      }
    }
    this.alpha = random(100, 255); // flashing
  }

  display() {
    tint(255, this.alpha);
    image(starImage, this.x, this.y, this.size, this.size);
    noTint();
  }
}

class PriceTag {
  constructor(price) {
    this.x = random(width / 2 + 30, width - 60);
    this.y = -20;
    this.speed = random(1.5, 3);
    this.alpha = 255;
    this.price = price;
    this.settled = false;
  }

  update() {
    if (!this.settled) {
      this.y += this.speed;
      if (this.y > basketY + 300) {
        this.y = basketY + 300;
        this.settled = true;
      }
    }
    this.alpha = random(180, 255);
  }

  display() {
    fill(0, this.alpha);
    textSize(24);
    textAlign(CENTER);
    textFont('Courier New');
    text(this.price, this.x, this.y);
  }
}
