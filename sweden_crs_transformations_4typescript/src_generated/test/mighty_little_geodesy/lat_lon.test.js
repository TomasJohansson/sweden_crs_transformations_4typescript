"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lat_lon_1 = __importDefault(require("../../src/mighty_little_geodesy/lat_lon"));
test('LatLon', function () {
    var latLon = new lat_lon_1.default(12.34, 56.78);
    expect(latLon.yLatitude).toEqual(12.34);
    expect(latLon.xLongitude).toEqual(56.78);
});
//# sourceMappingURL=lat_lon.test.js.map