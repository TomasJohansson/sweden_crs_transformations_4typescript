import { CrsProjection } from '../src/crs_projection';

const epsgNumberForWgs84 = 4326;
const epsgNumberForSweref99tm = 3006; // https://epsg.org/crs_3006/SWEREF99-TM.html
const epsgNumberForRT90_5_0_gon_o = 3024;
const numberOfSweref99projections = 13; // with EPSG numbers 3006-3018
const numberOfRT90projections = 6; // with EPSG numbers 3019-3024
const numberOfWgs84Projections = 1; // just to provide semantic instead of using a magic number 1 below
const totalNumberOfProjections = numberOfSweref99projections + numberOfRT90projections + numberOfWgs84Projections;

let _wgs84Projections: Array<CrsProjection>;
let _sweref99Projections: Array<CrsProjection>;
let _rt90Projections: Array<CrsProjection>;
let _allCrsProjections: Array<CrsProjection>;

beforeEach(() => {
  _wgs84Projections = [CrsProjection.wgs84];
  
  // the usages of Set below is just for trying to avoid adding duplicates

   const sweref99Projections = new Set<CrsProjection>([
     CrsProjection.sweref_99_12_00, CrsProjection.sweref_99_13_30, CrsProjection.sweref_99_14_15,
     CrsProjection.sweref_99_15_00, CrsProjection.sweref_99_15_45, CrsProjection.sweref_99_16_30,
     CrsProjection.sweref_99_17_15, CrsProjection.sweref_99_18_00, CrsProjection.sweref_99_18_45,
     CrsProjection.sweref_99_20_15, CrsProjection.sweref_99_21_45, CrsProjection.sweref_99_23_15,
     CrsProjection.sweref_99_tm
    ]);
    _sweref99Projections = Array.from(sweref99Projections);
  
    const rt90Projections = new Set<CrsProjection>([
    CrsProjection.rt90_0_0_gon_v, CrsProjection.rt90_2_5_gon_o, CrsProjection.rt90_2_5_gon_v,
    CrsProjection.rt90_5_0_gon_o, CrsProjection.rt90_5_0_gon_v, CrsProjection.rt90_7_5_gon_v
  ]);
  _rt90Projections = Array.from(rt90Projections);


  _allCrsProjections = CrsProjection.getAllCrsProjections();
});

test('getEpsgNumber', () => {
  expect(
    CrsProjection.wgs84.getEpsgNumber()
  ).toEqual(
    epsgNumberForWgs84
  );

  expect(
    CrsProjection.sweref_99_tm.getEpsgNumber()
  ).toEqual(
    epsgNumberForSweref99tm
  );

  expect(
    CrsProjection.rt90_5_0_gon_o.getEpsgNumber()
  ).toEqual(
    epsgNumberForRT90_5_0_gon_o  
  );
});

test('isWgs84', () => {
  expect(CrsProjection.wgs84.isWgs84()).toEqual(true);
  expect(CrsProjection.sweref_99_tm.isWgs84()).toEqual(false);
  expect(CrsProjection.rt90_0_0_gon_v.isWgs84()).toEqual(false);

  expect(_wgs84Projections.length).toEqual(numberOfWgs84Projections);

  for(var crsProjection of _wgs84Projections) {
    expect(crsProjection.isWgs84()).toEqual(true);
  }
  for(var crsProjection of _sweref99Projections) {
    expect(crsProjection.isWgs84()).toEqual(false);
  }
  for(var crsProjection of _rt90Projections) {
    expect(crsProjection.isWgs84()).toEqual(false);
  }
});

test('isSweref', () => {
  expect(CrsProjection.wgs84.isSweref()).toEqual(false);
  expect(CrsProjection.sweref_99_tm.isSweref()).toEqual(true);
  expect(CrsProjection.rt90_0_0_gon_v.isSweref()).toEqual(false);

  expect(_sweref99Projections.length).toEqual(numberOfSweref99projections);

  for(var crsProjection of _wgs84Projections) {
    expect(crsProjection.isSweref()).toEqual(false);
  }
  for(var crsProjection of _sweref99Projections) {
    expect(crsProjection.isSweref()).toEqual(true);
  }
  for(var crsProjection of _rt90Projections) {
    expect(crsProjection.isSweref()).toEqual(false);
  }    
});

test('isRT90', () => {
  expect(CrsProjection.wgs84.isRT90()).toEqual(false);
  expect(CrsProjection.sweref_99_tm.isRT90()).toEqual(false);
  expect(CrsProjection.rt90_0_0_gon_v.isRT90()).toEqual(true);

  expect(_rt90Projections.length).toEqual(numberOfRT90projections);

  for(var crsProjection of _wgs84Projections) {
    expect(crsProjection.isRT90()).toEqual(false);
  }
  for(var crsProjection of _sweref99Projections) {
    expect(crsProjection.isRT90()).toEqual(false);
  }
  for(var crsProjection of _rt90Projections) {
    expect(crsProjection.isRT90()).toEqual(true);
  }
});    

test('getAsString', () => {
  expect(
    CrsProjection.wgs84.getAsString()
  ).toEqual(
    "WGS84"
  );

  expect(
    CrsProjection.sweref_99_tm.getAsString()
  ).toEqual(
    "SWEREF_99_TM"
  );

  expect(
    CrsProjection.sweref_99_14_15.getAsString()
  ).toEqual(
    "SWEREF_99_14_15"
  );

  expect(
    CrsProjection.rt90_0_0_gon_v.getAsString()
  ).toEqual(
    "RT90_0_0_GON_V"
  );
}); 


test('getCrsProjectionByEpsgNumber', () => {
  expect(
    CrsProjection.getCrsProjectionByEpsgNumber(epsgNumberForSweref99tm)
  ).toEqual(
    CrsProjection.sweref_99_tm
  );

  expect(
    CrsProjection.getCrsProjectionByEpsgNumber(3018) // https://epsg.io/3018
  ).toEqual(
    CrsProjection.sweref_99_23_15
  );

  expect(
    CrsProjection.getCrsProjectionByEpsgNumber(3024)  // https://epsg.io/3024
  ).toEqual(
    CrsProjection.rt90_5_0_gon_o
  );
});

test('verifyTotalNumberOfProjections', () => {
  expect(
    _allCrsProjections.length // retrieved with 'GetAllCrsProjections' in the SetUp method
  ).toEqual(
    totalNumberOfProjections
  );
});

test('verifyNumberOfWgs84Projections', () => {
  expect(_allCrsProjections.filter((crs) => crs.isWgs84()).length).toEqual(numberOfWgs84Projections);
});

test('verifyNumberOfSweref99Projections', () => {
  expect(_allCrsProjections.filter((crs) => crs.isSweref()).length).toEqual(numberOfSweref99projections);
});

test('verifyNumberOfRT90Projections', () => {
  expect(_allCrsProjections.filter((crs) => crs.isRT90()).length).toEqual(numberOfRT90projections);
});

test('verifyThatAllProjectionsCanBeRetrievedByItsEpsgNumber', () => {
  for(var crsProjection of _allCrsProjections) {
    var crsProj = CrsProjection.getCrsProjectionByEpsgNumber(crsProjection.getEpsgNumber());
    expect(crsProjection).toEqual(crsProj);
  }
});