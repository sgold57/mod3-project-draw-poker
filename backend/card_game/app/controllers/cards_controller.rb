class CardsController < ApplicationController
  response = RestClient.get "https://deckofcardsapi.com/api/deck/new/draw/?count=5"
  
  def index
    new_hand = JSON.parse response
    render json: new_hand
  end

  def show
    
  end

end
