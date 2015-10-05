class CreateProfessors < ActiveRecord::Migration
  def change
    create_table :professors do |t|
      t.string :university, :last_name, :name, :title
      t.float :salary, :taxable_benefits
      t.timestamps
    end
  end
end
