class Api::V1::SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
  end

  def destroy
    session.delete(:user_id)
  end
end
