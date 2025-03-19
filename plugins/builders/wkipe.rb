

class Builders::Wkipe < SiteBuilder
    def build
        liquid_tag :wkipe do |args|
            page, text = args.split('|', 2).map(&:strip)
            text ||= page
            "<a href=\"https://en.wikipedia.org/wiki/#{CGI.escape(page.gsub(' ', '_'))}\">#{text}</a>"
        end
    end
end
