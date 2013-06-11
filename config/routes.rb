Html5Storage::Application.routes.draw do

  resources :quotes do
    collection do
      get :generate
    end
  end


  root :to => 'home#index'
end
