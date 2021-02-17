TypeScript library for transformation of geographic coordinates between WGS84 and the Swedish coordinate reference systems SWEREF99 and RT90.

# How to use the library

Install the module into your TypeScript (or JavaScript) module:

```shell-script
pnpm install @programmerare/sweden_crs_transformations
```
or
```shell-script
npm install @programmerare/sweden_crs_transformations
```

Then you can use this kind of code from a TypeScript module:
```typescript
import {CrsProjection, CrsCoordinate} from '@programmerare/sweden_crs_transformations';
const coordinate_WGS84_latitude = 59.330231;
const coordinate_WGS84_longitude = 18.059196;
// the below explicit type ': CrsCoordinate' is optional to specify
const coordinate_WGS84: CrsCoordinate = CrsCoordinate.createCoordinate(
    CrsProjection.wgs84,
    coordinate_WGS84_latitude,      
    coordinate_WGS84_longitude
);
// the below explicit type ': CrsCoordinate' is optional to specify
const coordinate_SWEREF99TM: CrsCoordinate = coordinate_WGS84.transform(CrsProjection.sweref_99_tm);
console.log(`SWEREF99TM X: ${coordinate_SWEREF99TM.xLongitude}`);
console.log(`SWEREF99TM Y: ${coordinate_SWEREF99TM.yLatitude}`);
```
You can use almost the same code as above (if you skip the above optional typing) from a JavaScript [Node.js](https://nodejs.org) module, if you are using *"type": "module"* in your file 'package.json', assuming that you are also using a recent version of '*Node.js*'.  
("type":"module" should work with [Node.js versions 13.2.0 and later](https://nodejs.medium.com/announcing-core-node-js-support-for-ecmascript-modules-c5d6dc29b663))  
An alternative for JavaScript, if you are not using *"type": "module"*  is to use the *require* syntax instead as below:

```javascript
const {CrsProjection, CrsCoordinate} = require("@programmerare/sweden_crs_transformations");
// Above row: if you are NOT using "type":"module" in your "package.json"
// Below row: if you ARE using "type":"module" in your "package.json"
//import {CrsProjection, CrsCoordinate} from '@programmerare/sweden_crs_transformations';

const coordinate_WGS84_latitude = 59.330231;
const coordinate_WGS84_longitude = 18.059196;
const coordinate_WGS84 = CrsCoordinate.createCoordinate(
    CrsProjection.wgs84,
    coordinate_WGS84_latitude,      
    coordinate_WGS84_longitude
);
const coordinate_SWEREF99TM = coordinate_WGS84.transform(CrsProjection.sweref_99_tm);
console.log(`SWEREF99TM X: ${coordinate_SWEREF99TM.xLongitude}`);
console.log(`SWEREF99TM Y: ${coordinate_SWEREF99TM.yLatitude}`);
```

It is also possible to use a javascript bundle from within a webpage.  
See the [github webpage for more information](https://github.com/TomasJohansson/sweden_crs_transformations_4typescript)

20 coordinate reference systems are supported (WGS84 + 6 RT90 + 13 SWEREF99)  
![rt90_sweref](https://github.com/TomasJohansson/sweden_crs_transformations_4typescript/blob/typescript_SwedenCrsTransformations/docs/images/rt90_sweref.png?raw=true)

# License information

MIT.  
The mathematical code for the transformations is based on the [C# class GaussKreuger.cs](https://github.com/bjornsallarp/MightyLittleGeodesy/blob/master/MightyLittleGeodesy/Classes/GaussKreuger.cs) in the .NET library [MightyLittleGeodesy](https://github.com/bjornsallarp/MightyLittleGeodesy/)

The text below has been copied from the above linked 'MightyLittleGeodesy' webpage:
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