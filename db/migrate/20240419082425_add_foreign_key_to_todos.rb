class AddForeignKeyToTodos < ActiveRecord::Migration[7.1]
  def change
    add_foreign_key :todos, :users, column: :user_id
  end
end
