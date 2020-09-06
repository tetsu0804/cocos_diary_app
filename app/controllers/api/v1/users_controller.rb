class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    user = User.new(user_params)
    if user.save
      log_in(user)
      render json: { user: user, cookie: User.digest(session[:user_id]) }
    else
      render json: "ユーザー登録失敗しましたの再度お願いします", status: :unauthorized
    end
  end

  def update
  end

  def destroy
  end

  private

    def user_params
      params.permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end
end
