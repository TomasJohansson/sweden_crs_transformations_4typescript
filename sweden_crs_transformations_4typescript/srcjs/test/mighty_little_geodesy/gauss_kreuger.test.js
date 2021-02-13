"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gauss_kreuger_1 = __importDefault(require("../../src/mighty_little_geodesy/gauss_kreuger"));
var crs_projection_1 = __importDefault(require("../../src/crs_projection"));
// https://kartor.eniro.se/m/XRCfh
//WGS84 decimal (lat, lon)      59.330231, 18.059196
//SWEREF99 TM (nord, öst)       6580822, 674032
var stockholmCentralStation_WGS84_latitude = 59.330231;
var stockholmCentralStation_WGS84_longitude = 18.059196;
var stockholmCentralStation_SWEREF99TM_northing = 6580822;
var stockholmCentralStation_SWEREF99TM_easting = 674032;
var gaussKreuger = new gauss_kreuger_1.default();
beforeEach(function () {
    gaussKreuger.swedish_params(crs_projection_1.default.sweref_99_tm);
});
test('geodetic_to_grid , transforming from WGS84 to SWEREF99TM', function () {
    var resultSweref99 = gaussKreuger.geodetic_to_grid(stockholmCentralStation_WGS84_latitude, stockholmCentralStation_WGS84_longitude);
    //expect(resultSweref99.yLatitude).toEqual(stockholmCentralStation_SWEREF99TM_northing);
    // failure for the above if using 'toEqual'
    // Expected: 6580822
    // Received: 6580821.991
    // Therefore instead using 'toBeCloseTo'
    expect(resultSweref99.yLatitude).toBeCloseTo(stockholmCentralStation_SWEREF99TM_northing, 0.1);
    expect(resultSweref99.xLongitude).toBeCloseTo(stockholmCentralStation_SWEREF99TM_easting, 0.1);
});
test('grid_to_geodetic , transforming from SWEREF99TM to WGS84', function () {
    var resultWGS84 = gaussKreuger.grid_to_geodetic(stockholmCentralStation_SWEREF99TM_northing, stockholmCentralStation_SWEREF99TM_easting);
    //expect(resultWGS84.yLatitude).toEqual(stockholmCentralStation_WGS84_latitude);
    // failure for the above if using 'toEqual'
    // Expected: 59.330231
    // Received: 59.33023122691265
    // Therefore instead using 'toBeCloseTo'
    var precision = 4; // failure if using 5, see comment a few lines below
    expect(resultWGS84.yLatitude).toBeCloseTo(stockholmCentralStation_WGS84_latitude, precision);
    expect(resultWGS84.xLongitude).toBeCloseTo(stockholmCentralStation_WGS84_longitude, precision);
    // Failure output if using precision 5 instead of 4 above
    // Expected: 18.059196
    // Received: 18.059189736354668
    // Expected precision:    5
    // Expected difference: < 0.000005
    // Received difference:   0.000006263645332182932
    // See also the below comments quoted from stackoverflow regarding the 'toBeCloseTo' parameter precision/numDigits
    // https://stackoverflow.com/questions/50896753/jest-tobeclosetos-precision-not-working-as-expected
    // >  The actual comparison used by Jest's toBeCloseTo method is
    // >  Math.abs(expected - actual) < Math.pow(10, -precision) / 2
    // >  (Oddly enough the documentation lists the third parameter as numDigits, not precision.)
});
//# sourceMappingURL=gauss_kreuger.test.js.map