const directives = {
  install (app) {
    // v - dialogDrag: 弹窗拖拽属性
    app.directive('drag', {
      mounted (n, { value = true }) {
        if (!value) return
        n.onmousedown = function (oevent) {
          // 阻止事件传播，防止影响父弹窗
          oevent.stopPropagation()
          const div1 = n
          const distanceX = oevent.clientX - div1.offsetLeft
          const distanceY = oevent.clientY - div1.offsetTop
          document.onmousemove = function (ev) {
            const oevent = ev || event
            let lefts = oevent.clientX - distanceX
            let tops = oevent.clientY - distanceY
            const clientX = document.body.clientWidth
            const clientY = document.body.clientHeight
            const currLayerWidth = div1.clientWidth
            const currLayerHeight = div1.clientHeight
            if (lefts < 0) lefts = 0
            if (lefts > (clientX - currLayerWidth)) lefts = clientX - currLayerWidth
            if (tops < 92) tops = 92
            if (tops > (clientY - currLayerHeight)) tops = clientY - currLayerHeight
            div1.style.left = lefts + 'px'
            div1.style.top = tops + 'px'
          }
          document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    })
  }
}
export default directives
