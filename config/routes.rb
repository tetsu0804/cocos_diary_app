Rails.application.routes.draw do

  root to: 'home#index'
  namespace :api do
    namespace :v1 do
      post '/signup', controller: :users, action: :create
      get '/users/:id', controller: :users, action: :show
      patch '/users/:id', controller: :users, action: :update
      delete '/signout/:id', controller: :users, action: :destroy
      post '/login', controller: :sessions, action: :create
      delete '/logout', controller: :sessions, action: :destroy
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
