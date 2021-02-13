function createOption(
    crsProjection,
    epsgNumberToBeSelected
) {
    var option = document.createElement('option');
    option.value = crsProjection.getEpsgNumber();
    option.text = "EPSG:" + crsProjection.getEpsgNumber() + " , " + crsProjection.getAsString();
    if(epsgNumberToBeSelected == crsProjection.getEpsgNumber()) {
        option.selected = true;
    }
    return option;
}

function populateDropdownWithEpsgOptions(
    allCrsProjections,
    selectEpsg,
    epsgNumberToBeSelected
) {
    for(var i = 0; i<allCrsProjections.length; i++) {
        var crsProjection = allCrsProjections[i];
        selectEpsg.add(createOption(crsProjection, epsgNumberToBeSelected), i);
    }
}

function showErrorMessage(errorMessage) {
    var elementForErrorMessage = document.getElementById("errorMessage");
    if(elementForErrorMessage != null) {
        elementForErrorMessage.innerHTML = errorMessage;
    }
    else {
        alert(s);
    }
    return null;
}

function getLonLatNumbers(
    columnForYLatitudeInput,
    columnForXLongitudeInput,
    arrayWithXLongitudeAndYLatitude
) {
    var arrLength = arrayWithXLongitudeAndYLatitude.length;
    var xIndex = columnForXLongitudeInput-1;
    var yIndex = columnForYLatitudeInput-1;
    if(xIndex >= arrLength) {
        return showErrorMessage("Too large column index for XLongitude " + columnForXLongitudeInput);
    }
    if(yIndex >= arrLength) {
        return showErrorMessage("Too large column index for YLatitude " + columnForYLatitudeInput);
    }    
    if(yIndex == xIndex) {
        return showErrorMessage("The same column index can not specify both X and Y: " + columnForYLatitudeInput);
    }    
    if(xIndex < 0) {
        return showErrorMessage("Too low column index for X: " + columnForXLongitudeInput);
    }
    if(yIndex < 0) {
        return showErrorMessage("Too low column index for Y: " + columnForYLatitudeInput);
    }
    if(Math.max(columnForYLatitudeInput, columnForXLongitudeInput) > arrLength) {
        if(xIndex < yIndex)         {
            xIndex = 0;
            yIndex = 1;
        }
        else {
            xIndex = 1;
            yIndex = 0;            
        }
    }
    var xAsString = arrayWithXLongitudeAndYLatitude[xIndex].trim();
    var yAsString = arrayWithXLongitudeAndYLatitude[yIndex].trim();
    var xLon = parseFloat(xAsString);
    var yLat = parseFloat(yAsString);
    if(Number.isNaN(xLon)) {
        return showErrorMessage("X is not a number in column " + columnForXLongitudeInput + " : " + xAsString);
    }
    if(Number.isNaN(yLat)) {
        return showErrorMessage("Y is not a number in column " + columnForYLatitudeInput + " : " + yAsString);
    }
    return [xLon, yLat];
}

function getOuputCoordinatesAsString(
    columnForYLatitudeInput,
    columnForXLongitudeInput,
    coordinateSeparator,
    coordinate
) {
    var isXLongitudefirst = columnForXLongitudeInput < columnForYLatitudeInput;
    if(isXLongitudefirst) {
        return coordinate.xLongitude + coordinateSeparator + coordinate.yLatitude;
    }
    else {
        return coordinate.yLatitude + coordinateSeparator + coordinate.xLongitude;
    }        
}

function canBeParsedToInteger(s) {
    var res = Number.parseInt(s);
    var isnan = Number.isNaN(res);
    return !isnan;
}

function enforceColumn1And2AsOutputColumns(
    textColumnForYLatitudeOutput,
    textColumnForXLongitudeOutput
) {
    var columnForYLatitudeOutput = textColumnForYLatitudeOutput.value;
    var columnForXLongitudeOutput = textColumnForXLongitudeOutput.value;
    
    if(canBeParsedToInteger(columnForYLatitudeOutput) && canBeParsedToInteger(columnForXLongitudeOutput)) {
        var intColumnForYLatitudeOutput = parseInt(columnForYLatitudeOutput);
        var intColumnForXLongitudeOutput = parseInt(columnForXLongitudeOutput);
        var sum = Math.abs(intColumnForYLatitudeOutput) + Math.abs(intColumnForXLongitudeOutput);
        var diff =  Math.abs(intColumnForYLatitudeOutput - intColumnForXLongitudeOutput);
        var oneIsOneAndTheOtherIsTwo = ( (sum === 3) && (diff === 1) );
        if(oneIsOneAndTheOtherIsTwo) {
            return;
        }
        var yValue = 1;
        var xValue = 2;
        var xIsLower = intColumnForXLongitudeOutput < intColumnForYLatitudeOutput;        
        if(xIsLower) {
            xValue = 1;
            yValue = 2;
        }
        textColumnForYLatitudeOutput.value = yValue;
        textColumnForXLongitudeOutput.value = xValue;
        return;
    }
    textColumnForYLatitudeOutput.value = 1;
    textColumnForXLongitudeOutput.value = 2;
}

