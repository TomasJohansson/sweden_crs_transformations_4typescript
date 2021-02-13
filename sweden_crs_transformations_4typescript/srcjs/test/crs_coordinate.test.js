"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crs_coordinate_1 = __importDefault(require("../src/crs_coordinate"));
var crs_projection_1 = __importDefault(require("../src/crs_projection"));
var epsgNumberForSweref99tm = 3006; // https://epsg.org/crs_3006/SWEREF99-TM.html
// https://kartor.eniro.se/m/XRCfh
//WGS84 decimal (lat, lon)      59.330231, 18.059196
//RT90 (nord, öst)              6580994, 1628294
//SWEREF99 TM (nord, öst)       6580822, 674032
var stockholmCentralStation_WGS84_latitude = 59.330231;
var stockholmCentralStation_WGS84_longitude = 18.059196;
var stockholmCentralStation_RT90_northing = 6580994;
var stockholmCentralStation_RT90_easting = 1628294;
var stockholmCentralStation_SWEREF99TM_northing = 6580822;
var stockholmCentralStation_SWEREF99TM_easting = 674032;
test('transform', function () {
    var stockholmWGS84 = crs_coordinate_1.default.createCoordinate(crs_projection_1.default.wgs84, stockholmCentralStation_WGS84_latitude, stockholmCentralStation_WGS84_longitude);
    var stockholmSWEREF99TM = crs_coordinate_1.default.createCoordinate(crs_projection_1.default.sweref_99_tm, stockholmCentralStation_SWEREF99TM_northing, stockholmCentralStation_SWEREF99TM_easting);
    var stockholmRT90 = crs_coordinate_1.default.createCoordinate(crs_projection_1.default.rt90_2_5_gon_v, stockholmCentralStation_RT90_northing, stockholmCentralStation_RT90_easting);
    // Transformations to WGS84 (from SWEREF99TM and RT90):
    _AssertEqual(stockholmWGS84, // expected WGS84
    stockholmSWEREF99TM.transform(crs_projection_1.default.wgs84) // actual/transformed WGS84
    );
    _AssertEqual(stockholmWGS84, // expected WGS84
    stockholmRT90.transform(crs_projection_1.default.wgs84) // actual/transformed WGS84
    );
    // below is a similar test as one of the above tests but using the overloaded Transform method
    // which takes an integer as parameter instead of an instance of the enum CrsProjection
    var epsgNumberForWgs84 = crs_projection_1.default.wgs84.getEpsgNumber();
    _AssertEqual(stockholmWGS84, stockholmRT90.transformByEpsgNumber(epsgNumberForWgs84) // testing the overloaded Transform method with an integer parameter
    );
    // Transformations to SWEREF99TM (from WGS84 and RT90):
    _AssertEqual(stockholmSWEREF99TM, // expected SWEREF99TM
    stockholmWGS84.transform(crs_projection_1.default.sweref_99_tm) // actual/transformed SWEREF99TM
    );
    _AssertEqual(stockholmSWEREF99TM, // expected SWEREF99TM
    stockholmRT90.transform(crs_projection_1.default.sweref_99_tm) // actual/transformed SWEREF99TM
    );
    // Transformations to RT90 (from WGS84 and SWEREF99TM):
    _AssertEqual(stockholmRT90, // expected RT90
    stockholmWGS84.transform(crs_projection_1.default.rt90_2_5_gon_v) // actual/transformed RT90
    );
    _AssertEqual(stockholmRT90, // expected RT90
    stockholmSWEREF99TM.transform(crs_projection_1.default.rt90_2_5_gon_v) // actual/transformed RT90
    );
});
test('createCoordinateByEpsgNumber', function () {
    var x = 20.0;
    var y = 60.0;
    var crsCoordinate = crs_coordinate_1.default.createCoordinateByEpsgNumber(epsgNumberForSweref99tm, y, x);
    expect(crsCoordinate.crsProjection.getEpsgNumber()).toEqual(epsgNumberForSweref99tm);
    expect(crsCoordinate.xLongitude).toEqual(x);
    expect(crsCoordinate.yLatitude).toEqual(y);
});
test('createCoordinate', function () {
    var x = 22.5;
    var y = 62.5;
    var crsCoordinate = crs_coordinate_1.default.createCoordinate(crs_projection_1.default.sweref_99_tm, y, x);
    expect(crsCoordinate.crsProjection.getEpsgNumber()).toEqual(epsgNumberForSweref99tm);
    expect(crsCoordinate.crsProjection).toEqual(crs_projection_1.default.sweref_99_tm);
    expect(crsCoordinate.xLongitude).toEqual(x);
    expect(crsCoordinate.yLatitude).toEqual(y);
});
test('equalityTest', function () {
    var coordinateInstance_1 = crs_coordinate_1.default.createCoordinate(crs_projection_1.default.wgs84, stockholmCentralStation_WGS84_latitude, stockholmCentralStation_WGS84_longitude);
    var coordinateInstance_2 = crs_coordinate_1.default.createCoordinate(crs_projection_1.default.wgs84, stockholmCentralStation_WGS84_latitude, stockholmCentralStation_WGS84_longitude);
    expect(coordinateInstance_1).toEqual(coordinateInstance_2);
    // From the Dart library:
    // Assert.AreEqual(coordinateInstance_1.hashCode, coordinateInstance_2.hashCode); // Dart
    // Assert.AreEqual(coordinateInstance_1, coordinateInstance_2);
    // Assert.IsTrue(coordinateInstance_1 == coordinateInstance_2);
    // Assert.IsTrue(coordinateInstance_2 == coordinateInstance_1);
    // Assert.IsFalse(coordinateInstance_1 != coordinateInstance_2);
    // Assert.IsFalse(coordinateInstance_2 != coordinateInstance_1);
    var delta = 0.000000000000001; // see comments further below regarding the value of "delta"
    var coordinateInstance_3 = crs_coordinate_1.default.createCoordinate(crs_projection_1.default.wgs84, stockholmCentralStation_WGS84_latitude + delta, stockholmCentralStation_WGS84_longitude + delta);
    // Assert.AreEqual(coordinateInstance_1.hashCode, coordinateInstance_3.hashCode); // Dart
    expect(coordinateInstance_1).toEqual(coordinateInstance_3);
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
    var coordinateInstance_4 = crs_coordinate_1.default.createCoordinate(crs_projection_1.default.wgs84, stockholmCentralStation_WGS84_latitude + delta, stockholmCentralStation_WGS84_longitude + delta);
    expect(coordinateInstance_1).not.toEqual(coordinateInstance_4);
    // Note that below are the Are*NOT*Equal assertions made instead of AreEqual as further above when a smaller delta value was used
    // From the Dart library:
    // Assert.IsTrue(coordinateInstance_1 != coordinateInstance_4); // Note that the method "operator !=" becomes used here
    // Assert.IsTrue(coordinateInstance_4 != coordinateInstance_1);
    // Assert.IsFalse(coordinateInstance_4 == coordinateInstance_1);
    // Assert.IsFalse(coordinateInstance_4 == coordinateInstance_1);
});
test('toStringTest', function () {
    var coordinate = crs_coordinate_1.default.createCoordinate(crs_projection_1.default.sweref_99_18_00, 6579457.649, 153369.673);
    expect(coordinate.toString()).toEqual("CrsCoordinate [ Y: 6579457.649 , X: 153369.673 , CRS: SWEREF_99_18_00 ]");
    var coordinate2 = crs_coordinate_1.default.createCoordinate(crs_projection_1.default.wgs84, 59.330231, 18.059196);
    var expectedDefaultToStringResultForCoordinate2 = "CrsCoordinate [ Latitude: 59.330231 , Longitude: 18.059196 , CRS: WGS84 ]";
    expect(coordinate2.toString()).toEqual(expectedDefaultToStringResultForCoordinate2);
    // now below testing the same coordinate as above but with a custom 'ToString' implementation
    crs_coordinate_1.default.setToStringImplementation(_myCustomToStringFunction);
    expect(coordinate2.toString()).toEqual("18.059196 , 59.330231");
    crs_coordinate_1.default.setToStringImplementationDefault(); // restores the default 'ToString' implementation
    expect(coordinate2.toString()).toEqual(expectedDefaultToStringResultForCoordinate2);
});
function _AssertEqual(crsCoordinate_1, crsCoordinate_2) {
    expect(crsCoordinate_1.crsProjection).toEqual(crsCoordinate_2.crsProjection);
    var maxDifference = crsCoordinate_1.crsProjection.isWgs84() ? 0.000007 : 0.5; // the other (i.e. non-WGS84) value is using meter as unit, so 0.5 is just five decimeters difference
    var diffLongitude = Math.abs((crsCoordinate_1.xLongitude - crsCoordinate_2.xLongitude));
    var diffLatitude = Math.abs((crsCoordinate_1.yLatitude - crsCoordinate_2.yLatitude));
    expect(diffLongitude < maxDifference).toEqual(true);
    expect(diffLatitude < maxDifference).toEqual(true);
}
function _myCustomToStringFunction(coordinate) {
    return coordinate.xLongitude + " , " + coordinate.yLatitude;
}
//# sourceMappingURL=crs_coordinate.test.js.map