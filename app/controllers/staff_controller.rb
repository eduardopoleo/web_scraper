class StaffController < ApplicationController
  def index
  end

  def all_salaries
    @data = Staff.all_salaries
    respond_to do |format|
      format.json { render json: @data }
    end
  end

  def professors_only
    @data = Staff.professors_only
    respond_to do |format|
      format.json { render json: @data }
    end
  end

  def administrative_staff
    @data = Staff.administrative_staff
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
