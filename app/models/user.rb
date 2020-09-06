class User < ApplicationRecord
  validates :first_name, presence: true, length: { maximum: 15}
  validates :last_name, presence: true, length: { maximum: 15}
  validates :email, presence: true, length: { maximum: 64}, uniqueness: true
  has_secure_password

  def self.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                 BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end
end
