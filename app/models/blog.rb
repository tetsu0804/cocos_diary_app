class Blog < ApplicationRecord
  belongs_to :user
  has_one_attached :eyecatch
  attr_accessor :image

  def eyecatch=(image)
    if image.present?
      prefix = image[/(image|application)(\/.*)(?=\;)/]
      #jpeg
      type = prefix.sub(/(image|application)(\/)/, '')
      #imageのデコード
      data = Base64.decode64(image.sub(/data:#{prefix};base64,/, ''))
      #日付.jpeg

      filename = "#{Time.zone.now.strftime('%Y%m%d%H%M%S%L')}.#{type}"
      #wb LF改行は改行のまま書き込まれる
      File.open("#{Rails.root}/tmp/#{filename}", 'wb') do |f|
        f.write(data)
      end
      #imageがあればimage pidを終了させる <= あってるのか？笑
      eyecatch.detach if eyecatch.attached?
      eyecatch.attach(io: File.open("#{Rails.root}/tmp/#{filename}"), filename: filename)
      FileUtils.rm("#{Rails.root}/tmp/#{filename}")
    end
  end
end
