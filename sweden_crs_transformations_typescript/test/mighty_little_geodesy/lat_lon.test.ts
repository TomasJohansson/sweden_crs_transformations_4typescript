import LatLon from '../../src/mighty_little_geodesy/lat_lon';

test('LatLon', () => {
  const latLon = new LatLon(12.34, 56.78);
  expect(latLon.yLatitude).toEqual(12.34);
  expect(latLon.xLongitude).toEqual(56.78);
});