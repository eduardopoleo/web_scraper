class RenameProfessorsTable < ActiveRecord::Migration
  def change
    rename_table :professors, :staffs 
  end
end
