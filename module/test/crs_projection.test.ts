import { CrsProjection } from '../src/crs_projection';

test('CrsProjection.getAsString', () => {
  expect(CrsProjection.wgs84.getEpsgNumber()).toEqual(4326);
  expect(CrsProjection.sweref_99_tm.getEpsgNumber()).toEqual(3006);
  expect(CrsProjection.rt90_5_0_gon_o.getEpsgNumber()).toEqual(3024);
});