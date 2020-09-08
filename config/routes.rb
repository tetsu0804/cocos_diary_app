Rails.application.routes.draw do

  # namespace :api do
  #   namespace :v1 do
  #     get 'blogs/create'
  #     get 'blogs/update'
  #     get 'blogs/show'
  #     get 'blogs/destroy'
  #     get 'blogs/index'
  #   end
  # end
  root to: 'home#index'
  namespace :api do
    namespace :v1 do
      post '/signup', controller: :users, action: :create
      get '/users/:id', controller: :users, action: :show
      patch '/users/:id', controller: :users, action: :update
      delete '/signout/:id', controller: :users, action: :destroy
      post '/login', controller: :sessions, action: :create
      delete '/logout', controller: :sessions, action: :destroy

      resources :users, only: :show do
        resources :blogs, only: [:create, :show, :update, :destroy, :index]
      end
      get '/blogs', controller: :blogs, action: :all
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
