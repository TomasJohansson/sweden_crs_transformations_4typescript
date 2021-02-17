# sweden_crs_transformations_4typescript
'sweden_crs_transformations_4typescript' is a TypeScript library ported from the 
[C#.NET library 'sweden_crs_transformations_4net'](https://github.com/TomasJohansson/sweden_crs_transformations_4net/) and the [Dart library 'sweden_crs_transformations_4dart'](https://github.com/TomasJohansson/sweden_crs_transformations_4dart/)
for transforming geographic coordinates between the following three kind of CRS (Coordinate Reference Systems): WGS84, SWEREF99 and RT90.
(13 versions of SWEREF99, and 6 versions of RT90)

The C#.NET library ('sweden_crs_transformations_4net') is 
based on [C# library MightyLittleGeodesy](https://github.com/bjornsallarp/MightyLittleGeodesy/) which in turn is based on a [javascript library by Arnold Andreasson](https://latlong.mellifica.se/).

The main part of 'MightyLittleGeodesy' which has been kept (to the C# library 'sweden_crs_transformations_4net') is the mathematical calculations in the class 'GaussKreuger.cs'.  
Regarding the port to this 'sweden_crs_transformations_4typescript' then of course there had to be more modifications since TypeScript has differences in syntax compared with C#, although 
the mathematical logic has still been kept from the original 'MightyLittleGeodesy' class 'GaussKreuger.cs'.

# npm release

No. At least not yet. Maybe later.

# How to use this git repository

Further down in this section you can se a block of commands you can run if you want.  

It is assumed that you have installed [git](https://git-scm.com/) and [pnpm](https://pnpm.js.org) (and also [npm](https://www.npmjs.com/get-npm) which can be used to [install pnpm](https://pnpm.js.org/en/installation) if you not already have installed pnpm).

Below are some commands you can use from a command prompt.  
The below *"[YOUR_ROOT_DIRECTORY_FOR_THE_CLONED_GIT_REPOSITORY]"* represents something like 
*"/home/tomas/sweden_crs_transformations_4typescript"* if you would be using Linux with the user name *"tomas"* and would create the git clone into that directory.

The below commands *"pnpm install"* installs *"dependencies"* and *"devDependencies"* defined in *"package.json"* into the subdirectories *"node_modules"*.  
(but since **p**npm is used, there will not be as much disk space used as when *npm* is used)

The below command *"pnpm run test"* will run all [TypeScript jest tests](https://jestjs.io/docs/en/getting-started#using-typescript) in the directory "sweden_crs_transformations_4typescript/*test*" which are testing the TypeScript code in the directory "sweden_crs_transformations_4typescript/*src*".  
The directory "sweden_crs_transformations_4typescript/*src_generated*" contains code generated from the TypeScript *"tsc"* command, e.g. when running the command *"pnpx tsc"*.  
In other words, the code in the *src* directory is written but the code in *src_generated* is generated and copied from *src*.  

The below command *"pnpm run start"* in the both example modules *"example_typescript_console"* and *"example_javascript_console"* will simply show how to use the library *"sweden_crs_transformations_4typescript"* from a TypeScript module and from a JavaScript module.  
They run the same code as is shown here in this github page in the section with code example.  

When you have run the below command *"pnpm install"* within the module *"example_javascript_browser_bundle"*, the result should be a subdirectory *"node_modules"* which includes some files referred to from the page "example_javascript_browser_bundle/*index.htm*".  
Then you should be able to open that "*index.htm*" file from a web browser, and it is a simple old-fashioned webpage (i.e. *NOT* using any modern frameworks such as React/Angular/Vue) with some javascript code using the generated bundled javascript file.  

Since the *"prod"* script in *"sweden_crs_transformations_4typescript/package.json"* copies the needed files to *"github pages"* of this github repository, you can also see that webpage here:  
[https://tomasjohansson.github.io/sweden_crs_transformations_4typescript/browser_example/](https://tomasjohansson.github.io/sweden_crs_transformations_4typescript/browser_example/)

```shell-script
git clone https://github.com/TomasJohansson/sweden_crs_transformations_4typescript

cd [YOUR_ROOT_DIRECTORY_FOR_THE_CLONED_GIT_REPOSITORY]
cd sweden_crs_transformations_4typescript
pnpm install
pnpm run test

cd [YOUR_ROOT_DIRECTORY_FOR_THE_CLONED_GIT_REPOSITORY]
cd example_typescript_console
pnpm install
pnpm run start

cd [YOUR_ROOT_DIRECTORY_FOR_THE_CLONED_GIT_REPOSITORY]
cd example_javascript_console
pnpm install
pnpm run start

cd [YOUR_ROOT_DIRECTORY_FOR_THE_CLONED_GIT_REPOSITORY]
cd example_javascript_browser_bundle
pnpm install
```

The code in this library (e.g. using the commands above) has been tested with the following operating systems and versions of *node*, *npm* and *pnpm*:  

Windows 10:  
"node -v" ==> v14.15.4  
"npm -v" ==> 6.14.11  
"pnpm -v" ==> 5.17.1  

Linux Ubuntu 20.04:  
"node -v" ==> v14.15.5  
"npm -v" ==> 6.14.11  
"pnpm -v" ==> 5.17.1  


# Implementations in other programming languages
Currently I have implemented this TypeScript library also with the following programming languages and github repositories:   
C#.NET: [sweden_crs_transformations_4net](https://github.com/TomasJohansson/sweden_crs_transformations_4net)   
Dart: [sweden_crs_transformations_4dart](https://github.com/TomasJohansson/sweden_crs_transformations_4dart)   

# Code example using TypeScript 

(pasted below from 'example_typescript_console\src\index.ts')
```typescript
import {CrsProjection, CrsCoordinate} from 'sweden_crs_transformations_4typescript';

// The location of Stockholm Central Station, according to Eniro:
    // https://kartor.eniro.se/m/XRCfh
    // WGS84 decimal (lat, lon)        59.330231, 18.059196
    // RT90 (northing, easting)        6580994, 1628294
    // SWEREF99 TM (northing, easting) 6580822, 674032
const stockholmCentralStation_WGS84_latitude = 59.330231;
const stockholmCentralStation_WGS84_longitude = 18.059196;

// the below explicit type ': CrsCoordinate' is optional to specify
const stockholmWGS84: CrsCoordinate = CrsCoordinate.createCoordinate(
    CrsProjection.wgs84,
    stockholmCentralStation_WGS84_latitude,      
    stockholmCentralStation_WGS84_longitude
);

// the below explicit type ': CrsCoordinate' is optional to specify
const stockholmSweref99tm: CrsCoordinate = stockholmWGS84.transform(CrsProjection.sweref_99_tm);
console.log(`stockholmSweref99tm X: ${stockholmSweref99tm.xLongitude}`);
console.log(`stockholmSweref99tm Y: ${stockholmSweref99tm.yLatitude}`);
console.log(`stockholmSweref99tm toString: ${stockholmSweref99tm.toString()}`);
// Output from the above:
// stockholmSweref99tm X: 674032.357
// stockholmSweref99tm Y: 6580821.991
// stockholmSweref99tm toString: CrsCoordinate [ Y: 6580821.991 , X: 674032.357 , CRS: SWEREF_99_TM ]

// the below explicit type ': Array<CrsProjection>' is optional to specify
const allProjections: Array<CrsProjection> = CrsProjection.getAllCrsProjections();
for(const crsProjection of allProjections) {
    console.log(`${stockholmWGS84.transform(crsProjection)}`);
}
// Output from the above loop:
// CrsCoordinate [ Latitude: 59.330231 , Longitude: 18.059196 , CRS: WGS84 ]
// CrsCoordinate [ Y: 6580821.991 , X: 674032.357 , CRS: SWEREF_99_TM ]
// CrsCoordinate [ Y: 6595151.116 , X: 494604.69 , CRS: SWEREF_99_12_00 ]
// CrsCoordinate [ Y: 6588340.147 , X: 409396.217 , CRS: SWEREF_99_13_30 ]
// CrsCoordinate [ Y: 6583455.373 , X: 324101.998 , CRS: SWEREF_99_15_00 ]
// CrsCoordinate [ Y: 6580494.921 , X: 238750.424 , CRS: SWEREF_99_16_30 ]
// CrsCoordinate [ Y: 6579457.649 , X: 153369.673 , CRS: SWEREF_99_18_00 ]
// CrsCoordinate [ Y: 6585657.12 , X: 366758.045 , CRS: SWEREF_99_14_15 ]
// CrsCoordinate [ Y: 6581734.696 , X: 281431.616 , CRS: SWEREF_99_15_45 ]
// CrsCoordinate [ Y: 6579735.93 , X: 196061.94 , CRS: SWEREF_99_17_15 ]
// CrsCoordinate [ Y: 6579660.051 , X: 110677.129 , CRS: SWEREF_99_18_45 ]
// CrsCoordinate [ Y: 6581507.028 , X: 25305.238 , CRS: SWEREF_99_20_15 ]
// CrsCoordinate [ Y: 6585277.577 , X: -60025.629 , CRS: SWEREF_99_21_45 ]
// CrsCoordinate [ Y: 6590973.148 , X: -145287.219 , CRS: SWEREF_99_23_15 ]
// CrsCoordinate [ Y: 6598325.639 , X: 1884004.1 , CRS: RT90_7_5_GON_V ]
// CrsCoordinate [ Y: 6587493.237 , X: 1756244.287 , CRS: RT90_5_0_GON_V ]
// CrsCoordinate [ Y: 6580994.18 , X: 1628293.886 , CRS: RT90_2_5_GON_V ]
// CrsCoordinate [ Y: 6578822.84 , X: 1500248.374 , CRS: RT90_0_0_GON_V ]
// CrsCoordinate [ Y: 6580977.349 , X: 1372202.721 , CRS: RT90_2_5_GON_O ]
// CrsCoordinate [ Y: 6587459.595 , X: 1244251.702 , CRS: RT90_5_0_GON_O ]
```

# Code example using JavaScript

The JavaScript code can be almost exactly the same as the above example with TypeScript, but remove the types.
See the example 'example_javascript_console\src\index.js'

# Accuracy of the transformations

This TypeScript library is based on a port of the [C#.NET library 'sweden_crs_transformations_4net'](https://github.com/TomasJohansson/sweden_crs_transformations_4net/) and therefore it is using the same file "swedish_crs_coordinates.csv" as the C# library, for the regression testing of this TypeScript implementation.  
There are 18 rows with coordinates in that file, and it will lead to 108 transformations being done when executing all TypeScript tests, e.g. with the command 'pnpm run test'.  
The coordinate values in the file have been created as median values from six different Java implementations of CRS transformations.  
For more information about the origin of the data file being used, please see the webpage linked above for the C# library 'sweden_crs_transformations_4net'.

# License

MIT.  
'sweden_crs_transformations_4typescript' is ported from the C# library 'sweden_crs_transformations_4net' (and from 'sweden_crs_transformations_4dart')
which is also licensed with MIT since it started as a fork of the C# library 'MightyLittleGeodesy' which is licensed with the MIT license. (see below).  
[License text for 'sweden_crs_transformations_4typescript'](https://github.com/TomasJohansson/sweden_crs_transformations_4typescript/blob/typescript_SwedenCrsTransformations/LICENSE)

# License for the original C# repository [MightyLittleGeodesy](https://github.com/bjornsallarp/MightyLittleGeodesy/)

The text below has been copied from the above linked webpage:
> The calculations in this library is based on the excellent javascript library by Arnold Andreasson which is published under the Creative Commons license. However, as agreed with mr Andreasson, MightyLittleGeodesy is now licensed under the MIT license.

The text below has been copied from [one of the source files for MightyLittleGeodesy](https://github.com/bjornsallarp/MightyLittleGeodesy/blob/83491fc6e7454f5d90d792610b317eca7a332334/MightyLittleGeodesy/Classes/GaussKreuger.cs).
```C#
/*
 * MightyLittleGeodesy 
 * RT90, SWEREF99 and WGS84 coordinate transformation library
 * 
 * Read my blog @ http://blog.sallarp.com
 * 
 * 
 * Copyright (C) 2009 Björn Sållarp
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this 
 * software and associated documentation files (the "Software"), to deal in the Software 
 * without restriction, including without limitation the rights to use, copy, modify, 
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
 * permit persons to whom the Software is furnished to do so, subject to the following 
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or 
 * substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
 ```
# Swedish coordinate reference systems
There are two kind of national CRS being used in Sweden:   
The old [RT90](https://www.lantmateriet.se/sv/Kartor-och-geografisk-information/gps-geodesi-och-swepos/Referenssystem/Tvadimensionella-system/RT-90/) (six versions for different local regions)    
The new [SWEREF99](https://www.lantmateriet.se/sv/Kartor-och-geografisk-information/gps-geodesi-och-swepos/referenssystem/tvadimensionella-system/sweref-99-projektioner/) (thirteen versions, one for the national "TM" and twelve local regions)    

The above links are for pages in Swedish at the website for [Lantmäteriet](https://en.wikipedia.org/wiki/Lantm%C3%A4teriet) which is a swedish authority for mapping.

[https://www.lantmateriet.se/en/about-lantmateriet/about-lantmateriet/](https://www.lantmateriet.se/en/about-lantmateriet/about-lantmateriet/)   
Quote from the above URL:
```Text
We map the country, demarcate boundaries and help guarantee secure ownership of Sweden’s real property.   
You can get more information and documentation on Sweden’s geography and real properties from us.
```