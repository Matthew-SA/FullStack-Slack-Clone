class CreateUsers2 < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :email, null: false
      t.string :password_digest, nuLL: false
      t.string :session_token, null: false
      t.timestamps
    end
    add_index :users, :username, unique: true
    add_index :users, :session_token
  end
end
