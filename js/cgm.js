var cgm = {
        // CGM variables: declared and set in this procedure:
    setDefaults() {
            // Work variables
        cgm.filename                        = '';
        cgm.codes                           = null;   // Codes list
        cgm.byteIndex                       = 0;      // Pointer into raw bytes
        cgm.data                            = null;   // Current data chunk
        cgm.fixedValue                      = 2;      // Decimal count for display

            // Default data type byte count, used in 'read' module
        cgm._ColourComponent                = 1;  // r,g,b values: 1 byte
        cgm._ColourDirect                   = 3;  // {r,g,b} value
        cgm._ColourIndex                    = 1;  // 1,8
        cgm._Colour                         = 1;  // Bytes required according to current mode and precision
        cgm._Enum                           = 2;  // Fixed
        cgm._Index                          = 2;  // 1,6
        cgm._Integer                        = 2;  // 1,4
        cgm._Name                           = 2;  // Set in 1,16
        cgm._Real                           = 4;  // 1,5
        cgm._String                         = 0;  // String may be empty
        cgm._VC                             = 4;  // 1,5
        cgm._VDC                            = 2;  // 1,3; 3,1, 3,2
        cgm._Point                          = 4;  // 1,3; 3,1, 3,2

        // Initialize class/code variables from 'cgmClassCodeNames.js' list:
        for (const className in classBinary) {
            thisClass                       = classBinary[className];
            if (thisClass.init) {
                for (const codeName in thisClass) {
                    thisClassCode               = thisClass[codeName];
                    if (thisClassCode) {
                        if (thisClassCode.init) {
                            try {
                                eval('cgm.' + thisClassCode.text + ' = ' + thisClassCode.init);
                            } catch(ex) {
                                alert('Error initializing \'' + thisClassCode.text+ '\': ' +  ex.message);
                            }
                        }
                    }
                };                
            }
        };
    },


    // *************************************************************************
    // Dasic data resolution
    setIntegerPrecision() {cgm._Integer = (cgm.INTEGERPREC >> 3); },
    setIndexPrecision()   {cgm._Index   = (cgm.INDEXPREC   >> 3); },
    setNamePrecision()    {cgm._Name    = (cgm.NAMEPREC    >> 3); },


    // *************************************************************************
    // COLOUR
    // Setup (from Classes 1 and 2)
    // 1,7: Colour Precision
    setColourComponent() {
        cgm._ColourComponent           = (cgm.COLRPREC >> 3);
        cgm._ColourDirect              = (cgm._ColourComponent * 3);
        cgm.setColourByteCount();
    },
    // 1,8: Colour Index Precision
    setColourIndex() {
        cgm._ColourIndex               = (cgm.COLRINDEXPREC >> 3);
        cgm._colourIndexLimit          = Math.pow(2, cgm.COLRINDEXPREC) - 1;
        cgm.COLRTABLE                  = Array(cgm.MAXCOLRINDEX + 1).fill({r:0, g:0, b:0});
        cgm.setColourByteCount();
    },
    // 1,9: Maximum Colour Index
    evalColourIndexLimit() {
        return (value <= cgm._colourIndexLimit);
    },
    // 2,2: Colour Selection Mode
    setColourByteCount() {
        cgm._Colour                    = (cgm.COLRMODE === 'INDEXED')? cgm._ColourIndex: cgm._ColourDirect;
    },


    // *************************************************************************
    // VDC: Called from:
    //  1,3: VDC type
    //  3,1: VDC Integer Precision
    //  3,2: VDC Real Precision
    setPointByteCount() {
        bitCount                       = (cgm.VDCTYPE === 'INTEGER')? cgm.VDCINTEGERPREC: (cgm.VDCREALPREC.exponent + cgm.VDCREALPREC.fraction);
        cgm._VDC                       = (bitCount >> 3);
        cgm._Point                     = (cgm._VDC * 2);
    },
    setVDCEXT(isSettingMax) {
        if (isSettingMax) {
                // Synchronize Max VDC Extent to VDC Extent
            cgm.MAXVDCEXT              = JSON.parse(JSON.stringify(cgm.VDCEXT));
        }
        x                              = Math.abs(cgm.VDCEXT.secondCorner.x - cgm.VDCEXT.firstCorner.x);
        y                              = Math.abs(cgm.VDCEXT.secondCorner.y - cgm.VDCEXT.firstCorner.y);
        // Set dependent variables
        cgm.CHARHEIGHT                 = 0.01 * Math.max(x, y);
        // cgm.CHARORI.up                 = { x: 0, y: y }
        // cgm.CHARORI.base               = { x: y, y: 0 }
    },


    //###########################################################
        // Get CGM file and process
    getFile(thisHref) {
        var request = new XMLHttpRequest();
        request.open('GET', thisHref, true);
        request.responseType = "arraybuffer"
        request.send(null);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                var type = request.getResponseHeader('Content-Type');
                if (type.indexOf("image/cgm") !== 1) {
                    const arrayBuffer = request.response; 
                    cgm.bytes         = Array.from(new Uint8Array(request.response));  // new Uint8Array(arrayBuffer);
                    for (var i = 0, len = request.response.length; i < len; ++i) {
                        cgm.bytes[i] = request.response[i];
                    }
                    cgm.getBytes(thisOption.value);
                }
            }
        }
    },
    getBytes(filename) {
        if (cgm.bytes[0] === 0) {
            cgm.setDefaults();
            cgm.filename                = filename;
            document.getElementById('codesDiv').style.cursor = 'wait';
            cgm.readBinaryCgm();
            document.getElementById('codesDiv').style.cursor = 'default';
            document.dispatchEvent(top.cgmInitialized);
        } else {
            alert('Error! Only binary CGM is processed with this code.');
        }
    },
    readBinaryCgm() {
        cgm.codes                           = [];
        cgm.byteIndex                       = 0;
        while (cgm.byteIndex < cgm.bytes.length) {
                // Break this loop when 'End Metafile' was flagged:
            if (cgm.readClassCodeData()) {
                break;
            }
        }
            // Flag remaining bytes in file data
        if (cgm.byteIndex < cgm.bytes.length) {
            classCodeData                   = {};
            classCodeData.complyToVersion   = 'Yes';
            classCodeData.text              = '';
            total                           = 0
            cgm.data                        = cgm.bytes.slice(cgm.byteIndex, cgm.bytes.length);
            Array.from(cgm.data, function(byte) { total += byte; });
            if (total === 0) {
                classCodeData.parameters    = 'Warning! ' + cgm.data.length + ' remaining empty bytes.';
            } else {
                bitStream                   = Array.from(cgm.data, function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2); }).join('');
                classCodeData.parameters    = 'Warning! Remaining bytes: "' + bitStream + '".';
            }
            cgm.codes.push(classCodeData);
        }
    },

    readClassCodeData() {
            // Step 1: Get class, code and basic length
        classCodeLengthValue                = ((cgm.bytes[cgm.byteIndex++] << 8) + cgm.bytes[cgm.byteIndex++]);
        thisClassId                         =  (classCodeLengthValue         >> 12);
        thisCodeId                          = ((classCodeLengthValue & 4064) >>  5);
        thisLength                          =  (classCodeLengthValue & 31);
            // Read data
        cgm.data                            = [];
        if (thisLength === 31) {
            thisLength                      = 0;
            do {
                thisLength                  = ((cgm.bytes[cgm.byteIndex++] << 8) + cgm.bytes[cgm.byteIndex++]);
                cgm.data                    = cgm.data.concat(cgm.bytes.slice(cgm.byteIndex, cgm.byteIndex + (thisLength % 32768)));
                cgm.byteIndex              += (thisLength % 32768);
            } while (thisLength & 32768)
        } else if (thisLength > 0) {
            cgm.data                        = cgm.bytes.slice(cgm.byteIndex, cgm.byteIndex + thisLength);
            cgm.byteIndex                  += thisLength;
        }

            // Step 2: Get class/code object
        thisClass                           = classBinary['class' + thisClassId];
        if (!thisClass) {
            cgm.codes.push({
                text:       thisClassId + ',' + thisCodeId + ': Unrecognized class.',
                parameters: ''
            });
            return;
        }
        thisClassCode                       = thisClass['code' + thisCodeId];
        if (!thisClassCode) {
            cgm.codes.push({
                text:       thisClassId + ',' + thisCodeId + ': Unrecognized code.',
                parameters: ''
            });
            return;
        }

            // Step 3: Process class/code
        classCodeData                       = {
            text:       thisClassCode.text,
            parameters: '',
            isGraphic: (thisClassId === 4)
        }
            // Set output parameters
        classCodeData.parameters            = '';
        cgm.variableName                    = 'cgm.' + classCodeData.text;
            // Does class-code comply to version?
        versionClassElementLastNo           = metafileVersion['class' + thisClassId][ + cgm.MFVERSION];
        classCodeData.complyToVersion       = (thisCodeId <= versionClassElementLastNo);
            // Process class/code:
        try {
            if (thisClassCode.func) {
                thisClassCode.func();
            }
            if (classCodeData.parameters.indexOf(';') !== 0) {
                classCodeData.parameters       += ';';
            }
        } catch(ex) {
            classCodeData.parameters        = 'Error: ' + ex.message;
        }
            // Each class-code data ends on word-limit: Skip byte as required: update index and total length
        cgm.byteIndex                      += (cgm.byteIndex % 2);
            // Store data
        cgm.codes.push(classCodeData);
        cgm.data                            = null;
            // Exit with true when 'End Metafile' encountered
        return ((thisClassId === 0) && (thisCodeId === 2));
    },
};

/* -\\- */
