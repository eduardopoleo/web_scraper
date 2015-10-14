class Staff < ActiveRecord::Base
  def self.all_salaries
    staff = Staff.all
    universities_average(staff)
  end

  def self.professors_only
    staff = Staff.where("title like ?", "%Professor%")
    universities_average(staff)
  end

  def self.administrative_staff
    staff = Staff.where("title not like ?", "%Professor%")
    universities_average(staff)
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

__END__
All salaries
University
Average salaries

Professors only 


