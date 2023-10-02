Bridgetown.configure do |config|
    init :"bridgetown-sitemap"
    config.defaults << {
        "scope" => { "path" => "resources/**/*.pdf" },
        "values" => { "sitemap" => false }
    }
end
