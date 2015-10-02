require 'mechanize'
agent = Mechanize.new
page = agent.get('http://www.fin.gov.on.ca/en/publications/salarydisclosure/pssd/orgs-tbs.php?year=2014&organization=universities&page=4')

page_links = page.search("//thead/tr/td[2]/a")

page_links.each do |link|
  page.link_with(text: "#{link.text}").click

  puts "------>Scraping results for page #{link.text}<-----------"
  row = agent.page.at('//tbody/tr[1]')
# rows = agent.page.search('//tbody/tr')


  university = row.at('td[1]/span').text.strip
  last_name =  row.at('td[2]').text.strip
  name = row.at('td[3]').text.strip
  title = row.at('td[4]/span').text.strip
  salary = row.at('td[5]').text.strip.gsub(/[$\,]/, "").to_f
  taxable_benefits = row.at('td[6]').text.strip.gsub(/[$\,]/, "").to_f

  Professor.create(
    university: university,
    last_name: last_name,
    name: name,
    title: title,
    salary: salary,
    taxable_benefits: taxable_benefits
  )

  puts university
  puts last_name
  puts name
  puts title
  puts salary
  puts taxable_benefits
end


# <tr>
#   <td colspan="2" align="left" valign="top"><span lang="en">Algoma University</span></td>
# 	<td align="left" valign="top">ANTUNES</td>
#   <td colspan="2" align="left" valign="top">PEDRO</td>
#   <td align="left" valign="top"><span lang="en"> Associate Professor</span></td>
#   <td align="right" valign="top">$101,230.96</td>
#   <td colspan="2" align="right" valign="top">$7,738.20</td>
# </tr>
