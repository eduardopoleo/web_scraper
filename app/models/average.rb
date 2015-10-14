class Average < ActiveRecord::Base
  def serializable_hash(options = {})
    {
      university: university,
      average_salary: average_salary
    }
  end
end
