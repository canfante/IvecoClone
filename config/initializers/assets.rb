# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = "1.0"

Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Rails.application.config.assets.precompile += %w( scripts/datatable.js application.js users/application.js studio-page-assets/* fonts/* )

Rails.application.config.assets.precompile << ["*.svg", "*.eot", "*.woff", "*.ttf"]

Rails.application.config.assets.precompile += %w( bootstrap.min.js custom.js init.js main.js slick.js plugins.js reply.js strings.js)

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )
