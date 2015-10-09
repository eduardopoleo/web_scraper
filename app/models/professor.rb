class Professor < ActiveRecord::Base
  def self.all_salaries
    professors = Professor.all
    universities_average(professors)
  end

  def self.professors_only
    professors = Professor.where("title like ?", "%Professor%")
    universities_average(professors)
  end

  def self.administrative_staff
    professors = Professor.where("title not like ?", "%Professor%")
    universities_average(professors)
  end


  def self.universities_average(staff)
    universities = staff.map{|p| p.university}.uniq
    data = []

    universities.each do |university|
      university_staff = staff.select{|p| p.university == university}
      average_salary = (university_staff.map{|p| p.salary}.reduce(:+)/university_staff.count).round(2)
      data << {name: university, value: average_salary}
    end

    data
  end
end
