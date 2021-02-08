import CrsCoordinate from '../src/crs_coordinate';
import { CrsProjection } from '../src/crs_projection';
import Assert from './dot_net_helpers';

const epsgNumberForSweref99tm = 3006; // https://epsg.org/crs_3006/SWEREF99-TM.html

// https://kartor.eniro.se/m/XRCfh
    //WGS84 decimal (lat, lon)      59.330231, 18.059196
    //RT90 (nord, öst)              6580994, 1628294
    //SWEREF99 TM (nord, öst)       6580822, 674032
const stockholmCentralStation_WGS84_latitude = 59.330231;
const stockholmCentralStation_WGS84_longitude = 18.059196;
const stockholmCentralStation_RT90_northing = 6580994;
const stockholmCentralStation_RT90_easting = 1628294;
const stockholmCentralStation_SWEREF99TM_northing = 6580822;
const stockholmCentralStation_SWEREF99TM_easting = 674032;

test('transform', () => {
  const stockholmWGS84 = CrsCoordinate.createCoordinate(
    CrsProjection.wgs84,
    stockholmCentralStation_WGS84_latitude,      
    stockholmCentralStation_WGS84_longitude
  );
  
  const stockholmSWEREF99TM = CrsCoordinate.createCoordinate(
    CrsProjection.sweref_99_tm,
    stockholmCentralStation_SWEREF99TM_northing,      
    stockholmCentralStation_SWEREF99TM_easting
  );

  const stockholmRT90 = CrsCoordinate.createCoordinate(
    CrsProjection.rt90_2_5_gon_v,
    stockholmCentralStation_RT90_northing,      
    stockholmCentralStation_RT90_easting
  );

  // Transformations to WGS84 (from SWEREF99TM and RT90):
  _AssertEqual(
    stockholmWGS84, // expected WGS84
    stockholmSWEREF99TM.transform(CrsProjection.wgs84) // actual/transformed WGS84
  );
  _AssertEqual(
    stockholmWGS84, // expected WGS84
    stockholmRT90.transform(CrsProjection.wgs84) // actual/transformed WGS84
  );
  // below is a similar test as one of the above tests but using the overloaded Transform method
  // which takes an integer as parameter instead of an instance of the enum CrsProjection
  const epsgNumberForWgs84 = CrsProjection.wgs84.getEpsgNumber();
  _AssertEqual(
    stockholmWGS84,
    stockholmRT90.transformByEpsgNumber(epsgNumberForWgs84) // testing the overloaded Transform method with an integer parameter
  );


  // Transformations to SWEREF99TM (from WGS84 and RT90):
  _AssertEqual(
    stockholmSWEREF99TM, // expected SWEREF99TM
    stockholmWGS84.transform(CrsProjection.sweref_99_tm) // actual/transformed SWEREF99TM
  );
  _AssertEqual(
    stockholmSWEREF99TM, // expected SWEREF99TM
    stockholmRT90.transform(CrsProjection.sweref_99_tm) // actual/transformed SWEREF99TM
  );


  // Transformations to RT90 (from WGS84 and SWEREF99TM):
  _AssertEqual(
    stockholmRT90,  // expected RT90
    stockholmWGS84.transform(CrsProjection.rt90_2_5_gon_v) // actual/transformed RT90
  );
  _AssertEqual(
    stockholmRT90,  // expected RT90
    stockholmSWEREF99TM.transform(CrsProjection.rt90_2_5_gon_v) // actual/transformed RT90
  );
});

test('createCoordinateByEpsgNumber', () => {
  const x = 20.0;
  const y = 60.0;
  const crsCoordinate = CrsCoordinate.createCoordinateByEpsgNumber(epsgNumberForSweref99tm, y, x);
  Assert.AreEqual(epsgNumberForSweref99tm, crsCoordinate.crsProjection.getEpsgNumber());
  Assert.AreEqual(x, crsCoordinate.xLongitude);
  Assert.AreEqual(y, crsCoordinate.yLatitude);
});

test('createCoordinate', () => {
  const x = 22.5;
  const y = 62.5;
  const crsCoordinate = CrsCoordinate.createCoordinate(CrsProjection.sweref_99_tm, y, x);
  Assert.AreEqual(epsgNumberForSweref99tm, crsCoordinate.crsProjection.getEpsgNumber());
  Assert.AreEqual(CrsProjection.sweref_99_tm, crsCoordinate.crsProjection);
  Assert.AreEqual(x, crsCoordinate.xLongitude);
  Assert.AreEqual(y, crsCoordinate.yLatitude);
});

