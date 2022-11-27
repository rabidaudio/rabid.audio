# require 'debug'

class Builders::Resources < SiteBuilder
  def build
    hook :site, :post_read do
      # debugger
      # site.data.resources
      # site.static_files.each do |f|
      #   next unless f.relative_path.starts_with?("/resources/datasheets")
      # add_resource
    end
    # Dir.glob(site.source + "/resources/**/*").each do |path|
    #   next if File.directory?(path)
    #   next if File.basename(path) == 'index.erb'

    #   if path.include?("datasheets")
    #     add_resource :datasheets,
    #   end
    # end
  end
end
