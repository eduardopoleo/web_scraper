class AveragesController < ApplicationController

  def all_salaries
    @data = Average.where(use_case: "overall_salaries")
    respond_to do |format|
      format.json { render json: @data }
    end
  end

  def professors_only
    @data = Average.where(use_case: "professors_only")
    respond_to do |format|
      format.json { render json: @data }
    end
  end

  def administrative_staff
    @data = Average.where(use_case: "administrative_only")
    respond_to do |format|
      format.json { render json: @data }
    end
  end
end
