class ProfessorsController < ApplicationController
  def index
  end

  def all_salaries
    @data = Professor.all_salaries
    respond_to do |format|
      format.json { render json: @data }
    end
  end

  def professors_only
    @data = Professor.professors_only
    respond_to do |format|
      format.json { render json: @data }
    end
  end

  def administrative_staff
    @data = Professor.administrative_staff
    respond_to do |format|
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
