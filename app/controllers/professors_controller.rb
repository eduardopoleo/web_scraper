class ProfessorsController < ApplicationController
  def index
  end
  
  def overall_salaries
    @data = Professor.overall_salaries
    respond_to do |format|
      format.html
      format.json { render json: @data }
    end
  end
end


# {
#   {
#     "name": blah,
#     "average_salary": 4444
#   },
#
#   {
#     "name": blah,
#     "average_salary": 4444
#   }
# }
