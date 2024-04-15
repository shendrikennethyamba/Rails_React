module Api
    module V1
  
        class Users_Controller < ApplicationController
            def index
                @users = user.order("created_at DESC")
                render json: @users
            end 

            private

        end
    
    end
end

