    class Todo < ApplicationRecord
    belongs_to :user
     include ActiveModel::Validations
        validates :title, length: { minimum: 3 }
        validates :body, length: { minimum: 3 }
    end
end

    
