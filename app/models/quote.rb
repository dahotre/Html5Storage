class Quote
  include Mongoid::Document
  field :author, type: String
  field :quote, type: String
end
