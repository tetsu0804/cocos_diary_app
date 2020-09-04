class User < ApplicationRecord
  validates :first_name, presence: true, length: { maximum: 15}
  validates :last_name, presence: true, length: { maximum: 15}
  validates :email, presence: true, length: { maximum: 64}, uniqueness: true
  has_secure_password
end
