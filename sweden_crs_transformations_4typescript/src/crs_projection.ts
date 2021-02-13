/*
* https://github.com/TomasJohansson/sweden_crs_transformations_4typescript
* Copyright (c) Tomas Johansson , http://www.programmerare.com
* The code in this 'sweden_crs_transformations_4typescript' library is licensed with MIT.
* The library is based on the C#.NET library 'sweden_crs_transformations_4net' (https://github.com/TomasJohansson/sweden_crs_transformations_4net)
* and the Dart library 'sweden_crs_transformations_4dart' (https://github.com/TomasJohansson/sweden_crs_transformations_4dart)
* Both above libraries are based on the C#.NET library 'MightyLittleGeodesy' (https://github.com/bjornsallarp/MightyLittleGeodesy/) 
* which is also released with MIT.
* License information about 'sweden_crs_transformations_4typescript' and 'MightyLittleGeodesy':
* https://github.com/TomasJohansson/sweden_crs_transformations_4typescript/blob/typescript_SwedenCrsTransformations/LICENSE
*/

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

  private constructor(private epsgNumber: number) { }
    
  public getEpsgNumber(): number {
    return this.epsgNumber;
  }  

  // ------------------------------------------------------
  // Below are the static instances for the 20 supported coordinate reference systems (wgs84, sweref99 and rt90)

  /**  
   * {@link https://epsg.org/crs_4326/WGS-84.html}
   * {@link https://epsg.io/4326}
   * {@link https://spatialreference.org/ref/epsg/4326/}
   * {@link https://en.wikipedia.org/wiki/World_Geodetic_System#A_new_World_Geodetic_System:_WGS_84}
   */
  static wgs84 = new CrsProjection(4326);

  /**  
   * "SWEREF 99 TM" (with EPSG code 3006) is the new national projection.
   * {@link https://www.lantmateriet.se/sv/Kartor-och-geografisk-information/gps-geodesi-och-swepos/referenssystem/tvadimensionella-system/sweref-99-projektioner/}
   * {@link https://epsg.org/crs_3006/SWEREF99-TM.html}
   * {@link https://epsg.io/3006}
   * {@link https://spatialreference.org/ref/epsg/3006/}
   */
  static sweref_99_tm = new CrsProjection(3006); // national sweref99 CRS

  // local sweref99 systems (the new swedish national system):
  static sweref_99_12_00 = new CrsProjection(3007);
  static sweref_99_13_30 = new CrsProjection(3008);
  static sweref_99_15_00 = new CrsProjection(3009);
  static sweref_99_16_30 = new CrsProjection(3010);
  static sweref_99_18_00 = new CrsProjection(3011);
  static sweref_99_14_15 = new CrsProjection(3012);
  static sweref_99_15_45 = new CrsProjection(3013);
  static sweref_99_17_15 = new CrsProjection(3014);
  static sweref_99_18_45 = new CrsProjection(3015);
  static sweref_99_20_15 = new CrsProjection(3016);
  static sweref_99_21_45 = new CrsProjection(3017);
  static sweref_99_23_15 = new CrsProjection(3018);


  // local RT90 systems (the old swedish national system):
  static rt90_7_5_gon_v = new CrsProjection(3019);
  static rt90_5_0_gon_v = new CrsProjection(3020);
  
  /**
   * {@link https://epsg.org/crs_3021/RT90-2-5-gon-V.html}
   * {@link https://epsg.io/3021}
   * {@link https://spatialreference.org/ref/epsg/3021/}
   */
  static rt90_2_5_gon_v = new CrsProjection(3021);

  static rt90_0_0_gon_v = new CrsProjection(3022);
  static rt90_2_5_gon_o = new CrsProjection(3023);
  static rt90_5_0_gon_o = new CrsProjection(3024);

  // ------------------------------------------------------

  // Four public instance methods:

  /** True if the coordinate reference system is WGS84 */
  isWgs84(): boolean {
    return this == CrsProjection.wgs84;
  }

  /** True if the coordinate reference system is a version of SWEREF99 */
  isSweref(): boolean {
    return CrsProjection._epsgLowerValueForSweref <= this.epsgNumber && this.epsgNumber <= CrsProjection._epsgUpperValueForSweref;
  }

  /** True if the coordinate reference system is a version of RT90 */
  isRT90(): boolean {
    return CrsProjection._epsgLowerValueForRT90 <= this.epsgNumber && this.epsgNumber <= CrsProjection._epsgUpperValueForRT90;
  } 

  /**
   * A string representation of the projection.
   * The string returned is the same as the name (in the above 20 static fields) 
   * but uppercased, e.g. wgs84 ==> "WGS84" and "sweref_99_tm" ==> "SWEREF_99_TM"
   */
  getAsString(): string {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
    // ECMAScript 2017 includes Object.entries
    // https://en.wikipedia.org/wiki/ECMAScript#8th_Edition_%E2%80%93_ECMAScript_2017
    for (const [theKey, theValue] of Object.entries(CrsProjection)) {
      if(theKey != null && theValue != null && theValue.getEpsgNumber && this.getEpsgNumber() === theValue.getEpsgNumber()) {
        return theKey.toUpperCase();
      }
    }
    throw Error(`Could not render the CrsProjection as a string. The EPSG number for the failed projection: ${this.getEpsgNumber()}`);
  }  

  // ------------------------------------------------------
  // Four static fields used by some of the above instance methods
  private static readonly _epsgLowerValueForSweref = 3006; // sweref_99_tm
  private static readonly _epsgUpperValueForSweref = 3018;
  private static readonly _epsgLowerValueForRT90 = 3019;
  private static readonly _epsgUpperValueForRT90 = 3024;
  // ------------------------------------------------------

  /**
   * Factory method creating an instance of 'CrsProjection' by its number (EPSG) value.
   */
  static getCrsProjectionByEpsgNumber(epsg: number): CrsProjection {
    const values: Array<CrsProjection> = CrsProjection.getAllCrsProjections();
    for(const crsProjection of values) {
      if(crsProjection.getEpsgNumber() === epsg) {
        return crsProjection;
      }
    }
    throw new Error(`Could not find CrsProjection for EPSG ${epsg}`);
  }

  /**
   * Returning an array with all supported projections.
   * The order is: The very first item is the projection WGS84, 
   * and after that they are increased by EPSG number,
   * i.e. the first (after wgs84) is sweref_99_tm (EPSG 3006) 
   * and the last is rt90_5_0_gon_o (EPSG 3024) 
   */
  static getAllCrsProjections(): Array<CrsProjection> {
    return [
      CrsProjection.wgs84,            

      CrsProjection.sweref_99_tm,

      CrsProjection.sweref_99_12_00,
      CrsProjection.sweref_99_13_30,
      CrsProjection.sweref_99_15_00,
      CrsProjection.sweref_99_16_30,
      CrsProjection.sweref_99_18_00,
      CrsProjection.sweref_99_14_15,
      CrsProjection.sweref_99_15_45,
      CrsProjection.sweref_99_17_15,
      CrsProjection.sweref_99_18_45,
      CrsProjection.sweref_99_20_15,
      CrsProjection.sweref_99_21_45,
      CrsProjection.sweref_99_23_15,

      CrsProjection.rt90_7_5_gon_v,
      CrsProjection.rt90_5_0_gon_v,
      CrsProjection.rt90_2_5_gon_v,
      CrsProjection.rt90_0_0_gon_v,
      CrsProjection.rt90_2_5_gon_o,
      CrsProjection.rt90_5_0_gon_o
    ];
  }
}