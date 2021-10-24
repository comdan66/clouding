/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 - 2021, Lalilo
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */

$(_ => {
  $('#main-banner').each(function() {
    let $that = $(this).attr('i', 1)
    let $banner = $that.find('.banner')
    let $point = $(Array.apply(null, { length: $banner.length }).map(_ => $('<label />'))).map($.fn.toArray).appendTo($('<div />').addClass('points').appendTo($that)).click(function() {
      $that.attr('i', $(this).index() + 1)
    });
  })

  $('.partners').each(function() {
    let $that = $(this)
    let $logos = $that.find('.logos')
    $that.find('.more').click(_ => $logos.toggleClass('show'))
  })

  $('.company').each(function() {
    let $that = $(this)
    let $logos = $that.find('.links label').click(function() {
      $(this).closest('div').toggleClass('show')
    })
    $that.find('.links div').first().find('label').click()
  })

  $('.tabs').each(function() {
    let $that = $(this)
    $that.find('label').click(function() {
      $that.attr('index', $(this).index() + 1)
    })
  })

  $('#search-banner .range').each(function() {
    let $that   = $(this)
    let $from   = $that.find('.from')
    let $to     = $that.find('.to')
    let min     = parseInt($from.text(), 10)
    let max     = parseInt($to.text(), 10)
    let $slider = $that.find('.slider')

    $slider.slider({
      range: true, min, max, values: [0, 1000],
      slide: ( event, ui ) => {
        $from.text(ui.values.shift())
        $to.text(ui.values.shift())
      }
    })
  })

  $('#intro-tags').each(function() {
    let $that = $(this)
    $('<label />').text($that.find('a.active').text()).prependTo($that).click(_ => $that.toggleClass('show'))
  })
  $('#play-tab').each(function() {
    let $that = $(this)
    $that.find('label').click(function() {
      $('.p1, .p2, .p3, .p4').removeClass('show');
      $('.p' + ($(this).index() + 1)).addClass('show');
    }).eq(parseInt($that.find('.tabs').attr('index'), 10) - 1).click()
  })
  $('.q-a .qa').each(function() {
    $(this).find('label').click(function() {
      $(this).closest('.qa').addClass('show').siblings().removeClass('show')
    })
  })



  $('#play-pc .banner').each(function() {
    let $that = $(this)
    let $imgs = $that.find('.imgs')
    let $last = $that.find('.last').click(_ => {
      let $img = $imgs.find('.img').first()
      $img.clone(true).appendTo($imgs)
      $img.remove()
    })
    let $next = $that.find('.next').click(_ => {
      let $img = $imgs.find('.img').last()
      $img.clone(true).prependTo($imgs)
      $img.remove()
    })

  })

  // Gmap.key('') 裡面請放 key，如 Gmap.key('SDQER#123et23dsdferg')
  $('.point').length && Gmap.key('').done(_ => $('#intro-article-a aside').each(function() {
    let $that = $(this)
    let $gmap = $that.find('.gmap')
    let $zoom = $that.find('.zoom label')
    let lat = parseFloat($gmap.data('lat'))
    let lng = parseFloat($gmap.data('lng'))
    if (lat === undefined || lng === undefined) return
    
    let gmap = new google.maps.Map($gmap.get(0), {
      zoom: 12,
      center: new google.maps.LatLng(lat, lng),
      disableDoubleClickZoom: true,
      clickableIcons: false,
      disableDefaultUI: true,
      gestureHandling: 'greedy' })

    $zoom.click(function() {
      let zoom = gmap.zoom
      zoom += $(this).index() ? -1 : +1
      zoom = zoom > 20 ? 20 : zoom
      zoom = zoom < 0 ? 0 : zoom
      gmap.setOptions({ zoom })
    })
    const ori = marker => {
      marker.class = 'marker'
      marker.html = '<div class="pin"><i></i></div>'
      marker.width = 20
      marker.left = 0
      return marker
    }
    const click = (marker, title) => {
      marker.class = 'marker active'
      marker.html = '<div class="pin"><i></i></div><div class="title">' + title + '</div>'
      marker.width = 80
      marker.left = 30
      return marker
    }
    $that.find('.point').each(function() {
      let $that = $(this)
      let lat = parseFloat($that.data('lat'))
      let lng = parseFloat($that.data('lng'))
      if (lat === undefined || lng === undefined) return null

      let marker = Marker()
      marker.map = gmap
      marker.height = 40
      marker.top = -20
      marker.position = new google.maps.LatLng(lat, lng)

      $that.get(0)._marker = ori(marker)
    }).click(function() {
      let $that = $(this).addClass('active')
      if (!$that.get(0)._marker) return
      gmap.setOptions({ center: click($that.get(0)._marker, $that.find('b').text()).position })
      $that.siblings().removeClass('active').each(function() {
        ori($(this).get(0)._marker)
      })
    }).first().click()
  }))

})