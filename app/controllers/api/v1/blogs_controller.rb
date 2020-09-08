class Api::V1::BlogsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    user = User.find(params[:user_id])
    blog = user.blogs.build(blog_params)
    if blog.save
      render json: { blog: blog, user: user}
    else
      render json: "ブログ作成失敗しました", status: :unauthorized
    end
  end

  def update
  end

  def show
    blog = Blog.find(params[:id])
    render json: { blog: blog }
  end

  def destroy
  end

  def index
    blogs = Blog.all
    render json: { blogs: blogs}
  end

  def all
    blogs = Blog.all
    render json: { blogs: blogs}
  end

  private

    def blog_params
      params.permit(:title, :content)
    end
end
