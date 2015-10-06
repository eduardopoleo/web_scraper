class Professor < ActiveRecord::Base
  def self.overall_salaries
    professors = Professor.all
    universities = professors.map{|p| p.university}.uniq
    data = []

    universities.each do |university|
      current_professors = professors.select{|p| p.university == university}
      average_salary = (current_professors.map{|p| p.salary}.reduce(:+)/current_professors.count).round(2)
      data << {name: university, value: average_salary}
    end

    data
  end
end
