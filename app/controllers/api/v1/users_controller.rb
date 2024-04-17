class Api::V1::UsersController < ApplicationController
            def index
                @users = User.all
                render json: @users
            end 

            def create
                begin
                @user = User.create(user_params)

            private
            def users_params
                params.require(:user).permit(:name, :role )
              end
end

