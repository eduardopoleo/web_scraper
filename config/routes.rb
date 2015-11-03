Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'staff#vertical'

  get 'horizontal' => 'staff#horizontal'
  get 'vertical' => 'staff#vertical'

  # Example of regular route:
  get 'all_salaries' => 'averages#all_salaries', defaults: { format:  'json' }
  get 'professors_only' => 'averages#professors_only', defaults:  { format: 'json' }
  get 'administrative_staff' => 'averages#administrative_staff', defaults: { format: 'json' }

  get 'practices(/:action)', controller: 'practices'

end
