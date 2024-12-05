/**
 * 3D场景气泡框
 * @constructor
 */

class Popup {
  constructor (opt) {
    this._viewer = opt.viewer
    this.element = opt.element // dom or id
    this.position = opt.position // Cartesian3
    this.pixelOffset = opt.pixelOffset || new Cesium.Cartesian2(0, 0) // 像素偏移
    this._show = opt.show || false
    this.hideOnBehindGlobe = opt.hideOnBehindGlobe || false // 是否在地球背面隐藏
    this.scaleByDistance = opt.scaleByDistance // 距离控制大小
    this.translucencyByDistance = opt.translucencyByDistance // 距离控制透明度
    this.distanceDisplayCondition = opt.distanceDisplayCondition // 距离控制显隐
    this.scratch = new Cesium.Cartesian2()
    this.RemoveCallback = function () { }
    this.init(opt)
  }

  init (opt) {
    // 在Cesium容器中添加元素
    if (typeof opt.element === 'string') {
      this.element = document.getElementById(opt.element)
    }
    this.close()
    if (!this._viewer) {
      console.log('Popup :viewer is required!')
      return
    }
    if (this.element && this.element.style) {
      // this.element.style.pointerEvents = 'none'
      this.element.style.transformOrigin = 'left bottom 0px' // 缩放中心点
      this._viewer.container.appendChild(this.element)
      this.setViewer()
      if (this.position) {
        setTimeout(() => {
          this.setPosition(opt.position)
        }, 1000)
      }
    }
  }

  /**
   * 设置关联的cesium viewer
   * @param viewer
   */
  setViewer () {
    const _self = this

    // 每一帧触发
    // _self.RemoveCallback = _self._viewer.scene.preRender.addEventListener(function () {
    //     if (_self._show) {
    //         _self.update()
    //     }
    // });

    // 相机改变触发
    _self.RemoveCallback = _self._viewer.camera.changed.addEventListener(
      function () {
        if (_self._show) {
          _self.update()
        }
      }
    )
  }

  /**
   * 获取关联的cesium viewer
   * @return {Cesium.Viewer}
   */
  getViewer () {
    return this._viewer
  }

  /**
   * 设置位置
   * @param position{Array}
   */
  setPosition (position) {
    const _self = this
    if (!position) {
      _self.close()
      // console.log('setPosition-close');
      return
    }
    _self.position = position
    if (!_self.getViewer()) {
      return
    }
    const canvasPosition = _self
      .getViewer()
      .scene.cartesianToCanvasCoordinates(position, _self.scratch) // 笛卡尔坐标到画布坐标
    if (Cesium.defined(canvasPosition)) {
      if (_self.element && _self.element.style) {
        _self.element.style.top = canvasPosition.y + _self.pixelOffset.y + 'px'
        _self.element.style.left = canvasPosition.x + _self.pixelOffset.x + 'px'
        // _self.element.style.transform = `matrix(1, 0, 0, 1, ${canvasPosition.x + _self.pixelOffset.x}, ${canvasPosition.y + _self.pixelOffset.y})`;
        _self.show()
        // console.log('setPosition-show');
        if (
          _self.hideOnBehindGlobe ||
          _self.distanceDisplayCondition ||
          _self.translucencyByDistance ||
          _self.scaleByDistance
        ) {
          const cameraPosition = _self.getViewer().camera.position
          const distance = Cesium.Cartesian3.distance(cameraPosition, position)
          if (_self.hideOnBehindGlobe) {
            const height = _self
              .getViewer()
              .scene.globe.ellipsoid.cartesianToCartographic(cameraPosition)
              .height
            // height += _self.getViewer().scene.globe.ellipsoid.maximumRadius
            // if (!(distance > height)) {
            //   _self.element.style.display = 'flex'
            // } else {
            //   _self.element.style.display = 'none'
            // }
          }
          if (_self.distanceDisplayCondition) {
            if (
              distance < _self.distanceDisplayCondition.near ||
              distance > _self.distanceDisplayCondition.far
            ) {
              _self.element.style.opacity = 0
              return
            } else {
              _self.element.style.opacity = 1
            }
          }
          if (_self.translucencyByDistance) {
            if (distance < _self.translucencyByDistance.near) {
              _self.element.style.opacity =
                _self.translucencyByDistance.nearValue
            } else if (distance > _self.translucencyByDistance.far) {
              _self.element.style.opacity = _self.translucencyByDistance.farValue
            } else {
              const val1 =
                _self.translucencyByDistance.farValue -
                _self.translucencyByDistance.nearValue
              const val2 =
                _self.translucencyByDistance.far -
                _self.translucencyByDistance.near
              const val3 =
                ((distance - _self.translucencyByDistance.near) / val2) * val1 +
                _self.translucencyByDistance.nearValue
              _self.element.style.opacity = val3
            }
          }
          if (_self.scaleByDistance) {
            if (distance < _self.scaleByDistance.near) {
              const val = _self.scaleByDistance.nearValue
              _self.element.style.transform = `scale(${val}, ${val})`
            } else if (distance > _self.scaleByDistance.far) {
              const val = _self.scaleByDistance.farValue
              _self.element.style.transform = `scale(${val}, ${val})`
            } else {
              const val1 =
                _self.scaleByDistance.farValue - _self.scaleByDistance.nearValue
              const val2 = _self.scaleByDistance.far - _self.scaleByDistance.near
              const val3 =
                ((distance - _self.scaleByDistance.near) / val2) * val1 +
                _self.scaleByDistance.nearValue
              _self.element.style.transform = `scale(${val3}, ${val3})`
            }
          }
        }
      }
    }
    // _self.position = position;
  }

  update () {
    if (this.position) {
      this.setPosition(this.position)
    }
  }

  getPosition () {
    return this.position
  }

  close () {
    if (this.element && this.element.style) {
      this.element.style.opacity = 0
      this._show = false
    }
  }

  show () {
    if (this.element && this.element.style) {
      this.element.style.opacity = 1
      this._show = true
    }
  }

  destroy () {
    this.RemoveCallback()
    this.close()
    if (this.element) {
      this._viewer.container.removeChild(this.element)
    }
  }
}
export default Popup
