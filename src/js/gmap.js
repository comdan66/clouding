/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 - 2021, Lalilo
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */

const Marker = function(parentEl) {
  if (!(this instanceof Marker)) return new Marker(parentEl)
  
  this.top      = 0
  this.left     = 0
  this.width    = 0
  this.height   = 0

  this.map      = null
  this.html     = null
  this.click    = null
  this.class    = null
  this.position = null
  this.background = null
  this.css      = {}

  this.parentEl = !(parentEl instanceof HTMLElement) ? parentEl instanceof Vue ? parentEl.$el : document.body : parentEl
  this.pixel    = null

  this.$$ = new Vue({
    data: this, methods: this,
    computed: {
      className () { return this.class },
      style () { return this.pixel && this.$el ? {
        ...this.css,
        position: 'absolute', display: 'inline-block', background: this.background,
        top: (this.pixel.y - (this.height || this.$el.offsetHeight) / 2) + this.top + 'px',
        left: (this.pixel.x - (this.width || this.$el.offsetWidth) / 2) + this.left + 'px',
        width: this.width + 'px',
        height: this.height + 'px' } : { display: 'none' } },
      on () { return this.click ? { click: this.click.bind(this) } : {} }
    },
    watch: {
      map: function() { return this.setMap(this.map) }.bind(this),
      position: function() { return this.draw() }.bind(this)
    },
    template: `<div :class=className :style=style v-html=html v-on=on></div>`
  })
}

const Gmap = {
  _keys: [],
  _done: null,
  _inited: false,
  key (...keys) {
    return this._keys = keys, this
  },
  done (done) {
    return this._done = done, this.init()
  },
  init () {
    if (window.google && window.google.maps && window.google.maps.Map)
      return this._done && this._done()

    const key = this._keys[Math.floor((Math.random() * this._keys.length))]
    if (key === undefined) throw Error('沒有設置 Google Maps key!')

    const base = _ => {
      if (this.inited) return
      else this.inited = window.google && window.google.maps && window.google.maps.Map

      Marker && void function() {
        Marker.prototype = Object.create(google.maps.OverlayView.prototype)

        Object.assign(Marker.prototype, {
          draw () { this.$$.pixel = this.$$.$el && this.$$.position ? this.getProjection().fromLatLngToDivPixel(this.$$.position) : null },
          onAdd () { this.$$.$el || this.parentEl.appendChild(this.$$.$mount().$el), this.getPanes().overlayImage.appendChild(this.$$.$el) },
          remove () { this.$$.$el && this.$$.$el.parentNode.removeChild(this.$$.$el), this.$$.$el = null }
        })
      }()

      this._done && this._done()
    }
    
    window.gmc = _ => base()
    $.getScript(`https://maps.googleapis.com/maps/api/js?key=${key}&language=zh-TW&libraries=visualization&callback=gmc`, base)

    return this
  }
}
