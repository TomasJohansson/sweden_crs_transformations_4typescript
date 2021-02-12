import {CrsProjection as CrsProj, CrsCoordinate} from 'sweden_crs_transformations_typescript';

const wgs84: CrsProj = CrsProj.wgs84;

console.log("epsg " + wgs84.getEpsgNumber());
const coordWgs84 = CrsCoordinate.createCoordinate(wgs84, 59.33, 18.06);
const coordSweref = coordWgs84.transform(CrsProj.sweref_99_tm);
console.log("coordSweref X " + coordSweref.xLongitude);
console.log("coordSweref Y " + coordSweref.yLatitude);