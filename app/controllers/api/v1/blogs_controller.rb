class Api::V1::BlogsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    user = User.find(params[:user_id])
    blog = user.blogs.build(blog_params)
    if blog.save
      blog.eyecatch = blog_params[:image]
      render json: { blog: blog, user: user}
    else
      render json: "ブログ作成失敗しました", status: :unauthorized
    end
  end

  def update
  end

  def show
    blog = Blog.find(params[:id])
    # eyecatch = blog.eyecatch
    if blog.eyecatch.attached?
      blog.image = encode_base64(blog.eyecatch)
    end
    render json: { blog: blog, image: blog.image }
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
      params.permit(:title, :content, :image)
    end

    def encode_base64(image_file)
      image = Base64.encode64(image_file.download) # 画像ファイルをActive Storageでダウンロードし、エンコードする
      blob = ActiveStorage::Blob.find(image_file[:id]) # Blobを作成
      "data:#{blob[:content_type]};base64,#{image}" # Vue側でそのまま画像として読み込み出来るBase64文字列にして返す
    end
end
