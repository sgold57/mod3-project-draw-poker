const cardContainer = document.querySelector(".card-container")
const formContainer = document.querySelector(".form-container")
// const formList = document.querySelector(".to-hit-form")
const hitNumber = document.getElementById("hit-number")
const cardsToHitForm = document.getElementById("cards-to-hit-form")
const selectCardsForm = document.getElementById("select-cards-form")
const button = document.getElementById("hit-button")

let deckId = ""
let startingHand = {}
let newCards = {}
let numberOfHits
let discardArray = []
let handCardCodes = []
let handVerdict = ""

fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=5")
  .then(response => response.json())
  .then(cards => {
    gameplay(cards)
  })

function gameplay(cards) {
  getDeckId(cards)
  getStartingHand(cards)
  displayCards(startingHand) 
  takeHit(startingHand)


  // PERHAPS TO UNHIGHLIGHT
  // extrapolateCardCode(startingHand)
  // checkHand(handCardCodes)
  // getNewCards(deckId, startingHand, numberOfHits)
  }

function getDeckId(cards){
  deckId = cards.deck_id
  console.log(deckId)
}

function getStartingHand(cards){
  startingHand = cards.cards
  console.log(startingHand)
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
    numberOfHits = parseInt(hitNumber.value)
    cardsToHitForm.remove()
    if (numberOfHits != 0){
      createOptionsForm(hand)
      console.log(numberOfHits)
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
    cardCheckbox.onclick = function(){
      discardArray.push(cardCheckbox.value)
      console.log(discardArray)
    }

    selectCardsForm.appendChild(cardCheckbox)

  })
  // <input id="hit-button" type="submit" value="Hit me!">
  const hitButton = document.createElement("input")
  hitButton.type = "submit"
  hitButton.id = "hit-button"
  hitButton.value = "Hit me!"
  selectCardsForm.append(hitButton)
  console.log(deckId)

  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numberOfHits}`)
  .then(response => response.json())
  .then(replacements => {
      console.log(replacements)
    })
}







// function getNewCards(hits){
//   console.log(deckId, startingHand, hits)
//   fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${hits}`)
//     .then(response => response.json())
//     .then(replacements => {
//     return replacements
//     })
// }


// POTENTIALL UNHIGHLIGHT 128-141 TO SHOW BEGINNING STEPS OF GETTING HAND VALUE


// function extrapolateCardCode(array){
//   array.forEach(element => {
//     handCardCodes.push(element.code)
//   })
// }


// function checkHand(array){
//   console.log(array)
//   let valueArray = []
//   let suitArray = []
//   array.forEach(card => {
//     console.log(card)
//     valueArray.push(card[0])
//     suitArray.push(card[1])
//   })

//   console.log(array)
//   console.log(valueArray)
//   console.log(suitArray)


//   let numeratedFaceCards = []
//   valueArray.forEach(value => {
//     if(value == "0") {
//       value = 10
//       console.log(value)
//     }else if (value == "J"){
//       value = 11
//     }else if(value == "Q"){
//       value = 12
//     }else if(value == "K"){
//       value = 13
//     }else if(value == "A"){
//       value = 1
//     } else {
//       value = parseInt(value)
//     }
//     console.log(value)
//     numeratedFaceCards.push(value)
//   })

//   console.log(numeratedFaceCards.sort())
// }


//EVERYTHING BELOW THIS LINE IS FOR HAND VERIFICATION...NOT READY

//   console.log(flushCheck["S","S","S","S","S"])
//   flushCheck(suitArray)
  
// 

// function flushCheck(array){
//   if(array[0] == array[1]){
//     console.log("good!")
//     if (array[0] == array[2]){
//       console.log("good!")
//       if (array[0] == array[3]){
//         console.log("good!")
//         if (array[0] == array[4]){
//           handVerdict = "Flush"
//           console.log("good!")
//           return handVerdict
//         }
//       }
//     }
//   }
// }









