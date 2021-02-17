"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crs_projection_1 = __importDefault(require("../src/crs_projection"));
var epsgNumberForWgs84 = 4326;
var epsgNumberForSweref99tm = 3006; // https://epsg.org/crs_3006/SWEREF99-TM.html
var epsgNumberForRT90_5_0_gon_o = 3024;
var numberOfSweref99projections = 13; // with EPSG numbers 3006-3018
var numberOfRT90projections = 6; // with EPSG numbers 3019-3024
var numberOfWgs84Projections = 1; // just to provide semantic instead of using a magic number 1 below
var totalNumberOfProjections = numberOfSweref99projections + numberOfRT90projections + numberOfWgs84Projections;
var _wgs84Projections;
var _sweref99Projections;
var _rt90Projections;
var _allCrsProjections;
beforeEach(function () {
    _wgs84Projections = [crs_projection_1.default.wgs84];
    // the usages of Set below is just for trying to avoid adding duplicates
    var sweref99Projections = new Set([
        crs_projection_1.default.sweref_99_12_00, crs_projection_1.default.sweref_99_13_30, crs_projection_1.default.sweref_99_14_15,
        crs_projection_1.default.sweref_99_15_00, crs_projection_1.default.sweref_99_15_45, crs_projection_1.default.sweref_99_16_30,
        crs_projection_1.default.sweref_99_17_15, crs_projection_1.default.sweref_99_18_00, crs_projection_1.default.sweref_99_18_45,
        crs_projection_1.default.sweref_99_20_15, crs_projection_1.default.sweref_99_21_45, crs_projection_1.default.sweref_99_23_15,
        crs_projection_1.default.sweref_99_tm
    ]);
    _sweref99Projections = Array.from(sweref99Projections);
    var rt90Projections = new Set([
        crs_projection_1.default.rt90_0_0_gon_v, crs_projection_1.default.rt90_2_5_gon_o, crs_projection_1.default.rt90_2_5_gon_v,
        crs_projection_1.default.rt90_5_0_gon_o, crs_projection_1.default.rt90_5_0_gon_v, crs_projection_1.default.rt90_7_5_gon_v
    ]);
    _rt90Projections = Array.from(rt90Projections);
    _allCrsProjections = crs_projection_1.default.getAllCrsProjections();
});
test('getEpsgNumber', function () {
    expect(crs_projection_1.default.wgs84.getEpsgNumber()).toEqual(epsgNumberForWgs84);
    expect(crs_projection_1.default.sweref_99_tm.getEpsgNumber()).toEqual(epsgNumberForSweref99tm);
    expect(crs_projection_1.default.rt90_5_0_gon_o.getEpsgNumber()).toEqual(epsgNumberForRT90_5_0_gon_o);
});
test('isWgs84', function () {
    expect(crs_projection_1.default.wgs84.isWgs84()).toEqual(true);
    expect(crs_projection_1.default.sweref_99_tm.isWgs84()).toEqual(false);
    expect(crs_projection_1.default.rt90_0_0_gon_v.isWgs84()).toEqual(false);
    expect(_wgs84Projections.length).toEqual(numberOfWgs84Projections);
    for (var _i = 0, _wgs84Projections_1 = _wgs84Projections; _i < _wgs84Projections_1.length; _i++) {
        var crsProjection = _wgs84Projections_1[_i];
        expect(crsProjection.isWgs84()).toEqual(true);
    }
    for (var _a = 0, _sweref99Projections_1 = _sweref99Projections; _a < _sweref99Projections_1.length; _a++) {
        var crsProjection = _sweref99Projections_1[_a];
        expect(crsProjection.isWgs84()).toEqual(false);
    }
    for (var _b = 0, _rt90Projections_1 = _rt90Projections; _b < _rt90Projections_1.length; _b++) {
        var crsProjection = _rt90Projections_1[_b];
        expect(crsProjection.isWgs84()).toEqual(false);
    }
});
test('isSweref', function () {
    expect(crs_projection_1.default.wgs84.isSweref()).toEqual(false);
    expect(crs_projection_1.default.sweref_99_tm.isSweref()).toEqual(true);
    expect(crs_projection_1.default.rt90_0_0_gon_v.isSweref()).toEqual(false);
    expect(_sweref99Projections.length).toEqual(numberOfSweref99projections);
    for (var _i = 0, _wgs84Projections_2 = _wgs84Projections; _i < _wgs84Projections_2.length; _i++) {
        var crsProjection = _wgs84Projections_2[_i];
        expect(crsProjection.isSweref()).toEqual(false);
    }
    for (var _a = 0, _sweref99Projections_2 = _sweref99Projections; _a < _sweref99Projections_2.length; _a++) {
        var crsProjection = _sweref99Projections_2[_a];
        expect(crsProjection.isSweref()).toEqual(true);
    }
    for (var _b = 0, _rt90Projections_2 = _rt90Projections; _b < _rt90Projections_2.length; _b++) {
        var crsProjection = _rt90Projections_2[_b];
        expect(crsProjection.isSweref()).toEqual(false);
    }
});
test('isRT90', function () {
    expect(crs_projection_1.default.wgs84.isRT90()).toEqual(false);
    expect(crs_projection_1.default.sweref_99_tm.isRT90()).toEqual(false);
    expect(crs_projection_1.default.rt90_0_0_gon_v.isRT90()).toEqual(true);
    expect(_rt90Projections.length).toEqual(numberOfRT90projections);
    for (var _i = 0, _wgs84Projections_3 = _wgs84Projections; _i < _wgs84Projections_3.length; _i++) {
        var crsProjection = _wgs84Projections_3[_i];
        expect(crsProjection.isRT90()).toEqual(false);
    }
    for (var _a = 0, _sweref99Projections_3 = _sweref99Projections; _a < _sweref99Projections_3.length; _a++) {
        var crsProjection = _sweref99Projections_3[_a];
        expect(crsProjection.isRT90()).toEqual(false);
    }
    for (var _b = 0, _rt90Projections_3 = _rt90Projections; _b < _rt90Projections_3.length; _b++) {
        var crsProjection = _rt90Projections_3[_b];
        expect(crsProjection.isRT90()).toEqual(true);
    }
});
test('getAsString', function () {
    expect(crs_projection_1.default.wgs84.getAsString()).toEqual("WGS84");
    expect(crs_projection_1.default.sweref_99_tm.getAsString()).toEqual("SWEREF_99_TM");
    expect(crs_projection_1.default.sweref_99_14_15.getAsString()).toEqual("SWEREF_99_14_15");
    expect(crs_projection_1.default.rt90_0_0_gon_v.getAsString()).toEqual("RT90_0_0_GON_V");
});
test('getCrsProjectionByEpsgNumber', function () {
    expect(crs_projection_1.default.getCrsProjectionByEpsgNumber(epsgNumberForSweref99tm)).toEqual(crs_projection_1.default.sweref_99_tm);
    expect(crs_projection_1.default.getCrsProjectionByEpsgNumber(3018) // https://epsg.io/3018
    ).toEqual(crs_projection_1.default.sweref_99_23_15);
    expect(crs_projection_1.default.getCrsProjectionByEpsgNumber(3024) // https://epsg.io/3024
    ).toEqual(crs_projection_1.default.rt90_5_0_gon_o);
});
test('verifyTotalNumberOfProjections', function () {
    expect(_allCrsProjections.length // retrieved with 'GetAllCrsProjections' in the SetUp method
    ).toEqual(totalNumberOfProjections);
});
test('verifyNumberOfWgs84Projections', function () {
    expect(_allCrsProjections.filter(function (crs) { return crs.isWgs84(); }).length).toEqual(numberOfWgs84Projections);
});
test('verifyNumberOfSweref99Projections', function () {
    expect(_allCrsProjections.filter(function (crs) { return crs.isSweref(); }).length).toEqual(numberOfSweref99projections);
});
test('verifyNumberOfRT90Projections', function () {
    expect(_allCrsProjections.filter(function (crs) { return crs.isRT90(); }).length).toEqual(numberOfRT90projections);
});
test('verifyThatAllProjectionsCanBeRetrievedByItsEpsgNumber', function () {
    for (var _i = 0, _allCrsProjections_1 = _allCrsProjections; _i < _allCrsProjections_1.length; _i++) {
        var crsProjection = _allCrsProjections_1[_i];
        var crsProj = crs_projection_1.default.getCrsProjectionByEpsgNumber(crsProjection.getEpsgNumber());
        expect(crsProjection).toEqual(crsProj);
    }
});
test('getAllCrsProjections , verify the expected order of the projections', function () {
    var _a, _b;
    var allProjections = crs_projection_1.default.getAllCrsProjections();
    expect(allProjections.length).toEqual(totalNumberOfProjections);
    expect(allProjections[0]).toEqual(crs_projection_1.default.wgs84);
    // only the first (wgs84, with EPSG 4326) above is "special" but the order of the rest (sweref99 and rt90 projections)
    // is that they should be ordered by EPSG numbers from 3006 to 3024
    // i.e. EPSG 3006 for the second item (after the above wgs84) and EPSG 3024 for the last item in the array
    var epsgNumber = 3006;
    expect((_a = allProjections[1]) === null || _a === void 0 ? void 0 : _a.getEpsgNumber()).toEqual(epsgNumber);
    expect((_b = allProjections[allProjections.length - 1]) === null || _b === void 0 ? void 0 : _b.getEpsgNumber()).toEqual(3024);
    for (var i = 1; i < allProjections.length; i++) {
        var proj = allProjections[i];
        expect(proj === null || proj === void 0 ? void 0 : proj.getEpsgNumber()).toEqual(epsgNumber);
        epsgNumber++;
    }
});
//# sourceMappingURL=crs_projection.test.js.map