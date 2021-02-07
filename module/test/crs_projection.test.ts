import { CrsProjection } from '../src/crs_projection';

test('CrsProjection.getAsString', () => {
  expect(CrsProjection.wgs84.valueOf()).toEqual(4326);
  expect(CrsProjection.sweref_99_tm.valueOf()).toEqual(3006);
  expect(CrsProjection.rt90_5_0_gon_o.valueOf()).toEqual(3024);
});