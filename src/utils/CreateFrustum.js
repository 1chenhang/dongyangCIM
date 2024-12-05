class CreateFrustum {
  constructor(options) {
    this.position = options.position
    this.orientation = options.orientation
    this.fov = options.fov || 30
    this.near = options.near || 10
    this.far = options.far || 100
    this.aspectRatio = options.aspectRatio
    this.add()
  }

  // 更新视锥体的姿态
  update (position, orientation) {
    this.position = position
    this.orientation = orientation
    this.add()
  }

  // 创建视锥体和轮廓线
  add () {
    this.clear()
    this.addFrustum()
    this.addOutline()
  }

  // 清除视锥体和轮廓线
  clear () {
    this.clearFrustum()
    this.clearOutline()
  }

  // 清除视锥体
  clearFrustum () {
    if (this.frustumPrimitive) {
      viewer.scene.primitives.remove(this.frustumPrimitive)
      this.frustumPrimitive = null
    }
  }

  // 清除轮廓线
  clearOutline () {
    if (this.outlinePrimitive) {
      viewer.scene.primitives.remove(this.outlinePrimitive)
      this.outlinePrimitive = null
    }
  }

  // 创建视锥体
  addFrustum () {
    const frustum = new Cesium.PerspectiveFrustum({
      fov: Cesium.Math.toRadians(this.fov),
      aspectRatio: this.aspectRatio,
      near: this.near,
      far: this.far
    })
    const geometry = new Cesium.FrustumGeometry({
      frustum: frustum,
      origin: this.position,
      orientation: this.orientation,
      vertexFormat: Cesium.VertexFormat.POSITION_ONLY
    })
    const instance = new Cesium.GeometryInstance({
      geometry: geometry,
      attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(
          new Cesium.Color(1.0, 0.0, 0.0, 0.5)
        )
      }
    })
    const primitive = new Cesium.Primitive({
      geometryInstances: instance,
      appearance: new Cesium.PerInstanceColorAppearance({
        closed: true,
        flat: true
      }),
      asynchronous: false
    })
    this.frustumPrimitive = viewer.scene.primitives.add(primitive)
  }

  // 创建轮廓线
  addOutline () {
    const frustum = new Cesium.PerspectiveFrustum({
      fov: Cesium.Math.toRadians(this.fov),
      aspectRatio: this.aspectRatio,
      near: this.near,
      far: this.far
    })
    const geometry = new Cesium.FrustumOutlineGeometry({
      frustum: frustum,
      origin: this.position,
      orientation: this.orientation,
      vertexFormat: Cesium.VertexFormat.POSITION_ONLY
    })
    const instance = new Cesium.GeometryInstance({
      geometry: geometry,
      attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(
          new Cesium.Color(1.0, 1.0, 0.0, 1.0)
        )
      }
    })
    const primitive = new Cesium.Primitive({
      geometryInstances: instance,
      appearance: new Cesium.PerInstanceColorAppearance({
        closed: true,
        flat: true
      }),
      asynchronous: false
    })
    this.outlinePrimitive = viewer.scene.primitives.add(primitive)
  }

  // 新增方法：朝向指定点
  lookAt (targetPosition) {
    const direction = Cesium.Cartesian3.subtract(targetPosition, this.position, new Cesium.Cartesian3())
    const normalizedDirection = Cesium.Cartesian3.normalize(direction, new Cesium.Cartesian3())
    const up = Cesium.Cartesian3.UNIT_Z // 假设上方向为Z轴正方向
    const right = Cesium.Cartesian3.cross(up, normalizedDirection, new Cesium.Cartesian3())
    Cesium.Cartesian3.normalize(right, right)
    const adjustedUp = Cesium.Cartesian3.cross(normalizedDirection, right, new Cesium.Cartesian3())

    const rotationMatrix = Cesium.Matrix3.setColumn(new Cesium.Matrix3(), 0, right, new Cesium.Matrix3())
    Cesium.Matrix3.setColumn(rotationMatrix, 1, adjustedUp, rotationMatrix)
    Cesium.Matrix3.setColumn(rotationMatrix, 2, normalizedDirection, rotationMatrix)

    const orientation = Cesium.Quaternion.fromRotationMatrix(rotationMatrix)
    this.update(this.position, orientation)
  }
}

export default CreateFrustum
