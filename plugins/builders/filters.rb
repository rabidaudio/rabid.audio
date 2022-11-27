# require 'debug'

class Builders::Filters < SiteBuilder
  def build
    liquid_filter :inline_stylesheet do |resource|
      path = Dir.glob(site.root_dir + "/{frontend/styles,node_modules}/" + resource).first
      raise StandardError, "Could not find stylesheet: `#{resource}`" unless path
      File.open(path, 'r') do |f|
        ['<style>',
        f.read,
        '</style>'].join
      end
    end
  end
end
