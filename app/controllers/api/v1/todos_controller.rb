module Api::V1
 
    class TodosController < ApplicationController
      def index
        @user = User.find(params[:user_id])
        @todos = @user.Todo.order("created_at ASC, updated_at ASC")
        render json: @todos
      end

      def create
        begin 
          @todo = Todo.create(todo_params)
        rescue => e
          render json: { status: 400, todo: @todo, message: @todo.errors }
        end
        render json: @todo
      end

      def destroy
        begin  
          todo = Todo.find(params[:id])
          todo.destroy
        rescue => e
          render json: { status: 400, todo: todo, message: todo.errors}
        end
        render json: {todo: todo, message: "success" }
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