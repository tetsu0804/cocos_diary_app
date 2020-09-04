FactoryBot.define do
  factory :user do
    first_name { "太郎" }
    last_name { "吉田" }
    email { "test@test.com" }
    password { "password" }
    password_confirmation { "password" }
  end
end
