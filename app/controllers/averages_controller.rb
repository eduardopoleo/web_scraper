class AveragesController < ApplicationController

  def all_salaries
    @data = Average.where(use_case: "overall_salaries")
    respond_to_block
  end

  def professors_only
    @data = Average.where(use_case: "professors_only")
    respond_to_block
  end

  def administrative_staff
    @data = Average.where(use_case: "administrative_only")
    respond_to_block
  end

  
  private

  def respond_to_block
    respond_to do |format|
      format.json { render json: @data }
    end
  end
end
