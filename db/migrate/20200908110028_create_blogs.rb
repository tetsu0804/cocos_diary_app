class CreateBlogs < ActiveRecord::Migration[5.2]
  def change
    create_table :blogs do |t|
      t.string :title, null: false
      t.string :content, null: false
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
