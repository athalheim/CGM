// 
metafileVersion = {
    class0: [, 5, 9,20,23],
    class1: [,15,18,23,24],
    class2: [, 7,15,19,20],
    class3: [, 6,12,20,20],
    class4: [,19,21,29,29],
    class5: [,35,36,51,51],
    class6: [, 1, 1, 1, 1],
    class7: [, 2, 2, 2, 2],
    class8: [, 0, 7, 7, 7],
    class9: [, 0, 0, 0, 1],
};

classBinary = {
    class0: {
        title: 'Delimiter elements',
        init:  null,
        code0: {
            desc:  'no-op',
            text:  'no-op',
            parm:  'D',
            init:  null,
            types: null,
            func() { read._No_Op(); }
        },
        code1: {
            desc:  'BEGIN METAFILE',
            text:  'BEGMF',
            parm:  'SF',
            init:  null,
            types: null,
            func() { read._Value('_String'); }
        },
        code2: {
            desc:  'END METAFILE',
            text:  'ENDMF',
            parm:  null,
            init:  null,
            types: null,
            //func() {}
        },
        code3: {
            desc:  'BEGIN PICTURE',
            text:  'BEGPIC',
            parm:  'SF',
            init:  null,
            types: null,
            func() { read._Value('_String'); }
        },
        code4: {
            desc:  'BEGIN PICTURE BODY',
            text:  'BEGPICBODY',
            parm:  null,
            init:  null,
            types: null,
            //func() {}
        },
        code5: {
            desc:  'END PICTURE',
            text:  'ENDPIC',
            parm:  null,
            init:  null,
            types: null,
            //func() {}
        },
        // Version 1 stops here.
        code6: {
            desc:  'BEGIN SEGMENT',
            text:  'BEGSEG',
            parm:  'N',
            init:  null,
            types: null,
            func() { read._Value('_Name'); }
        },
        code7: {
            desc:  'END SEGMENT',
            text:  'ENDSEG',
            parm:  null,
            init:  null,
            types: null,
            //func() {}
        },
        code8: {
            desc:  'BEGIN FIGURE',
            text:  'BEGFIGURE',
            parm:  null,
            init:  null,
            types: null,
            //func() {}
        },
        code9: {
            desc:  'END FIGURE',
            text:  'ENDFIGURE',
            parm:  null,
            init:  null,
            types: null,
            //func() {}
        },
        // Version 2 stops here.
        code10: null,
        code11: null,
        code12: null,
        code13: {
            desc:  'BEGIN PROTECTION REGION',
            text:  'BEGPROTREGION',
            parm:  'IX',
            init:  null,
            types: null,
            func() { read._Value('_Index'); }
        },
        code14: {
            desc:  'END PROTECTION REGION',
            text:  'ENDPROTREGION',
            parm:  null,
            init:  null,
            types: null,
            //func() {}
        },
        code15: {
            desc:  'BEGIN COMPOUND LINE',
            text:  'BEGCOMPOLINE',
            parm:  null,
            init:  null,
            types: null,
            //func() {}
        },
        code16: {
            desc:  'END COMPOUND LINE',
            text:  'ENDCOMPOLINE',
            parm:  null,
            init:  null,
            types: null,
            //func() {}
        },
        code17: {
            desc:  'BEGIN COMPOUND TEXT PATH',
            text:  'BEGCOMPOTEXTPATH',
            parm:  null,
            init:  null,
            types: null,
            //func() {}
        },
        code18: {
            desc:  'END COMPOUND TEXT PATH',
            text:  'ENDCOMPOTEXTPATH',
            parm:  null,
            init:  null,
            types: null,
            //func() {}
        },
        code19: {
            desc:  'BEGIN TILE ARRAY',
            text:  'BEGTILEARRAY',
            parm:  'P,2E,4I,2R,2I,2I',
            init:  null,
            types: {
                cellPathDirection: {
                    0: "0",
                    1: "90",
                    2: "180",
                    3: "270"
                },
                cellLineDirection: {
                    0: "90",
                    1: "270"
                },
            },
            func() {
                read._Value('_Point');                              // Location
                read._Value('_Enum',    'types.cellPathDirection'); // Cell Path Direction');
                read._Value('_Enum',    'types.cellLineDirection'); // Cell Line Direction');
                read._Value('_Integer', '(value >  0)');            // Path Tiles Count');
                read._Value('_Integer', '(value >  0)');            // Line Tiles Count');
                read._Value('_Integer', '(value >  0)');            // Cells Per Tile In Path Direction');
                read._Value('_Integer', '(value >  0)');            // Cells Per Tile In Line Direction');
                read._Value('_Real',    '(value >  0.0)');          // Path Cell Size');
                read._Value('_Real',    '(value >  0.0)');          // Line Cell Size');
                read._Value('_Integer');                            // Image Offset In Path Direction');
                read._Value('_Integer');                            // Image Offset In Line Direction');
                read._Value('_Integer', '(value >  0)');            // Image Cell Count In Path Direction');
                read._Value('_Integer', '(value >  0)');            // Image Cell Count In Line Direction');
            }
        },
        code20: {
            desc:  'END TILE ARRAY',
            text:  'ENDTILEARRAY',
            parm:  null,
            init:  null,
            types: null,
            //func() {}
        },
        // Version 3 stops here.
        code21: {
            desc:  'BEGIN APPLICATION STRUCTURE',
            text:  'BEGAPS',
            parm:  'SF,SF,E',
            init:  null,
            types: {
                0: "STLIST",
                1: "APS"
            },
            func() {
                read._Value('_String');          // Identifier');
                read._Value('_String');          // apstype');
                read._Value('_Enum',  'types');  // Inheritance Flag');
            }
        },
        code22: {
            desc:  'BEGIN APPLICATION STRUCTURE BODY',
            text:  'BEGAPSBODY',
            parm:  null,
            init:  null,
            types: null,
            //func() {}
        },
        code23: {
            desc:  'END APPLICATION STRUCTURE',
            text:  'ENDAPS',
            parm:  null,
            init:  null,
            types: null,
            //func() {}
        },
    },
    class1: {
        title: 'Metafile Descriptor elements',
        init: true,
        code1: {
            desc:  'METAFILE VERSION',
            text:  'MFVERSION',
            parm:  'I',
            init:  1,
            types: null,
            func() { read._Value('_Integer', '(value >= 1) && (value <= 4)'); }
        },
        code2: {
            desc:  'METAFILE DESCRIPTION',
            text:  'MFDESC',
            parm:  'SF',
            init:  '""',
            types: null,
            func() { read._Value('_String'); }
        },
        code3: {
            desc:  'VDC TYPE',
            text:  'VDCTYPE',
            parm:  'E',
            init:  '"INTEGER"',
            types: {
                0: "INTEGER",
                1: "REAL"
            },
            func() { read._Value('_Enum', 'types', 'setPointByteCount'); }
        },
        code4: {
            desc:  'INTEGER PRECISION',
            text:  'INTEGERPREC',
            parm:  'I',
            init:  16,
            types: null,
            func() { read._SetIntegerPrecision(); }
        },
        code5: {
            desc:  'REAL PRECISION',
            text:  'REALPREC',
            parm:  'E,2I',
            init:  '{format:1,exponent:16,fraction:16}',
            types: {    // Not used
                0: "FLOATING",
                1: "FIXED"
            },
            func() { read._SetRealPrecision(); }
        },
        code6: {
            desc:  'INDEX PRECISION',
            text:  'INDEXPREC',
            parm:  'I',
            init:  16,
            types: null,
            func() { read._Value('_Integer', '[ 8,16,24,32].includes(value)', 'setIndexPrecision'); }
        },
        code7: {
            desc:  'COLOUR PRECISION',
            text:  'COLRPREC',
            parm:  'I',
            init:  8,
            types: null,
            func() { read._Value('_Integer', '[ 8,16,24,32].includes(value)', 'setColourComponent'); }
        },
        code8: {
            desc:  'COLOUR INDEX PRECISION',
            text:  'COLRINDEXPREC',
            parm:  'I',
            init:  8,
            types: null,
            func() { read._Value('_Integer', '[ 8,16,24,32].includes(value)', 'setColourIndex'); }
        },
        code9: {
            desc:  'MAXIMUM COLOUR INDEX',
            text:  'MAXCOLRINDEX',
            parm:  'CI',
            init:  63,
            types: null,
            func() { read._Value('_ColourIndex', null, 'evalColourIndexLimit'); }
        },
        code10: {
            desc:  'COLOUR VALUE EXTENT',
            text:  'COLRVALUEEXT',
            parm:  '2CD or 6R',
            init:  null,
            types: null,
            func() { read._ColourValueExtent(); }
        },
        code11: {
            desc:  'METAFILE ELEMENT LIST',
            text:  'MFELEMLIST',
            parm:  'I,2nIX',
            init:  null,
            types: {
                0: "DRAWINGSET",
                1: "DRAWINGPLUS",
                2: "VERSION2",
                3: "EXTDPRIM",
                4: "VERSION2GKSM",
                5: "VERSION3",
                6: "VERSION4"
            },
            func() { read._MetafileElementList(); }
        },
        code12: {
            desc:  'METAFILE DEFAULTS REPLACEMENT',
            text:  'BEGMFDEFAULTS',
            parm:  '(Metafile elements)',
            init:  null,
            types: null,
            func() { read._MetafileDefaultsReplacement(); }
        },
        code13: {
            desc:  'FONT LIST',
            text:  'FONTLIST',
            parm:  'nSF',
            init:  null,
            types: null,
            func() { read._FontsList(); }
        },
        code14: {
            desc:  'CHARACTER SET LIST',
            text:  'CHARSETLIST',
            parm:  'n(E,SF)',
            init:  null,
            types: {
                0: "STD94",
                1: "STD96",
                2: "STD94MULTIBYTE",
                3: "STD96MULTIBYTE",
                4: "COMPLETECODE"
            },
            func() { read._CharacterSetList(); }
        },
        code15: {
            desc:  'CHARACTER CODING ANNOUNCER',
            text:  'CHARCODING',
            parm:  'E',
            init:  '"BASIC7BIT"',
            types: {
                0: "BASIC7BIT",
                1: "BASIC8BIT",
                2: "EXTD7BIT",
                3: "EXTD8BIT"
            },
            func() { read._Value('_Enum', 'types'); }
        },
        // Version 1 stops here.
        code16: {
            desc:  'NAME PRECISION',
            text:  'NAMEPREC',
            parm:  'I',
            init:  16,
            types: null,
            func() { read._Value('_Integer', '[8,16,24,34].includes(value)', 'setNamePrecision'); }
        },
        code17: {
            desc:  'MAXIMUM VDC EXTENT',
            text:  'MAXVDCEXT',
            parm:  '2P',
            init:  '{firstCorner:{x:0, y:0}, secondCorner:{x: 32767, y: 32767}}',
            types: null,
            func() {
                read._Value('_Point'); // First Corner
                read._Value('_Point'); // Second Corner'
            }
        },
        code18: {
            desc:  'SEGMENT PRIORITY EXTENT',
            text:  'SEGPRIEXT',
            parm:  '2I',
            init:  '{minimum:0, maximum:255}',
            types: null,
            func() {
                read._Value('_Integer', 'value >= 0'); // Minimum
                read._Value('_Integer', 'value >= 0'); // Maximum
            }
        },
        // Version 2 stops here.
        code19: {
            desc:  'COLOUR MODEL',
            text:  'COLRMODEL',
            parm:  'IX',
            init:  '1',
            types: {    // Not used
                1: "RGB",
                2: "CIELAB",
                3: "CIELUV",
                4: "CMYK",
                5: "RGB-related"
            },
            func() { read._Value('_Index'); }
        },
        code20: {
            desc:  'COLOUR CALIBRATION',
            text:  'COLRCALIB',
            parm:  'IX,3R,18R,I,6nCCO,I,mCD,3mR',
            init:  null,
            types: {
                calibSelection: {
                    1: "unspecified", 
                    2: "reference white only",
                    3: "reference white, matrix1",
                    4: "reference white, matrix1, lookup tables",
                    5: "reference white, matrix1, lookup tables, matrix2",
                    6: "reference white, matrix1, matrix2",
                    7: "lookup tables, matrix2",
                    8: "matrix2",
                    9: "reference white, grid locations + grid values",
                    //>9: reserved for registered values
                },
            },
            func() { read._ColourCalibration(); }
        },
        code21: {
            desc:  'FONT PROPERTIES',
            text:  'FONTPROP',
            parm:  'n[IX,I,SDR]',
            init:  null,
            types: null,
            func() { read._FontProperties(); }
        },
        code22: {
            desc:  'GLYPH MAPPING',
            text:  'GLYPHMAP',
            parm:  'IX,E,SF,I,IX,SDR',
            init:  null,
            types: null,
            func() { read._GlyphMapping(); }
        },
        code23: {
            desc:  'SYMBOL LIBRARY LIST',
            text:  'SYMBOLLIBLIST',
            parm:  'nSF',
            init:  null,
            types: null,
            func() { read._SymbolLibraryList(); }
        },
        // Version 3 stops here.
        code24: {
            desc:  'PICTURE DIRECTORY',
            text:  'PICDIR',
            parm:  'E,n(SF,2[ldt])',
            init:  null,
            types: null,
            func() { read._PictureDirectory(); }
        },
    },
    class2: {
        title: 'Picture Descriptor elements',
        init:  true,
        code1: {
            desc:  'SCALING MODE',
            text:  'SCALEMODE',
            parm:  'E,R (FP)',
            init:  '{mode:"Metric", value:1.0}',
            types: {
                0: "ABSTRACT",
                1: "METRIC"            
            },
            func() { read._ScalingMode(); }
        },
        code2: {
            desc:  'COLOUR SELECTION MODE',
            text:  'COLRMODE',
            parm:  'E',
            init:  '"INDEXED"',
            types: {
                0: "INDEXED",
                1: "DIRECT"
            },
            func() { read._Value('_Enum', 'types', 'setColourByteCount'); }
        },
        code3: {
            desc:  'LINE WIDTH SPECIFICATION MODE',
            text:  'LINEWIDTHMODE',
            parm:  'E',
            init:  '"SCALED"',
            types: {
                0: "ABS",
                1: "SCALED",
                2: "FRACTIONAL",
                3: "MM"
            },
            func() { read._Value('_Enum', 'types'); }
        },
        code4: {
            desc:  'MARKER SIZE SPECIFICATION MODE',
            text:  'MARKERSIZEMODE',
            parm:  'E',
            init:  '"SCALED"',
            types: {
                0: "ABS",
                1: "SCALED",
                2: "FRACTIONAL",
                3: "MM"
            },
            func() { read._Value('_Enum', 'types'); }
        },
        code5: {
            desc:  'EDGE WIDTH SPECIFICATION MODE',
            text:  'EDGEWIDTHMODE',
            parm:  'E',
            init:  '"SCALED"',
            types: {
                0: "ABS",
                1: "SCALED",
                2: "FRACTIONAL",
                3: "MM"
            },
            func() { read._Value('_Enum', 'types'); }
        },
        code6: {
            desc:  'VDC EXTENT',
            text:  'VDCEXT',
            parm:  '2P',
            init:  '{firstCorner:{x:0,y:0}, secondCorner:{x:32767,y:32767}}',
            types: null,
            func() {
                read._Value('_Point');                     // First Corner
                read._Value('_Point', null, 'setVDCEXT'); //  Second Corner
            }
        },
        code7: {
            desc:  'BACKGROUND COLOUR',
            text:  'BACKCOLR',
            parm:  'CD',
            init:  '{r:0, g:0, b:0}',
            types: null,
            func() { read._Value('_ColourDirect'); }
        },
        // Version 1 stops here.
        code8: {
            desc:  'DEVICE VIEWPORT',
            text:  'DEVVP',
            parm:  '2VP',
            init:  '{firstCorner:{x:0,y:0}, secondCorner:{x:1,y:1}}',
            types: null,
            func() {
                read._Value('_Point'); // First Corner
                read._Value('_Point'); // Second Corner
            }
        },
        code9: {
            desc:  'DEVICE VIEWPORT SPECIFICATION MODE',
            text:  'DEVVPMODE',
            parm:  'E,R(FP)',
            init:  null,
            types: {
                0: "FRACTION",
                1: "MM",
                2: "PHYDEVCOORD"
            },
            func() {
                read._Value('_Enum', 'types'); // VC Specifier
                read._Value('_VC');            // Scale
            }
        },
        code10: {
            desc:  'DEVICE VIEWPORT MAPPING',
            text:  'DEVVPMAP',
            parm:  '3E',
            init:  null,
            types: {
                isotropyFlag: {
                    0: "NOTFORCED",
                    1: "FORCED"
                },
                horizontalAlignmentFlag: {
                    0: "LEFT",
                    1: "CTR",
                    2: "RIGHT"
                },
                verticalAlignmentFlag: {
                    0: "BOTTOM",
                    1: "CTR",
                    2: "TOP"
                },
            },
            func() {
                read._Value('_Enum', 'types.isotropyFlag');            // Isotropy Flag
                read._Value('_Enum', 'types.horizontalAlignmentFlag'); // Horizontal Alignment Flag
                read._Value('_Enum', 'types.verticalAlignmentFlag');   // Vertical Alignment Flag
            }
        },
        code11: {
            desc:  'LINE REPRESENTATION',
            text:  'LINEREP',
            parm:  '2IX,SS,CO',
            init:  null,
            types: {    // Not used
                1: "solid",
                2: "dash",
                3: "Dot",
                4: "Dash-dot",
                5: "Dash-dot-dot"
            },
            func() {
                valueType                   = read._getLineMode();
                read._Value('_Index');                  // Bundle Index
                read._Value('_Index');                  // Line Type
                read._Value(valueType, '(value >= 0)'); // Line Width
                read._Value('_Colour');                 // Line Colour
            }
        },
        code12: {
            desc:  'MARKER REPRESENTATION',
            text:  'MARKERREP',
            parm:  '2IX,SS,CO',
            init:  null,
            types: {     // Not used
                1: "Dot",
                2: "Plus",
                3: "Asterisk",
                4: "Circle",
                5: "Cross"
            },
            func() {
                valueType                   = read._getMarkerMode();
                read._Value('_Index');                  // Bundle Index
                read._Value('_Index');                  // Marker Type
                read._Value(valueType, '(value >= 0)'); // Marker Size
                read._Value('_Colour');                 // Marker Colour
            }
        },
        code13: {
            desc:  'TEXT REPRESENTATION',
            text:  'TEXTREP',
            parm:  '2IX,E,2R,CO',
            init:  null,
            types: {
                0: "STRING",
                1: "CHAR",
                2: "STROKE"
            },
            func() {
                read._Value('_Index');                // Bundle Index
                read._Value('_Index');                // Text Font Index
                read._Value('_Enum', 'types');        // Text Precision
                read._Value('_Real', 'value >= 0.0'); // Character Spacing
                read._Value('_Real', 'value >= 0.0'); // Character Expansion Factor
                read._Value('_Colour');               // Text Colour
            }
        },
        code14: {
            desc:  'FILL REPRESENTATION',
            text:  'FILLREP',
            parm:  'IX,E,CO,2IX',
            init:  null,
            types: {
                0: "HOLLOW",
                1: "SOLID",
                2: "PAT",
                3: "HATCH",
                4: "EMPTY",
                5: "GEOPAT",
                6: "INTERP"
            },
            func() {
                read._Value('_Index');                       //                                                                                                                                                                                  'Bundle Index');
                read._Value('_Enum', 'types');               // Interior Style
                read._Value('_Colour');                      // Fill Colour
                read._Value('_Index');                       // Hatch Index
                read._Value('_Index');                       // Pattern Index
            }
        },
        code15: {
            desc:  'EDGE REPRESENTATION',
            text:  'EDGEREP',
            parm:  '2IX,SS,CO',
            init:  null,
            types: {    // Not used
                1: "solid",
                2: "dash",
                3: "Dot",
                4: "Dash-dot",
                5: "Dash-dot-dot"
            },
            func() {
                valueType                   = read._getEdgeMode();
                read._Value('_Index');                  // Bundle Index
                read._Value('_Index');                  // Edge Type
                read._Value(valueType, '(value >= 0)'); // Edge Width
                read._Value('_Colour');                 // Edge Colour
            }
        },
        // Version 2 stops here.
        code16: {
            desc:  'INTERIOR STYLE SPECIFICATION MODE',
            text:  'INTSTYLEMODE',
            parm:  'E',
            init:  '"ABS"',
            types: {
                0: "ABS",
                1: "SCALED",
                2: "FRACTIONAL",
                3: "MM"
            },
            func() { read._Value('_Enum', 'types'); }
        },
        code17: {
            desc:  'LINE AND EDGE TYPE DEFINITION',
            text:  'LINEEDGETYPEDEF',
            parm:  'IX,SS,nI',
            init:  null,
            types: null,
            func() {
                valueType                   = read._getLineMode();
                read._Value('_Index');                // Bundle Index
                read._Value(valueType, 'value >= 0'); // Size
                read._Value('_Integer');              // Dashes
            }
        },
        code18: {
            desc:  'HATCH STYLE DEFINITION',
            text:  'HATCHSTYLEDEF',
            parm:  'IX,E,4SS,SS,I,nI,nIX',
            init:  null,
            types: {
                0: "PARALLEL",
                1: "CROSSHATCH"
            },
            func() { read._HatchStyleDefinition(); }
        },
        code19: {
            desc:  'GEOMETRIC PATTERN DEFINITION',
            text:  'GEOPATDEF',
            parm:  'IX,N,2P',
            init:  null,
            types: null,
            func() {
                read._Value('_Index', 'value >= 0'); // Bundle Index
                read._Value('_Name');                // Identifier
                read._Value('_Point');               // First Corner
                read._Value('_Point');               // Second Corner
            }
        },
        // Version 3 stops here.
        code20: {
            desc:  'APPLICATION STRUCTURE DIRECTORY',
            text:  'APSDIR',
            parm:  'E,n(SF,[ldt])',
            init:  null,
            types: {
                0: "UI8",
                1: "UI16",
                2: "UI32"
            },
            func() { read._ApplicationStructureDirectory(); }
        },
    },
    class3: {
        title: 'Control elements',
        init:  true,
        code1: {
            desc:  'VDC INTEGER PRECISION',
            text:  'VDCINTEGERPREC',
            parm:  'I',
            init:  16,
            types: null,
            func() { read._SetVdcIntegerPrecision(); }
        },
        code2: {
            desc:  'VDC REAL PRECISION',
            text:  'VDCREALPREC',
            parm:  'E,2I',
            init:  '{format:1,exponent:16,fraction:16,bias:0}',
            types: {    // Not used
                0: "FLOATING",
                1: "FIXED"
            },
            func() { read._SetVdcRealPrecision(); }
        },
        code3: {
            desc:  'AUXILIARY COLOUR',
            text:  'AUXCOLR',
            parm:  'CO',
            init:  0,
            types: null,
            func() { read._Value('_Colour'); }
        },
        code4: {
            desc:  'TRANSPARENCY',
            text:  'TRANSPARENCY',
            parm:  'E',
            init:  '"ON"',
            types: {
                0: "OFF",
                1: "ON"
            },
            func() { read._Value('_Enum', 'types'); }
        },
        code5: {
            desc:  'CLIP RECTANGLE',
            text:  'CLIPRECT',
            parm:  '2P',
            init:  null,
            types: null,
            func() {
                read._Value('_Point'); // First Corner
                read._Value('_Point'); // Second Corner
            }
        },
        code6: {
            desc:  'CLIP INDICATOR',
            text:  'CLIP',
            parm:  'E',
            init:  '"ON"',
            types: {
                0: "OFF",
                1: "ON"
            },
            func() { read._Value('_Enum', 'types'); }
        },
        // Version 1 stops here.
        code7: {
            desc:  'LINE CLIPPING MODE',
            text:  'LINECLIPMODE',
            parm:  'E',
            init:  0,
            types: {
                0: "LOCUS",
                1: "SHAPE",
                2: "LOCUSTHENSHAPE"
            },
            func() { read._Value('_Enum', 'types'); }
        },
        code8: {
            desc:  'MARKER CLIPPING MODE',
            text:  'MARKERCLIPMODE',
            parm:  'E',
            init:  0,
            types: {
                0: "LOCUS",
                1: "SHAPE",
                2: "LOCUSTHENSHAPE"
            },
            func() { read._Value('_Enum', 'types'); }
        },
        code9: {
            desc:  'EDGE CLIPPING MODE',
            text:  'EDGECLIPMODE',
            parm:  'E',
            init:  0,
            types: {
                0: "LOCUS",
                1: "SHAPE",
                2: "LOCUSTHENSHAPE"
            },
            func() { read._Value('_Enum', 'types'); }
        },
        code10: {
            desc:  'NEW REGION',
            text:  'NEWREGION',
            parm:  null,
            init:  null,
            types: null,
            //func() {}
        },
        code11: {
            desc:  'SAVE PRIMITIVE CONTEXT',
            text:  'SAVEPRIMCONT',
            parm:  'N',
            init:  0,
            types: null,
            func() { read._Value('_Name'); }
        },
        code12: {
            desc:  'RESTORE PRIMITIVE CONTEXT',
            text:  'RESPRIMCONT',
            parm:  'N',
            init:  0,
            types: null,
            func() { read._Value('_Name'); }
        },
        // Version 2 stops here.
        // Codes 13 to 16 are not defined in specification
        code13: null,
        code14: null,
        code15: null,
        code16: null,
        code17: {
            desc:  'PROTECTION REGION INDICATOR',
            text:  'PROTREGION',
            parm:  '2IX',
            init:  null,
            types: {     // Not used
                1: "off",
                2: "clip",
                3: "shield"
            },
            func() {
                read._Value('_Index', '(value >= 0)'); // Index
                read._Value('_Index');                 // Indicator
            }
        },
        code18: {
            desc:  'GENERALIZED TEXT PATH MODE',
            text:  'GENTEXTPATHMODE',
            parm:  'E',
            init:  0,
            types: {
                0: "OFF",
                1: "NONAXIS",
                2: "AXIS"
            },
            func() { read._Value('_Enum', 'types'); }
        },
        code19: {
            desc:  'MITRE LIMIT',
            text:  'MITRELIMIT',
            parm:  'R',
            init:  32767.0,
            types: null,
            func() { read._Value('_Real', '(value >= 0.0)'); }
        },
        code20: {
            desc:  'TRANSPARENT CELL COLOUR',
            text:  'TRANSPCELLCOLR',
            parm:  'E,CO',
            init:  null,
            types: {
                0: "OFF",
                1: "ON"
            },
            func() {
                read._Value('_Enum', 'types'); // Indicator
                read._Value('_Colour');        // Colour
            }
        },
    },
    class4: {
        title: 'Graphical Primitive elements',
        init:  null,
        code1: {
            desc:  'POLYLINE',
            text:  'LINE',
            parm:  'nP',
            init:  null,
            types: null,
            func() { read._Values('_Point'); }
        },
        code2: {
            desc:  'DISJOINT POLYLINE',
            text:  'DISJTLINE',
            parm:  'nP',
            init:  null,
            types: null,
            func() {  read._Values('_Point');  }
        },
        code3: {
            desc:  'POLYMARKE',
            text:  'MARKER',
            parm:  'nP',
            init:  null,
            types: null,
            func() {  read._Values('_Point');  }
        },
        code4: {
            desc:  'TEXT',
            text:  'TEXT',
            parm:  'P,E,S',
            init:  null,
            types: {
                0: "NOTFINAL",
                1: "FINAL"
            },
            func() {
                read._Value('_Point');         // Location
                read._Value('_Enum', 'types'); // Final Flag
                read._Value('_String');        // String
            }
        },
        code5: {
            desc:  'RESTRICTED TEXT',
            text:  'RESTRTEXT',
            parm:  '2VDC,P,E,S',
            init:  null,
            types: {
                0: "NOTFINAL",
                1: "FINAL"
            },
            func() {
                read._Value('_VDC', '(value > 0.0)'); // Rectangle Width
                read._Value('_VDC', '(value > 0.0)'); // Rectangle Height
                read._Value('_Point');                // Location
                read._Value('_Enum', 'types');        // Final Flag
                read._Value('_String');               // String
            }
        },
        code6: {
            desc:  'APPEND TEXT',
            text:  'APNDTEXT',
            parm:  'E,S',
            init:  null,
            types: {
                0: "NOTFINAL",
                1: "FINAL"
            },
            func() {
                read._Value('_Enum', 'types'); // Final Flag
                read._Value('_String');        // String
            }
        },
        code7: {
            desc:  'POLYGON',
            text:  'POLYGON',
            parm:  'nP',
            init:  null,
            types: null,
            func() { read._Values('_Point'); }
        },
        code8: {
            desc:  'POLYGON SET',
            text:  'POLYGONSET',
            parm:  'n(P,E)',
            init:  null,
            types: {
                0: "INVIS",
                1: "VIS",
                2: "CLOSEINVIS",
                3: "CLOSEVIS"
            },
            func() { read._PolygonSet(); }
        },
        code9: {
            desc:  'CELL ARRAY',
            text:  'CELLARRAY',
            parm:  '3P,3I,E,CLIST',
            init:  null,
            types: {    // Not used
                0: "Run Length",
                1: "Packed"
            },
            func() {
                read._Value('_Point');                                           // First Corner
                read._Value('_Point');                                           // Second Corner
                read._Value('_Point');                                           // Third Corner
                read._Value('_Integer', 'value > 0');                            // Cell Count X
                read._Value('_Integer', 'value > 0');                            // Cell Count Y
                read._Value('_Integer', '[0,1,2,4,8,16,24,32].includes(value)'); // Colour Precision
                read._Value('_Enum');                                            // Representation Mode
                read._ColourList('colourList');
            }
        },
        code10: {
            desc:  'GENERALIZED DRAWING PRIMITIVE',
            text:  'GDP',
            parm:  'I,I,nP,D',
            init:  null,
            types: null,
            func() { read._GDP(); }
        },
        code11: {
            desc:  'RECTANGLE',
            text:  'RECT',
            parm:  '2P',
            init:  null,
            types: null,
            func() {
                read._Value('_Point'); // First Corner
                read._Value('_Point'); // Second Corner
            }
        },
        code12: {
            desc:  'CIRCLE',
            text:  'CIRCLE',
            parm:  'P,VDC',
            init:  null,
            types: null,
            func() {
                read._Value('_Point'); // Center
                read._Value('_VDC');   // Radius
            }
        },
        code13: {
            desc:  'CIRCULAR ARC 3 POINT',
            text:  'ARC3PT',
            parm:  '3P',
            init:  null,
            types: null,
            func() {
                read._Value('_Point'); // First Point
                read._Value('_Point'); // Second Point
                read._Value('_Point'); // Third Point
            }
        },
        code14: {
            desc:  'CIRCULAR ARC 3 POINT CLOSE',
            text:  'ARC3PTCLOSE',
            parm:  '3P,E',
            init:  null,
            types: {
                0: "PIE",
                1: "CHORD"
            },
            func() {
                read._Value('_Point');         // First Point
                read._Value('_Point');         // Second Point
                read._Value('_Point');         // Third Point
                read._Value('_Enum', 'types'); // Close Flag
            }
        },
        code15: {
            desc:  'CIRCULAR ARC CENTRE',
            text:  'ARCCTR',
            parm:  'P,4VDC,VDC',
            init:  null,
            types: null,
            func() {
                read._Value('_Point'); // Center
                read._Value('_Point'); // First Arc Point
                read._Value('_Point'); // Second Arc Point
                read._Value('_VDC');   // Radius
            }
        },
        code16: {
            desc:  'CIRCULAR ARC CENTRE CLOSE',
            text:  'ARCCTRCLOSE',
            parm:  'P,4VDC,VDC,E',
            init:  null,
            types: {
                0: "PIE",
                1: "CHORD"
            },
            func() {
                read._Value('_Point');         // Center
                read._Value('_Point');         // First Arc Point
                read._Value('_Point');         // Second Arc Point
                read._Value('_VDC');           // Radius
                read._Value('_Enum', 'types'); // Close Flag
            }
        },
        code17: {
            desc:  'ELLIPSE',
            text:  'ELLIPSE',
            parm:  '3P',
            init:  null,
            types: null,
            func() {
                read._Value('_Point'); // Center
                read._Value('_Point'); // First Axis Point
                read._Value('_Point'); // Second Axis Point
            }
        },
        code18: {
            desc:  'ELLIPTICAL ARC',
            text:  'ELLIPARC',
            parm:  '3P,4VDC',
            init:  null,
            types: null,
            func() {
                read._Value('_Point'); // Center
                read._Value('_Point'); // First Axis Point
                read._Value('_Point'); // Second Axis Point
                read._Value('_Point'); // First Arc Point
                read._Value('_Point'); // Second Arc Point
            }
        },
        code19: {
            desc:  'ELLIPTICAL ARC CLOSE',
            text:  'ELLIPARCCLOSE',
            parm:  '3P,4VDC,E',
            init:  null,
            types: {
                0: "PIE",
                1: "CHORD"
            },
            func() {
                read._Value('_Point');         // Center
                read._Value('_Point');         // First Axis Point
                read._Value('_Point');         // Second Axis Point
                read._Value('_Point');         // First Arc Point
                read._Value('_Point');         // Second Arc Point
                read._Value('_Enum', 'types'); // Close Flag
            }
        },
        // Version 1 stops here.
        code20: {
            desc:  'CIRCULAR ARC CENTRE REVERSED',
            text:  'ARCCTRREV',
            parm:  'P,4VDC,VDC',
            init:  null,
            types: null,
            func() {
                read._Value('_Point'); // Center
                read._Value('_Point'); // First Arc Point
                read._Value('_Point'); // Second Arc Point
                read._Value('_VDC');   // Radius
            }
        },
        code21: {
            desc:  'CONNECTING EDGE',
            text:  'CONNEDGE',
            parm:  null,
            init:  null,
            types: null,
            //func() {}
        },
        // Version 2 stops here.
        code22: {
            desc:  'HYPERBOLIC AR',
            text:  'HYPERBARC',
            parm:  '3P,4VDC',
            init:  null,
            types: null,
            func() {
                read._Value('_Point'); // First Point
                read._Value('_Point'); // Second Point
                read._Value('_Point'); // Third Point
                read._Value('_Point'); // Start Vector
                read._Value('_Point'); // End Vector
            }
        },
        code23: {
            desc:  'PARABOLIC ARC',
            text:  'PARABARC',
            parm:  '3P',
            init:  null,
            types: null,
            func() {
                read._Value('_Point'); // First Point
                read._Value('_Point'); // Second Point
                read._Value('_Point'); // Third Point
            }
        },
        code24: {
            desc:  'NON-UNIFORM B-SPLINE',
            text:  'NUB',
            parm:  '2I,nP,(n+m)R,2R',
            init:  null,
            types: null,
            func() { read._NUB(); }
        },
        code25: {
            desc:  'NON-UNIFORM RATIONAL B-SPLINE',
            text:  'NURB',
            parm:  '2I,nP,(n+m)R,2R,nR',
            init:  null,
            types: null,
            func() { read._NURB(); }
        },
        code26: {
            desc:  'POLYBEZIER',
            text:  'POLYBEZIER',
            parm:  'IX,4nP or (3n+1)P',
            init:  null,
            types: {    // Not used
                1: "Discontinuous",
                2: "Continuous"
            },
            func() {
                read._Value('_Index');          // Continuity
                read._Values('_Point');         // Points
            }
        },
        code27: {
            desc:  'POLYSYMBOL',
            text:  'SYMBOL',
            parm:  'IX,nP',
            init:  null,
            types: null,
            func() {
                read._Value('_Index', '(value >= 0)'); // Index
                read._Values('_Point');                // Points
            }
        },
        code28: {
            desc:  'BITONAL TILE',
            text:  'BITONALTILE',
            parm:  'IX,I,2CO,SDR,BS',
            init:  null,
            types: {    // Not used
                0: "null background",           // bit stream is null (WebCGM: deprecated)
                1: "null foreground",           // bit stream is null (WebCGM: deprecated)
                2: "T6",                        // 1-bit colour precision (WebCGM: deprecated)
                3: "1-dimensional",             // 1-bit colour precision
                4: "T4 2-dimensional",          // 1-bit colour precision
                5: "Bitmap (uncompressed)",     // (webcgm)
                6: "run length",                // (webcgm)
                // Note: >6: reserved for registered values
                // 7: "JPEG",                   // (tile)
                // 9: "PNG",                    // (tile)
            },
            func() {
                // Only two colours are used to define the image (1 bit precision). 
                // Each cell is associated with one of the colour indexes 0 or 1, 
                // and the colour values associated with 0 and 1 are defined locally by each BITONAL TILE element.
                read._Value('_Index');                   // Compression');
                read._Value('_Integer', '(value >= 0)'); // Padding');
                read._Value('_Colour');                  // Background Colour');
                read._Value('_Colour');                  // Foreground colour');
                read._SDR();                             // Only for compression 6
                read._BitStream();                       // Null when compression 0,1
            }
        },
        code29: {
            desc:  'TILE',
            text:  'TILE',
            parm:  'IX,I,I,SDR,BS',
            init:  null,
            types: {    // Not used
                0: "null background",           // bit stream is null (WebCGM: deprecated)
                1: "null foreground",           // bit stream is null (WebCGM: deprecated)
                2: "T6",                        // 1-bit colour precision (WebCGM: deprecated)
                3: "1-dimensional",             // 1-bit colour precision
                4: "T4 2-dimensional",          // 1-bit colour precision
                5: "Bitmap (uncompressed)",     // (webcgm)
                6: "run length",                // (webcgm)
                // Note: >6: reserved for registered values
                7: "JPEG",                      // (tile)
                9: "PNG",                       // (tile)
            },
            func() {
                // The colours associated with the cells may either be bitonal or full colour,
                // may be specified by either indexed or direct mode, 
                // and are specified according to the applicable colour precisions and modes.
                read._Value('_Index');                   // Compression');
                read._Value('_Integer', '(value >= 0)'); // Padding');
                read._Value('_Integer', '(value >= 0)'); // Cell Colour Precision');
                read._SDR();                             // Only for compression 6
                read._BitStream();                       // Null when compression 0,1
            }
        },
    },
    class5: {
        title: 'Attribute elements',
        init:  true,
        code1: {
            desc:  'LINE BUNDLE INDEX',
            text:  'LINEINDEX',
            parm:  'IX',
            init:  1,
            types: null,
            func() { read._Value('_Index'); }
        },
        code2: {
            desc:  'LINE TYPE',
            text:  'LINETYPE',
            parm:  'IX',
            init:  '"Solid"',
            types: {    // Not used
                1: "solid",
                2: "dash",
                3: "Dot",
                4: "Dash-dot",
                5: "Dash-dot-dot"
            },
            func() { read._Value('_Index'); }
        },
        code3: {
            desc:  'LINE WIDTH',
            text:  'LINEWIDTH',
            parm:  'SS',
            init:  1.0,
            types: null,
            func() { read._Value(read._getLineMode()); }
        },
        code4: {
            desc:  'LINE COLOUR',
            text:  'LINECOLR',
            parm:  'CO',
            init:  0,
            types: null,
            func() { read._Value('_Colour'); }
        },
        code5: {
            desc:  'MARKER BUNDLE INDEX',
            text:  'MARKERINDEX',
            parm:  'IX',
            init:  1,
            types: null,
            func() { read._Value('_Index'); }
        },
        code6: {
            desc:  'MARKER TYPE',
            text:  'MARKERTYPE',
            parm:  'IX',
            init:  '"Asterisk"',
            types: {    // Not used
                1: "Dot",
                2: "Plus",
                3: "Asterisk",
                4: "Circle",
                5: "Cross"
            },
            func() { read._Value('_Index'); }
        },
        code7: {
            desc:  'MARKER SIZE',
            text:  'MARKERSIZE',
            parm:  'SS',
            init:  1.0,
            types: null,
            func() { read._Value(read._getMarkerMode()); }
        },
        code8: {
            desc:  'MARKER COLOUR',
            text:  'MARKERCOLR',
            parm:  'CO',
            init:  0,
            types: null,
            func() { read._Value('_Colour'); }
        },
        code9: {
            desc:  'TEXT BUNDLE INDEX',
            text:  'TEXTINDEX',
            parm:  'IX',
            init:  1,
            types: null,
            func() { read._Value('_Index'); }
        },
        code10: {
            desc:  'TEXT FONT INDEX',
            text:  'TEXTFONTINDEX',
            parm:  'IX',
            init:  1,
            types: null,
            func() { read._Value('_Index'); }
        },
        code11: {
            desc:  'TEXT PRECISION',
            text:  'TEXTPREC',
            parm:  'E',
            init:  '"STRING"',
            types: {
                0: "STRING",
                1: "CHAR",
                2: "STROKE"
            },
            func() { read._Value('_Enum', 'types'); }
        },
        code12: {
            desc:  'CHARACTER EXPANSION FACTOR',
            text:  'CHAREXPAN',
            parm:  'R',
            init:  1.0,
            types: null,
            func() { read._Value('_Real'); }
        },
        code13: {
            desc:  'CHARACTER SPACING',
            text:  'CHARSPACE',
            parm:  'R',
            init:  0.0,
            types: null,
            func() { read._Value('_Real'); }
        },
        code14: {
            desc:  'TEXT COLOUR',
            text:  'TEXTCOLR',
            parm:  'CO',
            init:  0,
            types: null,
            func() { read._Value('_Colour'); }
        },
        code15: {
            desc:  'CHARACTER HEIGHT',
            text:  'CHARHEIGHT',
            parm:  'VDC',
            init:  32.767,
            types: null,
            func() { read._Value('_VDC'); }
        },
        code16: {
            desc:  'CHARACTER ORIENTATION',
            text:  'CHARORI',
            parm:  '4VDC',
            init:  '[0,1,1,0]',
            types: null,
            func() {
                read._Value('_Point'); // Up Component
                read._Value('_Point'); // Base Component
            }
        },
        code17: {
            desc:  'TEXT PATH',
            text:  'TEXTPATH',
            parm:  'E',
            init:  '"RIGHT"',
            types: {
                0: "RIGHT",
                1: "LEFT",
                2: "UP",
                3: "DOWN"
            },
            func() { read._Value('_Enum', 'types'); }
        },
        code18: {
            desc:  'TEXT ALIGNMENT',
            text:  'TEXTALIGN',
            parm:  '2E,R,R',
            init:  '[0,0,0,0]',
            types: {
                horizontalMode: {
                    0: "NORMHORIZ",
                    1: "LEFT",
                    2: "CTR",
                    3: "RIGHT",
                    4: "CONTHORIZ"
                },
                verticalMode: {
                    0: "NORMVERT",
                    1: "TOP",
                    2: "CAP",
                    3: "HALF",
                    4: "BASE",
                    5: "BOTTOM",
                    6: "CONTVERT"
                },
            },
            func() {
                read._Value('_Enum', 'types.horizontalMode'); // Horizontal Mode
                read._Value('_Enum', 'types.verticalMode');   // Vertical Mode
                read._Value('_Real');                         // Horizontal Alignment
                read._Value('_Real');                         // vertical Alignment
            }
        },
        code19: {
            desc:  'CHARACTER SET INDEX',
            text:  'CHARSETINDEX',
            parm:  'IX',
            init:  1,
            types: null,
            func() { read._Value('_Index'); }
        },
        code20: {
            desc:  'ALTERNATE CHARACTER SET INDEX',
            text:  'ALTCHARSETINDEX',
            parm:  'IX',
            init:  1,
            types: null,
            func() { read._Value('_Index'); }
        },
        code21: {
            desc:  'FILL BUNDLE INDEX',
            text:  'FILLINDEX',
            parm:  'IX',
            init:  0,
            types: null,
            func() { read._Value('_Index'); }
        },
        code22: {
            desc:  'INTERIOR STYLE',
            text:  'INTSTYLE',
            parm:  'E',
            init:  0,
            types: {
                0: "HOLLOW",
                1: "SOLID",
                2: "PAT",
                3: "HATCH",
                4: "EMPTY",
                5: "GEOPAT",
                6: "INTERP"
            },
            func() { read._Value('_Enum', 'types'); }
        },
        code23: {
            desc:  'FILL COLOUR',
            text:  'FILLCOLR',
            parm:  'CO',
            init:  0,
            types: null,
            func() { read._Value('_Colour'); }
        },
        code24: {
            desc:  'HATCH INDEX',
            text:  'HATCHINDEX',
            parm:  'IX',
            init:  1,
            types: {    // Not used
                1: "horizontal",
                2: "vertical",
                3: "positive slope",
                4: "negative slope",
                5: "horizontal/vertical crosshatch",
                6: "positive/negative slope crosshatch"
                // >6 reserved for registered values
            },
            func() { read._Value('_Index'); }
        },
        code25: {
            desc:  'PATTERN INDEX',
            text:  'PATINDEX',
            parm:  'IX',
            init:  1,
            types: null,
            func() { read._Value('_Index'); }
        },
        code26: {
            desc:  'EDGE BUNDLE INDEX',
            text:  'EDGEINDEX',
            parm:  'IX',
            init:  1,
            types: null,
            func() { read._Value('_Index'); }
        },
        code27: {
            desc:  'EDGE TYPE',
            text:  'EDGETYPE',
            parm:  '',
            init:  1,
            types: {    // Not used
                1: "solid",
                2: "dash",
                3: "Dot",
                4: "Dash-dot",
                5: "Dash-dot-dot"
            },
            func() { read._Value('_Index'); }
        },
        code28: {
            desc:  'EDGE WIDTH',
            text:  'EDGEWIDTH',
            parm:  'SS',
            init:  1.0,
            types: null,
            func() { read._Value(read._getEdgeMode()); }
        },
        code29: {
            desc:  'EDGE COLOUR',
            text:  'EDGECOLR',
            parm:  'CO',
            init:  0,
            types: null,
            func() { read._Value('_Colour'); }
        },
        code30: {
            desc:  'EDGE VISIBILITY',
            text:  'EDGEVIS',
            parm:  'E',
            init:  0,
            types: {
                0: "OFF",
                1: "ON"
            },
            func() { read._Value('_Enum', 'types'); }
        },
        code31: {
            desc:  'FILL REFERENCE POINT',
            text:  'FILLREFPT',
            parm:  'P',
            init:  '[0,0]',
            types: null,
            func() { read._Value('_Point'); }
        },
        code32: {
            desc:  'PATTERN TABLE',
            text:  'PATTABLE',
            parm:  'IX,3I,nx*nyCO',
            init:  null,
            types: null,
            func() {
                read._Value('_Index');                                         // Cell Index
                read._Value('_Integer', 'value > 0');                          // Count in Width Direction
                read._Value('_Integer', 'value > 0');                          // Count in Height Direction
                read._Value('_Integer', '[1,2,4,8,16,24,32].includes(value)'); // Colour Precision
                read._ColourList('colourList');
            }
        },
        code33: {
            desc:  'PATTERN SIZE',
            text:  'PATSIZE',
            parm:  '4SS',
            init:  '[0,1,1,0]',
            types: null,
            func() {
                valueType                 = read._getInteriorMode();
                read._Value(valueType); // Up X
                read._Value(valueType); // Up Y
                read._Value(valueType); // Base X
                read._Value(valueType); // Base Y
            }
        },
        code34: {
            desc:  'COLOUR TABLE',
            text:  'COLRTABLE',
            parm:  'CI,nCD',
            init:  null,
            types: null,
            func() {
                colourIndex = read._ColourIndex();
                read._ColourTable(colourIndex);
            }
        },
        code35: {
            desc:  'ASPECT SOURCE FLAGS',
            text:  'ASF',
            parm:  'n(E,E)',
            init:  '[]',
            types: {
                type: {
                    0: "Line type ASF",
                    1: "Line width ASF",
                    2: "Line colour ASF",
                    3: "Marker type ASF",
                    4: "Marker size ASF",
                    5: "Marker colour ASF",
                    6: "Text font index ASF",
                    7: "Text precision ASF",
                    8: "Character expansion factor ASF",
                    9: "Character spacing ASF",
                    10: "Text colour ASF",
                    11: "Interior style ASF",
                    12: "Fill colour ASF",
                    13: "Hatch index ASF",
                    14: "Pattern index ASF",
                    15: "Edge type ASF",
                    16: "Edge width ASF",
                    17: "Edge colour ASF"
                },
                indicator:  {
                    0: "INDIV",
                    1: "BUNDLED"
                },
            },
            func() { read._AspectSourceFlags(); }
        },
        // Version 1 stops here.
        code36: {
            desc:  'PICK IDENTIFIER',
            text:  'PICKID',
            parm:  'N',
            init:  0,
            types: null,
            func() { read._Value('_Name'); }
        },
        // Version 2 stops here.
        code37: {
            desc:  'LINE CAP',
            text:  'LINECAP',
            parm:  'IX,IX',
            init:  '[2,2]',
            types: {    // Not used
                capIndicator: {
                    1: "unspecified",
                    2: "butt",
                    3: "round",
                    4: "projecting square",
                    5: "triangle"
                    //>5: reserved for registered values
                },
                dashIndicator: {
                    1: "unspecified",
                    2: "butt",
                    3: "match"
                    // >3: reserved for registered values
                },
            },
            func() {
                read._Value('_Index'); // Cap Indicator
                read._Value('_Index'); // Dash Indicator
            }
        },
        code38: {
            desc:  'LINE JOIN',
            text:  'LINEJOIN',
            parm:  'IX',
            init:  1,
            types: {
                1: "unspecified",
                2: "mitre",
                3: "round",
                4: "bevel"
                // >4: reserved for registered values
            },
            func() { read._Value('_Index', 'types'); }
        },
        code39: {
            desc:  'LINE TYPE CONTINUATION',
            text:  'LINETYPECONT',
            parm:  'IX',
            init:  1,
            types: {    // Not used
                1: "unspecified",
                2: "continue",
                3: "restart",
                4: "adaptive continue"
                // >4: reserved for registered values
            },
            func() { read._Value('_Index'); }
        },
        code40: {
            desc:  'LINE TYPE INITIAL OFFSET',
            text:  'LINETYPEINITOFFSET',
            parm:  'R',
            init:  0.0,
            types: null,
            func() { read._Value('_Real'); }
        },
        code41: {
            desc:  'TEXT SCORE TYPE',
            text:  'TEXTSCORETYPE',
            parm:  'n(IX,E)',
            init:  1,
            types: {    // Not used
                1: "right score",
                2: "left score",
                3: "through score",
                4: "kendot"
                // >4: reserved for registered values
            },
            func() { read._TextScoreType(); }
        },
        code42: {
            desc:  'RESTRICTED TEXT TYPE',
            text:  'RESTRTEXTTYPE',
            parm:  'IX',
            init:  1,
            types: {    // Not used
                1: "basic",
                2: "boxed-cap",
                3: "boxed-all",
                4: "isotropic-cap",
                5: "isotropic-all",
                6: "justified"
                // >6: reserved for registered values
            },
            func() { read._Value('_Index'); }
        },
        code43: {
            desc:  'INTERPOLATED INTERIOR',
            text:  'INTERPINT',
            parm:  'IX,2nSS,I,mR,kCO',
            init:  1,
            types: {    // Not used
                1: "parallel",
                2: "elliptical",
                3: "triangular"
                // >3:reserved for registered values
            },
            func() { read._InterpolatedInterior(); }
        },
        code44: {
            desc:  'EDGE CAP',
            text:  'EDGECAP',
            parm:  'IX,IX',
            init:  '[2,2]',
            types: {    // Not used
                capIndicator: {
                    1: "unspecified",
                    2: "butt",
                    3: "round",
                    4: "projecting square",
                    5: "triangle"
                    //>5: reserved for registered values
                },
                dashIndicator: {
                    1: "unspecified",
                    2: "butt",
                    3: "match"
                    // >3: reserved for registered values
                },
            },
            func() {
                read._Value('_Index'); // Cap Indicator
                read._Value('_Index'); // Dash Indicator
            }
        },
        code45: {
            desc:  'EDGE JOIN',
            text:  'EDGEJOIN',
            parm:  'IX',
            init:  1,
            types: {    // Not used
                1: "unspecified",
                2: "mitre",
                3: "round",
                4: "bevel"
                // >4: reserved for registered values
            },
            func() { read._Value('_Index'); }
        },
        code46: {
            desc:  'EDGE TYPE CONTINUATION',
            text:  'EDGETYPECONT',
            parm:  'IX',
            init:  1,
            types: {    // Not used
                1: "unspecified",
                2: "continue",
                3: "restart",
                4: "adaptive continue"
                // >4: reserved for registered values
            },
            func() { read._Value('_Index'); }
        },
        code47: {
            desc:  'EDGE TYPE INITIAL OFFSET',
            text:  'EDGETYPEINITOFFSET',
            parm:  'R',
            init:  0.0,
            types: null,
            func() { read._Value('_Real', '(value >= 0.0)'); }
        },
        code48: {
            desc:  'SYMBOL LIBRARY INDEX',
            text:  'SYMBOLLIBINDEX',
            parm:  'IX',
            init:  0,
            types: null,
            func() { read._Value('_Index', '(value >= 0)');  }
        },
        code49: {
            desc:  'SYMBOL COLOUR',
            text:  'SYMBOLCOLR',
            parm:  'CO',
            init:  0,
            types: null,
            func() { read._Value('_Colour'); }
        },
        code50: {
            desc:  'SYMBOL SIZE',
            text:  'SYMBOLSIZE',
            parm:  'E,2VDC',
            init:  '[2,1,1]',
            types: {
                0: "HEIGHT",
                1: "WIDTH",
                2: "BOTH"            
            },
            func() {
                read._Value('_Enum', 'types');        // Scale Indicator
                read._Value('_VDC', '(value > 0.0)'); // Height
                read._Value('_VDC', '(value > 0.0)'); // Width
            }
        },
        code51: {
            desc:  'SYMBOL ORIENTATION',
            text:  'SYMBOLORI',
            parm:  '4VDC',
            init:  '[0,1,1,0]',
            types: null,
            func() {
                read._Value('_VDC'); // Up X
                read._Value('_VDC'); // Up Y
                read._Value('_VDC'); // Base X
                read._Value('_VDC'); // Base Y
            }
        },
        // Version 3 stops here.
    },
    class6: {
        title: 'Escape element',
        init: null,
        code1: {
            desc:  'ESCAPE',
            text:  'ESCAPE',
            parm:  'I,D',
            init:  null,
            types: null,
            func() {
                read._Value('_Integer'); // Identifier
                read._Data();
            }
        },
    },
    class7: {
        title: 'External elements',
        init:  null,
        code1: {
            desc:  'MESSAGE',
            text:  'MESSAGE',
            parm:  'E,SF',
            init:  null,
            types: {
                0: "NOACTION",
                1: "ACTION"            
            },
            func() {
                read._Value('_Enum', 'types'); // Action
                read._Value('_String');        // Text
            }
        },
        code2: {
            desc:  'APPLICATION DATA',
            text:  'APPLDATA',
            parm:  'I,D',
            init:  null,
            types: null,
            func() {
                read._Value('_Integer'); // Identifier
                read._Data();
            }
        },
    },
    class8: {
        title: 'Segment Control and Segment Attribute elements',
        init:  null,
        // Version 1 does not use class 8.
        code1: {
            desc:  'COPY SEGMENT',
            text:  'COPYSEG',
            parm:  'N,4R,2VDC,E',
            init:  null,
            types: {
                0: "NO",
                1: "YES"            
            },
            func() {
                read._Value('_Name');          // Identifier
                read._Value('_Real');          // X Scale
                read._Value('_Real');          // X Rotation'
                read._Value('_Real');          // Y Rotation
                read._Value('_Real');          // Y Scale
                read._Value('_VDC');           // X Translation
                read._Value('_VDC');           // Y Translation
                read._Value('_Enum', 'types'); // Segment Application
            }
        },
        code2: {
            desc:  'INHERITANCE FILTER',
            text:  'INHFILTER',
            parm:  'nE,E',
            init:  null,
            types: {
                0: "STLIST",
                1: "SEG"
             },
            func() {
                read._Values('_Enum', 'types'); // Setting
            }
        },
        code3: {
            desc:  'CLIP INHERITANCE',
            text:  'CLIPINH',
            parm:  'E',
            init:  null,
            types: {
                0: "STLIST",
                1: "INTERSECTION"
            },
            func() { read._Value('_Enum', 'types'); }
        },
        code4: {
            desc:  'SEGMENT TRANSFORMATION',
            text:  'SEGMENTTRAN',
            parm:  'N,4R,2VDC',
            init:  null,
            types: null,
            func() {
                read._Value('_Name'); // Identifier
                read._Value('_Real'); // X Scale
                read._Value('_Real'); // X Rotation
                read._Value('_Real'); // Y Rotation
                read._Value('_Real'); // Y Scale
                read._Value('_VDC');  // X Translation
                read._Value('_VDC');  // Y Translation
            }
        },
        code5: {
            desc:  'SEGMENT HIGHLIGHTING',
            text:  'SEGHIGHL',
            parm:  'N,E',
            init:  null,
            types: {
                0: "NORMAL",
                1: "HIGHL"            
            },
            func() {
                read._Value('_Name');          // Identifier
                read._Value('_Enum', 'types'); // State
            }
        },
        code6: {
            desc:  'SEGMENT DISPLAY PRIORITY',
            text:  'SEGDISPPRI',
            parm:  'N,I',
            init:  null,
            types: null,
            func() {
                read._Value('_Name');    // Identifier
                read._Value('_Integer'); // State
            }
        },
        code7: {
            desc:  'SEGMENT PICK PRIORITY',
            text:  'SEGPICKPRI',
            parm:  'N,I',
            init:  null,
            types: null,
            func() {
                read._Value('_Name');    // Identifier
                read._Value('_Integer'); // State
            }
        },
    },
    class9: {
        title: 'Application Structure Descriptor elements',
        init:  null,
        // Version 1, 2 and 3 do not use this class.
        code1: {
            desc:  'APPLICATION STRUCTURE ATTRIBUTE',
            text:  'APSATTR',
            parm:  'SF,SDR',
            init:  null,
            types: null,
            func() {
                read._Value('_String'); // String
                read._SDR();
            }
        },
    },
};

/* -\\- */
