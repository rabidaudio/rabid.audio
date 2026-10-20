
class Builders::Kicanvas < SiteBuilder
  def build
    # https://kicanvas.org/embedding/
    # "github:rabidaudio/muffstack/foo/bar/baz.kicad_pcb@mybranch"
    liquid_tag :kicanvas, as_block: true do |args, tag|
        sources = tag.content.lines.map(&:chomp).reject(&:empty?).map(&:strip).map do |url|
            if url.starts_with?('github:')
                username, repo, path = url.delete_prefix('github:').split("/", 3)
                path, branch = path.split("@", 2)
                "https://raw.githubusercontent.com/#{username}/#{repo}/refs/heads/#{branch || "main"}/#{path}"
            else # remote URL or local path, relative to <project_root>/src/
                url
            end
        end.map do |src|
            <<~HTML
            <kicanvas-source src="#{src}"></kicanvas-source>
            HTML
        end.join

        <<~HTML
            <kicanvas-embed #{args}>#{sources}</kicanvas-embed>
        HTML
    end
  end
end
