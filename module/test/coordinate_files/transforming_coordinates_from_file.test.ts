// dart test/coordinate_files/transforming_coordinates_from_file_test.dart
import CrsCoordinate from "../../src/crs_coordinate";
import { CrsProjection } from "../../src/crs_projection";
import fs from 'fs';
import path from 'path';

type double = number;

// the below file "swedish_crs_transformations.csv" was copied from: https://github.com/TomasJohansson/crsTransformations/blob/a1da6c74daf040a521beb32f9f395124ffe76aa6/crs-transformation-adapter-test/src/test/resources/generated/swedish_crs_coordinates.csv
// and it was generated with a method "createFileWithTransformationResultsForCoordinatesInSweden()" at https://github.com/TomasJohansson/crsTransformations/blob/a1da6c74daf040a521beb32f9f395124ffe76aa6/crs-transformation-adapter-test/src/test/java/com/programmerare/com/programmerare/testData/CoordinateTestDataGeneratedFromEpsgDatabaseTest.java
const relativePathForFileWith_swedish_crs_transformations = 'data/swedish_crs_coordinates.csv';

const columnSeparator = '|';

test('assertThatTransformationsDoNotDifferTooMuchFromExpectedResultInFile', () => {
  const filePath: string = _getFileWithSwedishCrsCoordinates();
  // console.log("_getFileWithSwedishCrsCoordinates filePath " + filePath);
  expect(fs.existsSync(filePath)).toEqual(true);
  const buf = fs.readFileSync(filePath);
  const contentOfFile = buf.toString();
  // console.log("os.EOL |" + os.EOL + "|");
  // console.log("contentOfFile " + contentOfFile);
  //const lines = contentOfFile.split(os.EOL);
  const lines = contentOfFile.split('\n');
  expect(lines.length).toEqual(19); // 19 rows in the file

  // TODO fix the below ugliness ... has to use value to avoid compiling error complaining about unused parameter
  const dataRows = lines.filter( (value: string, index: number) => value === value && index > 0 );
  expect(dataRows.length).toEqual(18);
  const problemTransformationResults: Array<String> = [];

  // The first two lines of the input file (the header row, and a data row):
      // EPSG 4326 (WGS84)Longitude for WGS84 (EPSG 4326)|Latitude for WGS84 (EPSG 4326)|EPSG 3006|X for EPSG 3006|Y for EPSG 3006|EPSG 3007-3024|X for EPSG 3007-3024|Y for EPSG 3007-3024|Implementation count for EPSG 3006 transformation|Implementation count for EPSG 3007-3024 transformation
      // 4326|12.146151472138385|58.46573396912418|3006|333538.2957000149|6484098.2550872|3007|158529.85136620898|6483166.205771873|6|6
  // The last two columns can be ignored here, but the first nine columns are in three pairs with three columns each:
  // an epsg number, and then the longitude(x) and latitude(y) for that coordinate.
  // All three coordinates in one row represents the same location but in different coordinate reference systems.
  // The first two, of the three, coordinates are for the same coordinate reference systems, WGS84 and SWEREF99TM, 
  // but the third is different for all rows (18 data rows for the local swedish CRS systems, RT90 and SWEREF99, with EPSG codes 3007-3024).

  // The below loop iterates all lines and makes transformations between (to and from) the three coordinate reference systems
  // and verifies the expected result according to the file, and asserts with an error if the difference is too big.
  // Note that the expected coordinates have been calculated in another project, by using a median value for 6 different implementations.
  // (and the number 6 is actually what the last columns means i.e. how many implementations were used to create the data file)
  const listOfCoordinates: Array<_Coordinates> = dataRows.map((line) => _Coordinates.createFromFileLine(line));
  expect(listOfCoordinates.length).toEqual(18);
  let numberOfTransformations = 0;
  for(const listOfCoordinatesWhichRepresentTheSameLocation of listOfCoordinates) {
    const coordinates: Array<CrsCoordinate> = listOfCoordinatesWhichRepresentTheSameLocation.coordinateList;
    for(let i=0; i<coordinates.length-1; i++) {
      for(let j=i+1; j<coordinates.length; j++) {
        // if(coordinates[i] != null && coordinates[j] != null) {
        //   _transform(coordinates[i], coordinates[j], problemTransformationResults);
        //   _transform(coordinates[j], coordinates[i], problemTransformationResults);        
        // }
        // Note that the above does NOT compile when using (in tsconfig.json) "noUncheckedIndexedAccess": true
        //    error TS2345: Argument of type 'CrsCoordinate | undefined' is not assignable to parameter of type 'CrsCoordinate'.
        // Therefore doing as below instead, which does compile with noUncheckedIndexedAccess
        const c1 = coordinates[i];
        const c2 = coordinates[j];
        if( c1 != null && c2 != null ) {
          _transform(c1, c2, problemTransformationResults);
          _transform(c2, c1, problemTransformationResults);
        }
        numberOfTransformations += 2;
      }
    }
  }
  if (problemTransformationResults.length > 0) {
    for(const s of problemTransformationResults) {
      console.log(s);
    }
  }
  expect(problemTransformationResults.length).toEqual(0);

  const expectedNumberOfTransformations = 108; // for an explanation, see the lines below:
  // Each line in the input file "swedish_crs_coordinates.csv" has three coordinates (and let's below call then A B C)
  // and then for each line we should have done six number of transformations:
  // A ==> B
  // A ==> C
  // B ==> C
  // (and three more in the opposite directions)
  // And there are 18 local CRS for sweden (i.e number of data rows in the file)
  // Thus the total number of transformations should be 18 * 6 = 108
  expect(numberOfTransformations).toEqual(expectedNumberOfTransformations);
});



