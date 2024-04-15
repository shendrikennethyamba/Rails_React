class User < ApplicationRecord
    
    ActiveModel::Validations

    validates :name, presence: true
    validates :email, presence: true
end
