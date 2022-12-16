// CGM Read Module

// 1. Error class
class readError extends Error {
    constructor(message) {
      super(message);
      this.name = 'readError';
    }
}

// 2. Read Procedures
var read = {
        // Single value
        // 'postProcess' used by:        in 'cgm' module
        //       (1, 3): VDCTYPE:        setPointByteCount()
        //       (1, 6): INDEXPREC:      setIndexPrecision()
        //       (1, 7): COLRPREC:       setColourComponent()
        //       (1, 8): COLRINDEXPREC:  setColourIndex()
        //       (1, 9): MAXCOLRINDEX:   evalColourIndexLimit()
        //       (1,16): NAMEPREC:       setNamePrecision()
        //       (2, 2): COLRMODE:       setColourByteCount()
        //       (2, 6): VDCEXT:         setVDCEXT()
    _Value(valueType, testCondition, postProcess) {
        if (cgm.data.length >= eval('cgm.' + valueType)) {
            value                     = eval('read.' + valueType + '()');
            isTestTrue                = false;
            if ((testCondition === undefined) || (testCondition === null)) {
                classCodeData.parameters += ' ' + value;
            } else if (testCondition.indexOf('types') > -1) {
                try       { 
                    typesArray        = testCondition.split('.');
                    thisType          = '';
                    if (typesArray.length === 2) {
                        propertyType  = typesArray[1];
                        thisType      = thisClassCode.types[propertyType][value];
                    } else {
                        thisType      = thisClassCode.types[value];
                    }
                    classCodeData.parameters += ' ' + thisType;
                    if (thisClassCode.init) {
                        eval(cgm.variableName + ' = "' + thisType + '";');
                    }
                }
                catch(ex) { 
                    throw new readError('  Invalid ' + paramText + ': ' + value);
                }
            } else if (eval(testCondition)){
                if (thisClassCode.init) {
                    eval(cgm.variableName + ' = value;');
                }
                if (['Object','Array'].includes(typeof value))  {
                    classCodeData.parameters += ' ' + JSON.stringify(value);
                } else {
                    classCodeData.parameters += ' ' + value;
                }
            }
            if (postProcess) {
                eval('cgm.' + postProcess + '()');
            }
        } else {
            throw new readError('  Invalid  data length.');
        }
    },
        // Multiple values
    _Values(valueType) {
        values                    = [];
        while ((cgm.data.length > 0) && (cgm.data.length >= eval('cgm.' + valueType))) {
            value                 = eval('read.' + valueType + '()');
            values.push(value);
            classCodeData.parameters  += ' ' + value;
        }
    },
    
 
    // ***********************************************************************
    // VDC Procedures
    _VdcInteger()  { return read._IntegerCommon(cgm._VDC, true); },
    _VdcReal()     { return read._RealCommon(cgm._VDC, cgm.VDCREALPREC); },
    _VDC()         { return (cgm.VDCTYPE === "INTEGER")? read._VdcInteger(): read._VdcReal(); },
    _Point()       { 
        x                           = read._VDC();
        y                           = read._VDC();
        return (x + ',' + y);
    },

    // *************************************************************************
    // Types Procedures
    _Enum()     { return read._IntegerCommon(cgm._Enum,    true); },
    _Name()     { return read._IntegerCommon(cgm._Name,    true); },
    _Index()    { return read._IntegerCommon(cgm._Index,   true); },
    _Integer()  { return read._IntegerCommon(cgm._Integer, true); },
    _Real()     { return read._RealCommon(cgm._Real, cgm.REALPREC); },

        // Note: cgm.isRealPrecisionSet set with 1,5 (REAL PRECISION)
        // If preceding REAL PRECISION: use it
        // If not:                      use 32-bit floating point (9/23)
    _VC()       {
        if (cgm.isRealPrecisionSet) {
            return read._Real();
        } else {
            return read._RealCommon(4, {format:0, exponent:9, fraction:23, bias:127 });
        }
    },

    _getLineMode()     { return (cgm.LINEWIDTHMODE  === 'ABS')? '_VDC': '_Real'; },
    _getEdgeMode()     { return (cgm.EDGEWIDTHMODE  === 'ABS')? '_VDC': '_Real'; },
    _getMarkerMode()   { return (cgm.MARKERSIZEMODE === 'ABS')? '_VDC': '_Real'; },
    _getInteriorMode() { return (cgm.INTSTYLEMODE   === 'ABS')? '_VDC': '_Real'; },


    // *************************************************************************
    // Common Type procedures:
    _IntegerCommon(byteCount, isSigned) {
        value                          = 0;
        for (i = 0; i < byteCount; i += 1) {
            value                      = (value << 8) + cgm.data.shift();
        }
        if (isSigned && (value > (Math.pow(256,byteCount) / 2))) {
            value                     -= Math.pow(256,byteCount);
        }
        return value;
    },
    _RealCommon(byteCount, realPrecision) {
        value                          = 0.0;
        if (realPrecision.format === 1) {
            // First part (whole part) in a signed integer
            SI                         =  read._IntegerCommon(realPrecision.exponent >> 3, true);
            // Second part (fractional part) is an unsigned integer, divided by (2 exp fractionLength)
            UI                         = (read._IntegerCommon(realPrecision.fraction >> 3, false) / Math.pow(2, realPrecision.fraction));
            // The Real value is the sum of both parts:
            value                      = (SI + UI);
        } else {
            str                        = '';
            for (i = 0; i < byteCount; i++) {
                str                   += cgm.data.shift().toString(2).padStart(8, '0');
            }
            signStr                    = str.substring(0, 1);
            exponentStr                = str.substring(1, (realPrecision.exponent));
            fractionStr                = str.substring(realPrecision.exponent);

            sign                       = (signStr === '1')? -1: 1;
            exponent                   = parseInt(exponentStr, 2 ) - realPrecision.bias;
            fraction                   = parseInt(fractionStr, 2 ) / Math.pow(2, fractionStr.length);
  
            value                      = sign * Math.pow(2, exponent) * (1 + fraction);
        }
        return value.toFixed(cgm.fixedValue);
    },


    // ------------------------------------------------------------------------
    // Read (from class 3):
    //  Element colour
    _Colour() {
        if (cgm.COLRMODE === 'INDEXED') {
            return read._ColourIndex();
        } else {
            return read._ColourDirect();
        }
    },
    //  Colour Index
    _ColourIndex() {
        return read._IntegerCommon(cgm._ColourIndex, false);
    },
    // 3-component Colour (Background Colour, Colour Table)
    _ColourDirect() {
        return (
            read._IntegerCommon(cgm._ColourComponent, false) + ' ' +
            read._IntegerCommon(cgm._ColourComponent, false) + ' ' +
            read._IntegerCommon(cgm._ColourComponent, false)
        );
    },

    // 4, 9 Cell Array
    // 5,32 Pattern Table
    _ColourList() {
        var s = '0x';
        cgm.data.forEach(function(byte) { s += ('0' + byte.toString(16)).slice(-2); });
        classCodeData.parameters += ' ' + s;
    },
    // 5,34 Colour Table
    _ColourTable(colourIndex) {
        while (cgm.data.length >= cgm._ColourDirect) {
            cgm.COLRTABLE[colourIndex++] = read._ColourDirect();
        }
    },
    _ColourValueExtent() {
        if ([1,4].includes(cgm.COLRMODEL)) {
            read._Value('_ColourDirect'); // Minimum
            read._Value('_ColourDirect'); // Maximum
        } else {
            read._Value('_Real'); // First Component
            read._Value('_Real'); // Second Component
            read._Value('_Real'); // Third Component
        }
    },


    // *************************************************************************
    // Real Precision: Called from (1, 5)'_SetRealPrecision' and (3, 2)'_SetVdcRealPrecision':
    validateReal() {
        data = {
            format:   read._Enum(),
            exponent: read._Integer(),
            fraction: read._Integer()
        }
        if (data.format === 1) {
            if ((data.exponent === 16) && (data.fraction === 16)) {
                data.limit        = '32767';
                // Fixed simple precision values: Ok
            } else if ((data.exponent === 32) && (data.fraction === 32)) {
                data.limit        = '4294967295';
               // Fixed double precision values: Ok
            } else {
                throw new readError ('  Error: FIXED parameters inconsistent.');
            }
        } else {
            if ((data.exponent === 9) && (data.fraction === 23)) {
                // First bit is the sign: 0:positive, 1:negative
                // Next 8 bits are the biased exponent
                // 8 bits give s a range of 0 to 255
                // Bias is 1 less than half the above value: (256/2)-1 = 127
                // bias is subtracted from exponent value
                // Thus, final exponent value range is -127 to 128
                data.bias         = (Math.pow(2, (data.exponent - 2)) - 1);
                data.limit        = '10E38.53';
                // Floating simple precision values: Ok
            } else if ((data.exponent === 12) && (data.fraction === 52)) {
                // First bit is the sign: 0:positive, 1:negative
                // Next 11 bits are the biased exponent
                // 8 bits give 256: 0-255
                // Bias is 1 less than half the above value: (256/2)-1 = 127
                data.bias         = (Math.pow(2, (data.exponent - 2)) - 1);
                data.limit        = '10E308.25';
               // Floating double precision values: Ok
            } else {
                throw new readError ('  Error: FLOAT parameters inconsistent.');
            }
        }
        classCodeData.parameters += ' -' + data.limit;
        classCodeData.parameters += ' '  + data.limit;
        classCodeData.parameters += ' '  + cgm.fixedValue;
        return data;
    },

    
    // *************************************************************************
    // STRING
    _String() {
        if (cgm.data.length === 0) {
            return '';
        } else {
            try {
                var length            = cgm.data.shift();
                var dataBytes         = [];
                if (length === 255) {
                    do {
                        length        = (cgm.data.shift() << 8) + cgm.data.shift();
                        dataBytes     = dataBytes.concat(cgm.data.slice(0, (length % 32768)));
                        cgm.data      = cgm.data.slice(length % 32768);
                    } while (length & 32768)
                } else {
                    dataBytes         = cgm.data.slice(0, length);
                    cgm.data          = cgm.data.slice(length);
                }
                s = this.stringFromUTF8Array(dataBytes);   
                if (s.substring(0,1) !== '"') {
                    s                 = '"' + s;
                }
                if (s.substring(s.length - 1) !== '"') {
                    s                += '"';
                }
                return s;
            } catch(ex) {
                throw new readError('  Invalid string data.');
            }
        }
    },
    stringFromUTF8Array(dataBytes) {
        const extraByteMap = [ 1, 1, 1, 1, 2, 2, 3, 0 ];
        var count                     = dataBytes.length;
        var str                       = "";
        for (index = 0; index < count;) {
            var ch                    = dataBytes[index++];
            if (ch & 0x80) {
                var extra             = extraByteMap[(ch >> 3) & 0x07];
                if (!(ch & 0x40) || !extra || ((index + extra) > count))
                    return null;
                ch                    = ch & (0x3F >> extra);
                for (;extra > 0;extra -= 1) {
                    var chx           = dataBytes[index++];
                    if ((chx & 0xC0) != 0x80)
                        return null;
                    ch                = (ch << 6) | (chx & 0x3F);
                }
            }
            str                      += String.fromCharCode(ch);
        }
        return str;
    },

    // *************************************************************************
    // SDR: Structured Data Record, used in:
    //  1,21 Pont Properties
    //  1,22 Glyph Mapping
    //  4,28 Bitonal Tile
    //  4,29 Tile
    //  9, 1 Application Structure Attribute
    sdrDataTypeIndex: {
        index0: null,
        SDR:    '_exploreSdr()',
        CI:     '_ColourIndex()',
        CD:     '_ColourDirect()',
        N:      '_Name()',
        E:      '_Enum()',
        I:      '_Integer()',
        index7: null,
        IF8:    '_IntegerCommon(1, true)',
        IF16:   '_IntegerCommon(2, true)',
        IF32:   '_IntegerCommon(4, true)',
        IX:     '_Index()',
        R:      '_Real()',
        S:      '_String()',                                   // String
        SF:     '_String()',                                   // String Fixed
        VC:     '_VC()',                                       // Viewport Coordinate
        VDC:    '_VDC()',                                      // VDC value
        CCO:    '_IntegerCommon(cgm._ColourComponent, false)', // Colour component
        UI8:    '_IntegerCommon(1, false)',
        UI32:   '_IntegerCommon(4, false)',
        BS:     '_BitStream()',
        CL:     '_Colour()',                                   // Color List
        UI16:   '_IntegerCommon(2, false)'
    },

    sdrPropertyNames: null,

    // Structured Data record is considered of type 'S'
    // Where the first byte is the count:
    //  0-254: Basic count
    //    255: Extended count: use the next 2 bytes
    //         and where the first bit is a continuation flag
    _SDR() {    // Structure: Index, Count, data
        read.sdrPropertyNames     = Object.getOwnPropertyNames(read.sdrDataTypeIndex);
        length                    = read._IntegerCommon(1, false);
        if (length === 0) {
            return;
        } else if (length === 255) {
            length                = read._IntegerCommon(2, false);
        }
        sdrData                   = read._ExploreSdr();
    },
    _ExploreSdr() {
        index                     = read._Index();
        propertyType              = read.sdrPropertyNames[index];
        propertyProcess           = read.sdrDataTypeIndex[propertyType];
        if (propertyProcess) {
            sdrCount              = read._Integer();
            for (sdrIndex = 0; sdrIndex < sdrCount; sdrIndex += 1) {
                value             = eval('read.' + propertyProcess);
                if (propertyProcess === '_String') {
                    classCodeData.parameters += ' "' + value + '"';
                } else {
                    classCodeData.parameters += ' ' + value;
                }
            }
        }
    },


    // *************************************************************************
    // Data Record, used in:
    //  6, 1: Escape
    //  7, 2: Application Data
    _Data() {
        var s = '0x';
        cgm.data.forEach(function(byte) { s += ('0' + byte.toString(16)).slice(-2); });
        classCodeData.parameters += ' ' + s;
    },


    // *************************************************************************
    // Byte Stream: Image data used in:
    //  4,28 Bitonal Tile
    //  4,29 Tile
    _BitStream() {
        bitStream = Array.from(cgm.data, function(byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
        classCodeData.parameters += ' ' + bitStream;
    },


    // #########################################################################
    // ClassCode-specific procedures
    // 0, 0
    _No_Op() {
        if (cgm.data.length === 0) {
            classCodeData.parameters += '(Empty)';
        } else {
            dataStream            = Array.from(cgm.data, function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2); }).join('');
            try {
                classCodeData.parameters = '"' + read._String() + '"';
            } catch(ex) {
                classCodeData.parameters = '"' + dataStream + '"';
            }
        }
    },

    // 1, 4
    _SetIntegerPrecision() {
        value                         = read._Integer();
        if ([8,16,24,32].includes(value)) {
            cgm.INTEGERPREC           = value;
            limitValue                = (Math.pow(2, value) >> 1) - 1;
            classCodeData.parameters += ' '  + limitValue;
            classCodeData.parameters += ' -' + limitValue;
        } else {
            throw new readError('  Invalid INTEGERPREC value.');
        }
    },
    // 1, 5
    _SetRealPrecision() {  
        cgm.REALPREC              = read.validateReal();
        cgm._Real                 = (cgm.REALPREC.exponent + cgm.REALPREC.fraction) >> 3;
        cgm.isRealPrecisionSet    = true;
        cgm._VC                   = cgm._Real;
    },
    // 1,11
    _MetafileElementList() {
        count                     = read._Integer();
        classCodeData.parameters  = ';';
        while (cgm.data.length >= (cgm._Index * 2)) {
            classIndex        = read._Index();
            codeIndex         = read._Index();
            if (classIndex === -1) {
                thisType      = thisClassCode.types[codeIndex];
                classCodeData.parameters += '<br/>&nbsp;&nbsp;' + thisType;
            } else {
                thisClassCode = classBinary['class' + classIndex]['code' + codeIndex];
                classCodeData.parameters += '<br/>&nbsp;&nbsp;' + thisClassCode.text;
            }
        }
    },
    // 1,12: (Metafile elements)
    _MetafileDefaultsReplacement() {
        classCodeData.parameters      = ';';
        while (cgm.data.length >= (cgm._Index * 2)) {
            classId                   = read._Index();
            codeId                    = read._Index();
            thisClass                 = classBinary['class' + classId];
            if (thisClass) {
                thisCode              = thisClass['code' + codeId];
                if (thisCode) {
                    classCodeData.parameters += '<br/>&nbsp;&nbsp;' + thisCode.text;
                }
            }
        }
        classCodeData.parameters += '<br/>ENDMFDEFAULTS;'
    },
    // 1,13 nSF
    _FontsList() {
        classCodeData.parameters      = ';'
        while (cgm.data.length > 0) {
            classCodeData.parameters += '<br/>&nbsp;&nbsp;' + read._String();
        }
    },
    // 1,14 n(E,SF)
    _CharacterSetList() {
        classCodeData.parameters      = ';'
        while (cgm.data.length >= cgm._Enum) {
            classCodeData.parameters += '<br/>&nbsp;&nbsp;' + thisClassCode.types[read._Enum()];
            classCodeData.parameters += ' ' + read._String();
        }
    },
    // 1,20:  'IX,3R,18R,I,6nCCO,I,mCD,3mR'
    _ColourCalibration() {
        read._Value('_Index');
        for (colorCalibIndex = 0; colorCalibIndex < 18; colorCalibIndex += 1) {
            read._Value('_Real');
        }
        count                         = read._Integer();
        for (colorCalibCount = 0; colorCalibCount < count; colorCalibCount += 1) {
            read._IntegerCommon(cgm._ColourComponent, false);
        }
        count                         = read._Integer();
        for (colorDirectIndex = 0; colorDirectIndex < count; colorDirectIndex += 1) {
            read._ColourDirect();
        }
        count                        *= 3;
        for (realIndex = 0; realIndex < count; realIndex += 1) {
            read.__Real();
        }
    },
    // 1,21: n[IX,I,SDR]
    _FontProperties() {
        while(cgm.data.length > cgm._Integer) {
            read._Value('_Index');
            read._Value('_Integer');
            read._SDR();
        }
    },
    // 1,22: IX,E,SF,I,IX,SDR
    _GlyphMapping() {
        read._Value('_Index');
        read._Value('_Enum');
        read._Value('_String');
        read._Value('_Integer');
        read._Value('_Index');
        read._SDR();
    },
    // 1,23: nSF
    _SymbolLibraryList() {
        classCodeData.parameters      = ';'
        while (cgm.data.length >= cgm._Enum) {
            classCodeData.parameters += '<br/>&nbsp;&nbsp;' + read._String();
        }
    },
    // 1,34 E,n(SF,2[ldt])
    _PictureDirectory() {
        classCodeData.parameters      = ';'
        if (read._Value('_Enum')) {
            while (cgm.data.length >= (cgm._Integer * 2)) {
                classCodeData.parameters += '<br/>&nbsp;&nbsp;"' + read._String() + '"';
                classCodeData.parameters += ' '  + read._Integer();
                classCodeData.parameters += ' '  + read._Integer();
            }
        }
    },
    // ---------------------------------------------------
    // 2, 1
    _ScalingMode() {
        scalingMode                    = thisClassCode.types[read._Enum()]
        classCodeData.parameters += ' ' + scalingMode;
        if (scalingMode === "METRIC") {
            read._Value('_VC');            // Metric Scale
        }
    },
    // 2,18
    _HatchStyleDefinition() {
        valueType                     = read._getLineMode();
        read._Value('_Index');                         // Bundle Index
        read._Value('_Enum', 'types');                 // Interior Style
        read._Value(valueType);                        // Up X
        read._Value(valueType);                        // Up Y
        read._Value(valueType);                        // Base X
        read._Value(valueType);                        // Base X
        read._Value(valueType,        'value >= 0.0'); //Duty Cycle Length
        hatchLinesCount               = read._Integer();
        classCodeData.parameters     += ' ' + hatchLinesCount; 
        // Gaps
        for (hatchLinesIndex = 0; hatchLinesIndex < hatchLinesCount; hatchLinesIndex += 1) {
            read._Value(_Integer);
        }
        // Line Type
        for (hatchLinesIndex = 0; hatchLinesIndex < hatchLinesCount; hatchLinesIndex += 1) {
            read._Value(_Index);
        }
    },
     // 2,20
    _ApplicationStructureDirectory() {
        if (read._Value('_Enum')) {
            while (cgm.data.length >= cgm._Integer) {
                classCodeData.parameters += ' "' + read._String() + '"';
                classCodeData.parameters += ' '  + read._Integer();
            }
        }
    },

    // ---------------------------------------------------
    // 3, 1
    _SetVdcIntegerPrecision() {
        value                         = read._Integer();
        if ([16,24,32].includes(value)) {
            cgm.VDCINTEGERPREC        = value;
            limitValue                = (Math.pow(2, value) >> 1) - 1;
            classCodeData.parameters += ' '  + limitValue;
            classCodeData.parameters += ' -' + limitValue;
            cgm.setPointByteCount();
        } else {
            throw new readError('  Invalid VDCINTEGERPREC value.');
        }
    },
    // 3, 2
    _SetVdcRealPrecision() {
        cgm.VDCREALPREC               = read.validateReal();
        cgm.setPointByteCount();
    },

    // ---------------------------------------------------
    // 4, 8
    _PolygonSet() {
        while (cgm.data.length >= (cgm._Point + cgm._Enum)) {
            classCodeData.parameters += ' ' + read._Point();
            classCodeData.parameters += ' ' + thisClassCode.types[read._Enum()];
        }
    },
    // 4,10  GENERALIZED DRAWING PRIMITIVE (I,I,nP,D)
    _GDP() {
        identifier                    = read._Integer();
        PointsCount                   = read._Integer();
        for(pointIndex = 0; pointIndex < PointsCount; pointIndex += 1) {
            read._Value('_Point');
        }
        read._Value('_String');
    },
    // 4,24  NON-UNIFORM B-SPLINE
    _NUB() {
        splineOrder                   = read._Integer();
        controlPointsCount            = read._Integer();
        for(controlPointIndex = 0; controlPointIndex < controlPointsCount; controlPointIndex += 1) {
            read._Value('_Point');
        }
        knotsCount                    = (splineOrder + controlPointsCount);
        for(knotsIndex = 0; knotsIndex < knotsCount; knotsIndex += 1) {
            read._Value('_Real');
        }
        // Start Value
        read._Value('_Real');
        // End Value
        read._Value('_Real');
    },
    // 4,25  NON-UNIFORM RATIONAL B-SPLINE
    //  Note: Same as '_NUB', plus weights
    _NURB() {
        read._NUB();
        // Weights
        for(weightIndex = 0; weightIndex < splineOrder; weightIndex += 1) {
            read._Value('_Real');
        }
    },

    // ---------------------------------------------------
    // 5,35 ASPECT SOURCE FLAGS (n(E,E))
    _AspectSourceFlags() {
        classCodeData.parameters      = ';';
        while (cgm.data.length >= (cgm._Enum * 2)) {
            classCodeData.parameters += '<br/>&nbsp;&nbsp;' + thisClassCode.types["type"][read._Enum()] + '"';
            classCodeData.parameters += ' '  + thisClassCode.types["indicator"][read._Enum()];
        }
    },
    // 5,41 TEXT SCORE TYPE (n(IX,E))
    _TextScoreType() {
        while (cgm.data.length >= (cgm._Index + cgm._Enum)) {
            classCodeData.parameters += ' ' + read._Index();
            classCodeData.parameters += ' ' + read._Enum();
        }
    },
    // 5,43 INTERPOLATED INTERIOR (IX,2nSS,I,mR,kCO), SS according to 2:16
    _InterpolatedInterior() {
        // 'IX'
        style                         = read._Index();
        classCodeData.parameters += ' ' + style;
        // Sizes: '2nSS'
        scalars = (style === 1)? 2: 4;
        for (scalarIndex = 0; scalarIndex < scalars; scalarIndex += 1) {
            read._Value('_VDC');
        }

        // 'I'
        stages                        = read._Integer();
        classCodeData.parameters += ' ' + stages;
        // Stage Designators: 'mR'
        for (stageIndex = 0; stageIndex < stages; stageIndex += 1) {
            read._Value('_Real');
        }

        // Colours: 'kCO
        colourCount = (style === 3)? 3:   stages + 1;
        for (colourIndex = 0; colourIndex < colourCount; colourIndex += 1) {
            read._Value('_Colour');
        }
    },

};

/* -\\- */