function _transform(
  sourceCoordinate: CrsCoordinate,
  targetCoordinateExpected: CrsCoordinate,
  problemTransformationResults: Array<String>  
  ): void {
  const targetCrs: CrsProjection = targetCoordinateExpected.crsProjection;
  const targetCoordinate: CrsCoordinate = sourceCoordinate.transform(targetCrs);
  const isTargetEpsgWgs84 = targetCrs.isWgs84();
  const maxDifference: double = isTargetEpsgWgs84 ? 0.000003 : 0.2; // the other (i.e. non-WGS84) are using meter as unit, so 0.2 is just two decimeters difference
  const diffLongitude = Math.abs((targetCoordinate.xLongitude - targetCoordinateExpected.xLongitude));
  const diffLatitude = Math.abs((targetCoordinate.yLatitude - targetCoordinateExpected.yLatitude));

  if (diffLongitude > maxDifference || diffLatitude > maxDifference) {
    const problem = 
      `Projection ${sourceCoordinate.crsProjection} ==> ${targetCoordinateExpected.crsProjection} , diffLongitude ${diffLongitude}  , diffLatitude ${diffLatitude} 
       "sourceCoordinate xLongitude/yLatitude: ${sourceCoordinate.xLongitude}/${sourceCoordinate.yLatitude} 
       "targetCoordinate xLongitude/yLatitude: ${targetCoordinate.xLongitude}/${targetCoordinate.yLatitude} 
       "targetCoordinateExpected xLongitude/yLatitude: ${targetCoordinateExpected.xLongitude}/${targetCoordinateExpected.yLatitude}`;
    problemTransformationResults.push(problem);
  }
}

function _getFileWithSwedishCrsCoordinates(): string {
  const currentWorkingDirectory: string = path.dirname(__filename);
  const absolutePathToFile: string = path.resolve(currentWorkingDirectory, relativePathForFileWith_swedish_crs_transformations);
  return absolutePathToFile;
}  

class _Coordinates {
  private constructor(readonly coordinateList: Array<CrsCoordinate>) {}

  // https://dart.dev/guides/language/language-tour#constructors
  //  Another use case for factory constructors is initializing a final variable using logic that can’t be handled in the initializer list.
  static createFromFileLine(
    lineFromFile: string
  ): _Coordinates {
    const columns: Array<string> = lineFromFile.split(columnSeparator);
    if(!(
        columns[0] && columns[1] && columns[2] && columns[3] && columns[4] && 
        columns[5] && columns[6] && columns[7] && columns[8] && columns[9]
      )
    ) {
      throw new Error("Column data not available");
    }
    // Without the above if statement (and error thrown) there will be compiling error below when using the following configuration in tsconfig.json
      // "noUncheckedIndexedAccess": true,
    return new _Coordinates([
      // Note that the order of the parameters in the input file (with its lines being used here)
      // are in the order x/Longitude first, but the create method below takes the y/Latitude first
      // (and therefore the parameters are not in the sequential order regarding the array indexes)      
      CrsCoordinate.createCoordinateByEpsgNumber(parseInt(columns[0]), parseFloat(columns[2]), parseFloat(columns[1])),
      CrsCoordinate.createCoordinateByEpsgNumber(parseInt(columns[3]), parseFloat(columns[5]), parseFloat(columns[4])),
      CrsCoordinate.createCoordinateByEpsgNumber(parseInt(columns[6]), parseFloat(columns[8]), parseFloat(columns[7]))
    ]);
  }
}