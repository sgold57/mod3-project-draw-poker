class CardsController < ApplicationController
  def index
    response = RestClient.get "https://deckofcardsapi.com/api/deck/new/draw/?count=5"
    new_hand = JSON.parse response
    render json: new_hand
  end

end
