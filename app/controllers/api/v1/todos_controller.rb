module Api
  module V1
    class TodosController < ApplicationController
      def index
        @todos = Todo.order("created_at DESC")
        render json: @todos
      end

      def create
        @todo = Todo.create(todo_params)
        render json: @todo
      end

      private

      def todo_params
        params.require(:todo).permit(:title, :body)
      end
    end
  end
end