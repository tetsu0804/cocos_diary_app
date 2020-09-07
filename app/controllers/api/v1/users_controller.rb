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
    user = User.find(params[:id])

    if user.update_attributes(first_name: params[:first_name], last_name: params[:last_name], email: params[:email])
      render json: { user: user }
    else
      render json: "ユーザー編集失敗しました", status: :unauthorized
    end
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    head :no_content
  end

  private

    def user_params
      params.permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end
end
