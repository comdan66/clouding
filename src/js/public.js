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

})