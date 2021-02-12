import {CrsProjection as CrsProj, CrsCoordinate} from 'sweden_crs_transformations_typescript';
// The above statement works if package.json includes the line below:
// "type": "module",

// But without type the above mentioned "type": "module" then the line below works instead:
// const { CrsProjection: CrsProj, CrsCoordinate } = require('sweden_crs_transformations_typescript');

//const wgs84: CrsProj = CrsProj.wgs84; // can be activated just to see that it does not work since this is javascript and not typescript
const wgs84 = CrsProj.wgs84;

console.log("EPSG " + wgs84.getEpsgNumber());
const coordWgs84 = CrsCoordinate.createCoordinate(wgs84, 59.33, 18.06);
const coordSweref = coordWgs84.transform(CrsProj.sweref_99_tm);
console.log("coordSweref X " + coordSweref.xLongitude);
console.log("coordSweref Y " + coordSweref.yLatitude);
