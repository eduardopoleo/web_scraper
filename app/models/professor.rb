class Professor < ActiveRecord::Base
  def self.overall_salaries
    universities = Professor.all.map{|p| p.university}.uniq
    average_salaries = []

    universities.each do |university|
      professors = Professor.where(university: university)
      average_salary = professors.map{|p| p.salary}.reduce(:+)/professors.count
      average_salaries << average_salary
    end

    [universities, average_salaries]
  end
end
