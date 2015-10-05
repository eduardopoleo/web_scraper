namespace :scrape do
  desc "Scrape data from University disclosure"

  task scraping_data: :environment do
    require 'mechanize'
    agent = Mechanize.new
    page = agent.get('http://www.fin.gov.on.ca/en/publications/salarydisclosure/pssd/orgs-tbs.php?year=2014&organization=universities&page=1')
    page_links = page.search("//thead/tr/td[2]/a")
    initial_time = Time.now

    page_links.each do |link|
      page.link_with(text: "#{link.text}").click

      puts "------>Scraping results for page #{link.text}<-----------"
      # row = agent.page.at('//tbody/tr[1]')
      rows = agent.page.search('//tbody/tr')

      rows.each do |row|
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
      end
    end

    final_time = Time.now
    time_elapse = (final_time - initial_time)
    puts "--->Time elapsed: #{time_elapse} seconds"
  end
end
