namespace :scrape do
  desc "Scrape data from University disclosure"

  task scraping_data: :environment do
    #Scrapping data
    require 'mechanize'
    agent = Mechanize.new
    page = agent.get('http://www.fin.gov.on.ca/en/publications/salarydisclosure/pssd/orgs-tbs.php?year=2014&organization=universities&page=1')
    page_links = page.search("//thead/tr/td[2]/a")
    initial_time = Time.now

    def cleaned_text(row, xpath)
      row.at(xpath).text.strip
    end

    def money_value(row, xpath)
      cleaned_text(row, xpath).tr("$,", "").to_f
    end

    page_links.each do |link|
      page.link_with(text: "#{link.text}").click

      puts "------>Scraping results for page #{link.text}<-----------"
      # row = agent.page.at('//tbody/tr[1]')
      rows = agent.page.search('//tbody/tr')

      rows.each do |row|
        Staff.create(
          university: cleaned_text(row, 'td[1]/span'),
          last_name: cleaned_text(row, 'td[2]'),
          name: cleaned_text(row, 'td[3]'),
          title: cleaned_text(row, 'td[4]/span'),
          salary: money_value(row, 'td[5]'),
          taxable_benefits: money_value(row, 'td[6]')
        )
      end
    end

    #calculating averages
    def salary_averages(staff, use_case)
      universities = staff.map{|p| p.university}.uniq
      data = []

      universities.each do |university|
        university_staff = staff.select{|s| s.university == university}
        average_salary = (university_staff.map{|p| p.salary}.reduce(:+)/university_staff.count).round(2)

        Average.create(
          university: university,
          use_case: use_case,
          average_salary: average_salary
        )
      end
    end


    puts "------------>Calculating overall salaries<---------------"
    staff = Staff.all
    salary_averages(staff, "overall_salaries")

    puts "------------>Calculating Professors only<---------------"
    staff = Staff.where("title like ?", "%Professor%")
    salary_averages(staff, "professors_only")

    puts "------------>Calculating Administrative only<---------------"
    staff = Staff.where("title not like ?", "%Professor%")
    salary_averages(staff, "administrative_only")



    # final_time = Time.now
    # time_elapse = (final_time - initial_time)
    # puts "--->Time elapsed: #{time_elapse} seconds"
  end
end

# page_links = page.search("//thead/tr/td[2]/a")
#   <thead>
#     <tr>
#   		 <td><a href="LinkToFirstPage">First Page</a> </td>
#        <td>
#          <a href="LinkToPage1">1</a>
#          <a href="LinkToPage2">2</a>
#          <a href="LinkToPage3">3</a>
#          <a href="LinkToPage4">4</a> |
#         </td>
#        <td><a href="LinkToLastPAge">Last Page</a> </td>
#     </tr>
#   </thead>
#
#   <tbody>
#     <tr>
#       <td>
#         <span>Super Duper University</span>
#       </td>
#   		<td>Doe</td>
#   		<td>John</td>
#   		<td>
#         <span>Associate Professor</span>
#       </td>
#   	 <td>$101,395.11</td>
#   	 <td>$7,541.94</td>
#     </tr>
#       .
#       .
#   </tbody>
