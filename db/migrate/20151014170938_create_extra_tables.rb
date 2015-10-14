class CreateExtraTables < ActiveRecord::Migration
  def change
    create_table :averages do |t|
      t.string :university, :use_case
      t.float :average_salary
      t.timestamps
    end
  end
end
