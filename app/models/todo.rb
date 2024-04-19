class Todo < ApplicationRecord
<<<<<<< HEAD
    belongs_to :user
    include ActiveModel::Validations
    validates :title, length: { minimum: 3 }
    validates :body, length: { minimum: 3 }
=======
  include ActiveModel::Validations
  validates :title, presence: true, length: { minimum: 10 }
  validates :body, presence: true, length: { minimum: 10 }
>>>>>>> cbf539fca5c0ac25628049fc1b1af76749a6f947
end

    
