const mapCommon = {}
// 创建扇形
mapCommon.createCesiumSector = function (viewer, centerLongitude, centerLatitude, radius, startAngle, endAngle) {
  const center = Cesium.Cartesian3.fromDegrees(centerLongitude, centerLatitude)

  const positions = [center]
  for (let i = startAngle; i <= endAngle; i++) {
    const bearing = Cesium.Math.toRadians(i)
    const offset = Cesium.Cartesian3.fromDegrees(
      centerLongitude + (radius * Math.sin(bearing) / (111320 * Math.cos(Cesium.Math.toRadians(centerLatitude)))),
      centerLatitude + (radius * Math.cos(bearing) / 111320)
    )
    positions.push(offset)
  }
  positions.push(center)

  viewer.entities.add({
    name: 'Sector',
    polygon: {
        hierarchy: new Cesium.CallbackProperty(() => {
          const currentTime = (Date.now() / 1000) % 360; // Current time for animation
          const phase = Math.sin(currentTime) * 10; // Sine wave for animation

          const animatedPositions = mapCommon.computeSectorPositions(centerLongitude, centerLatitude, radius, phase);

          return new Cesium.PolygonHierarchy(animatedPositions);
        }, false),
        material: Cesium.Color.RED.withAlpha(0.5)
      }
  })

  viewer.zoomTo(viewer.entities)
}

mapCommon.computeSectorPositions = function(centerLongitude, centerLatitude, radius, height = 0.0) {
    const positions = [Cesium.Cartesian3.fromDegrees(centerLongitude, centerLatitude, height)];
    for (let i = -15; i <= 15; i++) {
      const bearing = Cesium.Math.toRadians(i);
      const offset = Cesium.Cartesian3.fromDegrees(
        centerLongitude + (radius * Math.sin(bearing) / (111320 * Math.cos(Cesium.Math.toRadians(centerLatitude)))),
        centerLatitude + (radius * Math.cos(bearing) / 111320),
        height
      );
      positions.push(offset);
    }
    positions.push(Cesium.Cartesian3.fromDegrees(centerLongitude, centerLatitude, height)); // Close the polygon by adding the center again

    return positions;
}
export default mapCommon
