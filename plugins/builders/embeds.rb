class Builders::Embeds < SiteBuilder
    def build
        liquid_tag :youtube_embed do |video|
            <<~HTML
                <div style="text-align: center">
                    <iframe style="max-width: 560px" width="100%" height="315" src="https://www.youtube.com/embed/#{video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            HTML
        end
    end
end