test('equalityTest', () => {
  const coordinateInstance_1 = CrsCoordinate.createCoordinate(CrsProjection.wgs84, stockholmCentralStation_WGS84_latitude, stockholmCentralStation_WGS84_longitude);
  const coordinateInstance_2 = CrsCoordinate.createCoordinate(CrsProjection.wgs84, stockholmCentralStation_WGS84_latitude, stockholmCentralStation_WGS84_longitude);
  Assert.AreEqual(coordinateInstance_1, coordinateInstance_2);
  // From the Dart library:
  // Assert.AreEqual(coordinateInstance_1.hashCode, coordinateInstance_2.hashCode); // Dart
  // Assert.AreEqual(coordinateInstance_1, coordinateInstance_2);
  // Assert.IsTrue(coordinateInstance_1 == coordinateInstance_2);
  // Assert.IsTrue(coordinateInstance_2 == coordinateInstance_1);
  // Assert.IsFalse(coordinateInstance_1 != coordinateInstance_2);
  // Assert.IsFalse(coordinateInstance_2 != coordinateInstance_1);

  let delta = 0.000000000000001; // see comments further below regarding the value of "delta"
  const coordinateInstance_3 = CrsCoordinate.createCoordinate(
    CrsProjection.wgs84,
    stockholmCentralStation_WGS84_latitude + delta,      
    stockholmCentralStation_WGS84_longitude + delta

  );
  // Assert.AreEqual(coordinateInstance_1.hashCode, coordinateInstance_3.hashCode); // Dart
  Assert.AreEqual(coordinateInstance_1, coordinateInstance_3);
  // From the Dart library:
  // Assert.IsTrue(coordinateInstance_1 == coordinateInstance_3); // method "operator =="  // Dart
  // Assert.IsTrue(coordinateInstance_3 == coordinateInstance_1);
  // Assert.IsFalse(coordinateInstance_1 != coordinateInstance_3);
  // Assert.IsFalse(coordinateInstance_3 != coordinateInstance_1);    

  // Regarding the chosen value for "delta" (which is added to the lon/lat values, to create a slightly different value) above and below,
  // it is because of experimentation this "breakpoint" value has been determined, i.e. the above value still resulted in equality 
  // but when it was increased as below with one decimal then the above kind of assertions failed and therefore the other assertions below 
  // are used instead e.g. testing the overloaded operator "!=".
  // You should generally be cautios when comparing floating point values but the above test indicate that values are considered equal even though 
  // the difference is as 'big' as in the "delta" value above.

  delta = delta * 10; // moving the decimal one bit to get a somewhat larger values, and then the instances are not considered equal, as you can see in the tests below.
  const coordinateInstance_4 = CrsCoordinate.createCoordinate(
    CrsProjection.wgs84,
    stockholmCentralStation_WGS84_latitude + delta,      
    stockholmCentralStation_WGS84_longitude + delta
  );
  expect(coordinateInstance_1).not.toEqual(coordinateInstance_4); // TODO remove the Assert class ... and use jest ('expect...') directly everywhere
  // Note that below are the Are*NOT*Equal assertions made instead of AreEqual as further above when a smaller delta value was used
  // From the Dart library:
  // Assert.IsTrue(coordinateInstance_1 != coordinateInstance_4); // Note that the method "operator !=" becomes used here
  // Assert.IsTrue(coordinateInstance_4 != coordinateInstance_1);
  // Assert.IsFalse(coordinateInstance_4 == coordinateInstance_1);
  // Assert.IsFalse(coordinateInstance_4 == coordinateInstance_1);
});


test('toStringTest', () => {
  const coordinate = CrsCoordinate.createCoordinate(CrsProjection.sweref_99_18_00, 6579457.649, 153369.673);
  Assert.AreEqual(
    "CrsCoordinate [ Y: 6579457.649 , X: 153369.673 , CRS: SWEREF_99_18_00 ]",
    coordinate.toString()
  );

  

  const coordinate2 = CrsCoordinate.createCoordinate(CrsProjection.wgs84, 59.330231, 18.059196);
  const expectedDefaultToStringResultForCoordinate2 = "CrsCoordinate [ Latitude: 59.330231 , Longitude: 18.059196 , CRS: WGS84 ]";
  Assert.AreEqual(
      expectedDefaultToStringResultForCoordinate2,
      coordinate2.toString()
  );

  // now below testing the same coordinate as above but with a custom 'ToString' implementation
  CrsCoordinate.setToStringImplementation(_myCustomToStringFunction);
  Assert.AreEqual(
    "18.059196 , 59.330231",
    coordinate2.toString()
  );
  
  CrsCoordinate.setToStringImplementationDefault(); // restores the default 'ToString' implementation
  Assert.AreEqual(
      expectedDefaultToStringResultForCoordinate2,
      coordinate2.toString()
  );    
});


function _AssertEqual(crsCoordinate_1: CrsCoordinate, crsCoordinate_2: CrsCoordinate): void  {
  Assert.AreEqual(crsCoordinate_1.crsProjection, crsCoordinate_2.crsProjection);
  const maxDifference = crsCoordinate_1.crsProjection.isWgs84() ? 0.000007 : 0.5; // the other (i.e. non-WGS84) value is using meter as unit, so 0.5 is just five decimeters difference
  const diffLongitude = Math.abs((crsCoordinate_1.xLongitude - crsCoordinate_2.xLongitude));
  const diffLatitude = Math.abs((crsCoordinate_1.yLatitude - crsCoordinate_2.yLatitude));
  
  Assert.IsTrue(diffLongitude < maxDifference);
  Assert.IsTrue(diffLatitude < maxDifference);
}

function _myCustomToStringFunction(coordinate: CrsCoordinate): string {
  return `${coordinate.xLongitude} , ${coordinate.yLatitude}`;
}