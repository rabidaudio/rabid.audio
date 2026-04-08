Bridgetown.configure do |config|
    init :"bridgetown-sitemap"
    init :"bridgetown-feed"
    config.defaults << {
        "scope" => { "path" => "resources/**/*.pdf" },
        "values" => { "sitemap" => false }
    }
end
