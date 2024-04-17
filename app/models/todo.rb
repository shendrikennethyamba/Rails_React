class Todo < ApplicationRecord
  include ActiveModel::Validations
  validates :title, presence: true, length: { minimum: 10 }
  validates :body, presence: true, length: { minimum: 10 }
end
