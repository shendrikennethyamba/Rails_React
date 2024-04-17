class AddStatus < ActiveRecord::Migration[7.1]
  def change
    add_column :todos, :status, :string
  end
end
