const cardContainer = document.querySelector(".card-container")
const formContainer = document.querySelector(".form-container")
// const formList = document.querySelector(".to-hit-form")
const hitNumber = document.getElementById("hit-number")
const cardsToHitForm = document.getElementById("cards-to-hit-form")
const selectCardsForm = document.getElementById("select-cards-form")

let deckId = ""
let startingHand = {}
let newCards = {}
let numberOfHits = null

function gameOn(){
  fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=5")
  .then(response => response.json())
  .then(cards => {
    gameplay(cards)
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
  
  cardDiv.classList.add("card-in-hand-div")
  cardImage.classList.add("card-in-hand-image")
  cardImage.src = card["image"]
  
  cardContainer.append(cardImage)
  cardContainer.append(cardDiv)

  })
}

function takeHit(hand){
  const hitLabel = document.getElementById("hit-label")
  hitNumber.addEventListener("change", (event) => {
    event.preventDefault()
    const toReturn = hitNumber.value
    cardsToHitForm.remove()
    if (toReturn != "0"){
      createOptionsForm(hand)
      console.log(selectCardsForm)
      getNewCards(toReturn)
    }
    

  })
}

function createOptionsForm(hand){
  formContainer.append(selectCardsForm)
  hand.forEach(card => {
    const cardCheckbox = document.createElement("input")

    cardCheckbox.classList.add("to-hit-option")
    cardCheckbox.name = `card`
    cardCheckbox.type = "checkbox"
    cardCheckbox.value = card.code

    selectCardsForm.appendChild(cardCheckbox)

  })
  // <input id="hit-button" type="submit" value="Hit me!">
  const hitButton = document.createElement("input")
  hitButton.type = "submit"
  hitButton.id = "hit-button"
  hitButton.value = "Hit me!"
  selectCardsForm.append(hitButton)
  }


function getNewCards(hits){
  console.log(deckId, startingHand, hits)
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${hits}`)
    .then(response => response.json())
    .then(replacements => {
    return replacements
    })
}



function gameplay(cards) {
  getDeckId(cards)
  getStartingHand(cards)
  displayCards(startingHand)
  numberOfHits = takeHit(startingHand)
  newCards = getNewCards(deckId, startingHand, numberOfHits)
}

gameOn()


