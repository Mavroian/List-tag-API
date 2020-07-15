var $ = jQuery.noConflict();

(function() {
  $(".dropdown-menu-1 a").click(function() {
  const tag =  $(this).text()
  $(this).attr('href' , `/${tag}`)
  })
  if($('.dropdown-menu-2')[0]) {
    $(".dropdown-menu-2 a").click(function() {
      const currentLocation = $(location).attr('href').replace(/(.+\w\/)(.+)/,"/$2")
      const town =  $(this).text()
      const url  = `${currentLocation.slice(1, currentLocation.length)}/${town}`
      $(this).attr('href' , url)
      })
  }
})(jQuery);