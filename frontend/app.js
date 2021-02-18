const cardContainer = document.querySelector(".card-container")
const formContainer = document.querySelector(".form-container")
// const formList = document.querySelector(".to-hit-form")
const hitNumber = document.getElementById("hit-number")

let deckId = ""
let startingHand = {}
let numberOfHits = null

function gameOn(){
  fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=5")
  .then(response => response.json())
  .then(cards => {
      getDeckId(cards)
      getStartingHand(cards)
      displayCards(startingHand)
      numberOfHits = takeHit()
      getNewCards(deckId, startingHand, numberOfHits)
  })
}

function getDeckId(cards){
  deckId = cards.deck_id
}

function getStartingHand(cards){
  startingHand = cards.cards
}

function displayCards(hand){
  hand.forEach(card => {
  const cardDiv = document.createElement("div")
  const cardImage = document.createElement("img")
  const cardCheckbox = document.createElement("input")
  const cardLabel = document.createElement("label")

  cardCheckbox.classList.add("to-hit-option")
  cardCheckbox.name = `${card.value} OF ${card.suit}`
  cardCheckbox.type = "checkbox"
  cardCheckbox.value = card.code
  console.log(cardCheckbox)

  // cardLabel.htmlFor = cardCheckbox.name
    
  cardDiv.classList.add("card-in-hand-div")
  cardImage.classList.add("card-in-hand-image")
  cardImage.src = card["image"]
  
  cardContainer.append(cardDiv)
  // cardCheckbox.append(cardLabel)
  // formList.append(cardCheckbox)
  cardContainer.append(cardImage)
  })
}

function takeHit(){
  const hitLabel = document.getElementById("hit-label")
  hitNumber.addEventListener("change", (event) => {
    event.preventDefault()
    const toReturn = hitNumber.value
    console.log(toReturn)
    hitNumber.remove()
    hitLabel.remove()
    getNewCards(toReturn)
  })
}

function getNewCards(hits){
  console.log(deckId, startingHand, hits)
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${hits}`)
    .then(response => response.json())
    .then(replacements => {
      console.log(replacements)
    })
}

gameOn()


