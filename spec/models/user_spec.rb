require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { FactoryBot.create(:user) }
  describe "User作成成功" do
    it "成功" do
      expect(user).to be_valid
    end

    context "文字制限" do
      it "first_nameが15文字以内で成功" do
        user.first_name = "a" * 15
        expect(user).to be_valid
      end

      it "last_nameが15文字以内で成功" do
        user.last_name = "a" * 15
        expect(user).to be_valid
      end

      it "emailが64文字以内で成功" do
        user.email = ("a" * 55) + "@" +("a" * 4) + "."  + ("a" *3)
        expect(user).to be_valid
      end
    end

  end

  describe "User作成失敗" do
    context "文字制限" do
      it "first_nameが16文字以上で失敗" do
        user.first_name = "a" * 16
        expect(user).to_not be_valid
      end

      it "last_nameが16文字以上で失敗" do
        user.last_name = "a" * 16
        expect(user).to_not be_valid
      end

      it "emailが64文字以上で失敗" do
        user.email = ("a" * 56) + "@" +("a" * 4) + "."  + ("a" *3)
        expect(user).to_not be_valid
      end
    end

    context "文字が記入されていない" do
      it "first_nameが記入されていないと失敗" do
        user.first_name = ""
        expect(user).to_not be_valid
      end

      it "last_nameが記入されていないと失敗" do
        user.last_name = ""
        expect(user).to_not be_valid
      end

      it "emailが記入されていないと失敗" do
        user.email = ""
        expect(user).to_not be_valid
      end
    end

    it "同じemailが存在する場合は失敗" do
       user
       user2 = User.create(first_name: "次郎", last_name: "高橋", email: "test@test.com", password: "password", password_confirmation: "password")
       expect(user2).to_not be_valid
    end
  end
end
