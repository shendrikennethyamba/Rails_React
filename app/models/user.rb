class User < ApplicationRecord
    has_many :todo 
    include ActiveModel::Validations

    validates :name, presence: true
    validates :role, presence: true
end