function transformButtonClickHandler(
    crsModule,
    txtAreaInput, txtAreaOutput,
    selectEpsgInput, selectEpsOutput,
    txtInputCoordSeparatorInput, txtInputCoordSeparatorOutput,
    textColumnForYLatitudeInput, textColumnForYLatitudeOutput,
    textColumnForXLongitudeInput, textColumnForXLongitudeOutput
) {
    enforceColumn1And2AsOutputColumns(textColumnForYLatitudeOutput, textColumnForXLongitudeOutput);
    var columnForYLatitudeOutput = parseInt(textColumnForYLatitudeOutput.value);
    var columnForXLongitudeOutput = parseInt(textColumnForXLongitudeOutput.value);

    if(!canBeParsedToInteger(textColumnForYLatitudeInput.value)) {
        showErrorMessage("Column for YLatitude can not be parsed to integer value: " + textColumnForYLatitudeInput.value);
        return;
    }
    if(!canBeParsedToInteger(textColumnForXLongitudeInput.value)) {
        showErrorMessage("Column for XLongitude can not be parsed to integer value: " + textColumnForXLongitudeInput.value);
        return;
    }
    var columnForYLatitudeInput = parseInt(textColumnForYLatitudeInput.value);
    var columnForXLongitudeInput = parseInt(textColumnForXLongitudeInput.value);

    var lineSeparatorForSplitting = '\n';
    var lineSeparatorForConcatenation = '\r\n';

    var linesFromTextAreaInput = txtAreaInput.value.split(lineSeparatorForSplitting);

    var epsg1 = parseInt(selectEpsgInput.value);
    var epsg2 = parseInt(selectEpsOutput.value);
    var coordSeparator1 = txtInputCoordSeparatorInput.value;
    var coordSeparator2 = txtInputCoordSeparatorOutput.value;

    var outputCoords = "";
    for(var i=0; i<linesFromTextAreaInput.length; i++) {
        var lineFromTextArea = linesFromTextAreaInput[i].trim();
        if(lineFromTextArea.indexOf(coordSeparator1) < 0) {
            continue;
        }
        var arrayWithXLongitudeAndYLatitude = lineFromTextArea.split(coordSeparator1);
        var lonLatArray = getLonLatNumbers(columnForYLatitudeInput, columnForXLongitudeInput, arrayWithXLongitudeAndYLatitude);
        if(lonLatArray == null) return;
        var xLon = lonLatArray[0];
        var yLat = lonLatArray[1];

        var coord = crsModule.CrsCoordinate.createCoordinateByEpsgNumber(epsg1, yLat, xLon);
        var targetCoord = coord.transformByEpsgNumber(epsg2);

        var coordsOutput = getOuputCoordinatesAsString(columnForYLatitudeOutput, columnForXLongitudeOutput, coordSeparator2, targetCoord);
        outputCoords += "" + coordsOutput + lineSeparatorForConcatenation;
    }
    txtAreaOutput.value = outputCoords.trim();
}

function swapTextFields(textInput1, textInput2) {
    var temp = textInput1.value;
    textInput1.value = textInput2.value;
    textInput2.value = temp;
}

function initializeSelectListsAndButtons(crsModule) {
    var buttonTransform1 = document.getElementById("buttonTransform1");
    var buttonTransform2 = document.getElementById("buttonTransform2");
    var buttonSwap1 = document.getElementById("buttonSwap1");
    var buttonSwap2 = document.getElementById("buttonSwap2");
    var selectEpsg1 = document.getElementById("selectEpsg1");
    var selectEpsg2 = document.getElementById("selectEpsg2");
    var inputColumnForYLatitude1 = document.getElementById("inputColumnForYLatitude1");
    var inputColumnForXLongitude1 = document.getElementById("inputColumnForXLongitude1");
    var inputColumnForYLatitude2 = document.getElementById("inputColumnForYLatitude2");
    var inputColumnForXLongitude2 = document.getElementById("inputColumnForXLongitude2");
    var inputCoordinateSeparator1 = document.getElementById("inputCoordinateSeparator1");
    var inputCoordinateSeparator2 = document.getElementById("inputCoordinateSeparator2");        
    var textareaWithCoordinates1 = document.getElementById("textareaWithCoordinates1");
    var textareaWithCoordinates2 = document.getElementById("textareaWithCoordinates2");

   var allCrsProjections = crsModule.CrsProjection.getAllCrsProjections();
    populateDropdownWithEpsgOptions(allCrsProjections, selectEpsg1, crsModule.CrsProjection.wgs84.getEpsgNumber());
    populateDropdownWithEpsgOptions(allCrsProjections, selectEpsg2, crsModule.CrsProjection.sweref_99_tm.getEpsgNumber());

    buttonTransform1.onclick = function(){
        showErrorMessage("");
        transformButtonClickHandler(
            crsModule,
            textareaWithCoordinates1, textareaWithCoordinates2,
            selectEpsg1, selectEpsg2,
            inputCoordinateSeparator1, inputCoordinateSeparator2,
            inputColumnForYLatitude1, inputColumnForYLatitude2,
            inputColumnForXLongitude1, inputColumnForXLongitude2
        );
    }
    
    buttonTransform2.onclick = function(){
        showErrorMessage("");
        transformButtonClickHandler(
            crsModule,
            textareaWithCoordinates2, textareaWithCoordinates1,
            selectEpsg2, selectEpsg1,
            inputCoordinateSeparator2, inputCoordinateSeparator1,
            inputColumnForYLatitude2, inputColumnForYLatitude1,
            inputColumnForXLongitude2, inputColumnForXLongitude1
        );
    }

    buttonSwap1.onclick = function(){
        swapTextFields(inputColumnForYLatitude1, inputColumnForXLongitude1);
    }
    buttonSwap2.onclick = function(){
        swapTextFields(inputColumnForYLatitude2, inputColumnForXLongitude2);
    }
}