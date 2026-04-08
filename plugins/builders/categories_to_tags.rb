class Builders::CategoriesToTags < SiteBuilder
  def build
    # The RSS feed plugin expects "tags" instead of "categories",
    # so copy them
    hook :posts, :post_read do |post|
      if post.data['tags'].empty?
        post.data['tags'] = post.data['categories']
      end
    end
  end
end
