class Api::V1::SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    user = User.find_by(email: params[:session][:email])

    if user && user.authenticate(params[:session][:password])
      log_in(user)
      render json: { user: user, cookie: User.digest(session[:user_id]) }
    else
      render json: "メールアドレス or パスワードが一致しない為ログインできません", status: :unauthorized
    end
  end

  def destroy
    session.delete(:user_id)
  end
end
