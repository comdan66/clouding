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
  $('#footer .links > div > b > label').click(function() {
    $(this).closest('div').addClass('show').siblings().removeClass('show')
  })
  $('#play-tab').each(function() {
    let $that = $(this)
    $that.find('label').click(function() {
      $('#play-pc .p1, #play-pc .p2, #play-pc .p3, #play-pc .p4').removeClass('show');
      $('#play-pc .p' + ($(this).index() + 1)).addClass('show');
    }).eq(parseInt($that.find('.tabs').attr('index'), 10) - 1).click()
  })
  $('#play-pc .q-a .qa, #play-mb .q-a .qa').each(function() {
    $(this).find('label').click(function() {
      $(this).closest('.qa').addClass('show').siblings().removeClass('show')
    })
  })

  $('#play-mb.d-1 .menu').each(function() {
    let $that = $(this)
    let $div = $that.find('div')
    
    let $label = $that.find('label').click(function() {
      $that.toggleClass('show')
    }).text($div.first().text())

    $div.click(function() {
      let $div = $(this)
      $label.text($div.text())
      $that.toggleClass('show')
      $('#play-mb .p1, #play-mb .p2, #play-mb .p3, #play-mb .p4').removeClass('show');
      $('#play-mb .p' + $div.index()).addClass('show');
    })
    $('#play-mb .p1').addClass('show');
  })
  $('#play-mb.d-1 .banner').each(function() {
    let $that = $(this).attr('i', 1)
    let $img = $that.find('.img')

    $(Array.apply(null, { length: $img.length }).map(_ => $('<label />'))).map($.fn.toArray).appendTo($that.find('.pages')).click(function() {
      $that.attr('i', $(this).index() + 1)
    })
  })
  $('#play-pc.d-1 .banner').each(function() {
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

  $('#play-mb.d-2 .banner').each(function() {
    let $that = $(this).attr('i', 1)
    let $img = $that.find('.img')

    $(Array.apply(null, { length: $img.length }).map(_ => $('<label />'))).map($.fn.toArray).appendTo($that.find('.pages')).click(function() {
      $that.attr('i', $(this).index() + 1)
    })
  })
  $('#play-pc.d-2 .banner').each(function() {
    let $that = $(this).find('.bottom').attr('i', 1)
    let $main = $(this).find('.main')
    let $images = $(this).find('.images > *').click(function() {
      $that.attr('i', $(this).index() + 1)
      $main.css('background-image', 'url(' + $(this).data('url') + ')')
    })
    $images.each(function() {
      let $that = $(this)
      $that.css('background-image', 'url(' + $that.data('url') + ')')
    })

    let length = $images.length
    let left = $that.find('.left').click(i => {
      i = parseInt($that.attr('i'), 10) - 1
      $images.eq((i <= 0 ? length : i) - 1).click()
    })
    let right = $that.find('.right').click(i => {
      i = parseInt($that.attr('i'), 10) + 1
      $images.eq((i > length ? 1 : i) - 1).click()
    })
  })

  // Gmap.key('') 裡面請放 key，如 Gmap.key('SDQER#123et23dsdferg')
  $('.google-map').length && Gmap.key('').done(_ => {
    $('.map-location').each(function() {
      let $that = $(this)
      let $gmap = $that.find('.gmap')
      let $zoom = $that.find('.zoom label')
      let lat = parseFloat($gmap.data('lat'))
      let lng = parseFloat($gmap.data('lng'))
      let title = $gmap.data('title')
      if (lat === undefined || lng === undefined || title === undefined) return

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

      let marker = Marker()
      marker.map = gmap
      marker.height = 40
      marker.top = -20
      marker.position = new google.maps.LatLng(lat, lng)
      marker.class = 'marker active'
      marker.html = '<div class="pin"><i></i></div><div class="title">' + title + '</div>'
      marker.width = 80
      marker.left = 30
    })

    $('#intro-article-a aside').each(function() {
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
    })
  })

  // $('.intro-a .point').length && Gmap.key('').done(_ => )

})