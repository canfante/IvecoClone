require_relative "boot"

require 'action_cable/engine'
require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module IvecoClone
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    config.assets.paths << Rails.root.join("app", "assets", "flash")

    config.generators.jbuilder = false

    config.generators.scaffold_stylesheet false
    config.generators do |g|
      g.test_framework  nil #to skip test framework
    end

    config.sass.preferred_syntax = :sass

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
