module Api
  module V1
    class TodosController < ApplicationController
      def index
        @todos = Todo.order("created_at ASC, updated_at ASC")
        render json: @todos
      end

      def create
        @todo = Todo.create(todo_params)
        render json: @todo
      end

      def destroy
        todo = Todo.find(params[:id])
        if todo.destroy           
          render json: { status: 200, todo: todo, message: "success" }
        else
          render json: { status: 500, todo: nil, message: todo.errors }
        end
      end

      def update
        todo = Todo.find(params[:id])
        todo.update!(todo_params)
        render json: todo
      end

      private

      def todo_params
        params.require(:todo).permit(:title, :body)
      end
    end
  end
end
