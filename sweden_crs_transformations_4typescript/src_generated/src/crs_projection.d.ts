/**
 * Crs = Coordinate reference system.
 *
 * There are three kind of coordinate systems supported and defined by this CrsProjection class:
 *     WGS84 (global standard "GPS" coordinates with latitude and longitude)
 *     SWEREF99 (the new Swedish grid, 13 versions, one national grid and 12 local projection zones)
 *     RT90 (the old Swedish grid, 6 local projection zones)
 *
 * Regarding the EPSG numbers (constructor parameter), at the links below you can find some more information about "EPSG".
 * {@link https://en.wikipedia.org/wiki/EPSG_Geodetic_Parameter_Dataset}
 * {@link https://epsg.org}
 * {@link https://epsg.io}
 */
export default class CrsProjection {
    private epsgNumber;
    private constructor();
    getEpsgNumber(): number;
    /**
     * {@link https://epsg.org/crs_4326/WGS-84.html}
     * {@link https://epsg.io/4326}
     * {@link https://spatialreference.org/ref/epsg/4326/}
     * {@link https://en.wikipedia.org/wiki/World_Geodetic_System#A_new_World_Geodetic_System:_WGS_84}
     */
    static wgs84: CrsProjection;
    /**
     * "SWEREF 99 TM" (with EPSG code 3006) is the new national projection.
     * {@link https://www.lantmateriet.se/sv/Kartor-och-geografisk-information/gps-geodesi-och-swepos/referenssystem/tvadimensionella-system/sweref-99-projektioner/}
     * {@link https://epsg.org/crs_3006/SWEREF99-TM.html}
     * {@link https://epsg.io/3006}
     * {@link https://spatialreference.org/ref/epsg/3006/}
     */
    static sweref_99_tm: CrsProjection;
    static sweref_99_12_00: CrsProjection;
    static sweref_99_13_30: CrsProjection;
    static sweref_99_15_00: CrsProjection;
    static sweref_99_16_30: CrsProjection;
    static sweref_99_18_00: CrsProjection;
    static sweref_99_14_15: CrsProjection;
    static sweref_99_15_45: CrsProjection;
    static sweref_99_17_15: CrsProjection;
    static sweref_99_18_45: CrsProjection;
    static sweref_99_20_15: CrsProjection;
    static sweref_99_21_45: CrsProjection;
    static sweref_99_23_15: CrsProjection;
    static rt90_7_5_gon_v: CrsProjection;
    static rt90_5_0_gon_v: CrsProjection;
    /**
     * {@link https://epsg.org/crs_3021/RT90-2-5-gon-V.html}
     * {@link https://epsg.io/3021}
     * {@link https://spatialreference.org/ref/epsg/3021/}
     */
    static rt90_2_5_gon_v: CrsProjection;
    static rt90_0_0_gon_v: CrsProjection;
    static rt90_2_5_gon_o: CrsProjection;
    static rt90_5_0_gon_o: CrsProjection;
    /** True if the coordinate reference system is WGS84 */
    isWgs84(): boolean;
    /** True if the coordinate reference system is a version of SWEREF99 */
    isSweref(): boolean;
    /** True if the coordinate reference system is a version of RT90 */
    isRT90(): boolean;
    /**
     * A string representation of the projection.
     * The string returned is the same as the name (in the above 20 static fields)
     * but uppercased, e.g. wgs84 ==> "WGS84" and "sweref_99_tm" ==> "SWEREF_99_TM"
     */
    getAsString(): string;
    private static readonly _epsgLowerValueForSweref;
    private static readonly _epsgUpperValueForSweref;
    private static readonly _epsgLowerValueForRT90;
    private static readonly _epsgUpperValueForRT90;
    /**
     * Factory method creating an instance of 'CrsProjection' by its number (EPSG) value.
     */
    static getCrsProjectionByEpsgNumber(epsg: number): CrsProjection;
    /**
     * Returning an array with all supported projections.
     * The order is: The very first item is the projection WGS84,
     * and after that they are increased by EPSG number,
     * i.e. the first (after wgs84) is sweref_99_tm (EPSG 3006)
     * and the last is rt90_5_0_gon_o (EPSG 3024)
     */
    static getAllCrsProjections(): Array<CrsProjection>;
}
//# sourceMappingURL=crs_projection.d.ts.map