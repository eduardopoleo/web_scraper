class Professor < ActiveRecord::Base
  def self.overall_salaries
    professors = Professor.all
    universities = professors.map{|p| p.university}.uniq
    average_salaries = []

    universities.each do |university|
      current_professors = professors.select{|p| p.university == university}
      average_salary = current_professors.map{|p| p.salary}.reduce(:+)/current_professors.count
      average_salaries << average_salary
    end

    [universities, average_salaries]
  end
end
