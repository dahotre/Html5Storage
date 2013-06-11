class HomeController < ApplicationController
  def index
    @quote_counter = Quote.count
  end
end
