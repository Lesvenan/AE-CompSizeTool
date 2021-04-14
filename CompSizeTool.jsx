
var scriptName = "Duplicate And Scale";

{
function myScript(thisObj){
	function myScript_buildUI(thisObj){
		
	
	// PALETTE
	// =======

		var palette = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Dockable Script", undefined, {resizeable:true, closeButton: true});
			palette.text = "Format"; 
			palette.orientation = "row"; 
			palette.alignChildren = ["center","top"]; 



			
		// PANEL HORIZONTAL FORMATS
		// =========================


		var panelHoriz = palette.add("panel", undefined, undefined, {name: "panelHoriz"}); 
			panelHoriz.text = "Horizontal"; 
			panelHoriz.orientation = "column"; 
			panelHoriz.alignChildren = ["center","top"]; 


		var h_1920x1080 = panelHoriz.add ("button", undefined, "1920x1080");

		var h_1200x627 = panelHoriz.add ("button", undefined, "1200x627");

		var h_1024x768 = panelHoriz.add ("button", undefined, "1024x768");

		var h_640x480 = panelHoriz.add ("button", undefined, "640x480");

		var h_600x400 = panelHoriz.add ("button", undefined, "600x400");

		var h_480x320 = panelHoriz.add ("button", undefined, "480x320");

		var h_320x250 = panelHoriz.add ("button", undefined, "320x250");

		var h_320x240 = panelHoriz.add ("button", undefined, "320x240");


		var panelRight = palette.add("group", undefined, undefined, {name: "panelRight"}); 
		panelRight.orientation = "column"; 
		panelRight.alignChildren = ["center","center"]; 


		// PANEL VERTICAL FORMATS
		// =========================


		var panelVerti = panelRight.add("panel", undefined, undefined, {name: "panelVerti"}); 
			panelVerti.text = "Vertical"; 
			panelVerti.orientation = "column"; 
			panelVerti.alignChildren = ["center","center"]; 


		var v_1080x1920 = panelVerti.add ("button", undefined, "1080x1920");

		var v_320x480 = panelVerti.add ("button", undefined, "320x480");

		var v_768x1024 = panelVerti.add ("button", undefined, "768x1024");


		// PANEL SQUARE FORMATS
		// =====================


		var panelSquare = panelRight.add("panel", undefined, undefined, {name: "panel3"}); 
			panelSquare.text = "Square"; 
			panelSquare.orientation = "column"; 
			panelSquare.alignChildren = ["left","top"]; 

			
		var s_1080x1080 = panelSquare.add ("button", undefined, "1080x1080");


		// PANEL Custom FORMATS
		// =====================


		var panelCustom = panelRight.add("panel", undefined, undefined, {name: "panel3"}); 
			panelCustom.text = "Custom"; 
			panelCustom.orientation = "column"; 
			panelCustom.alignChildren = ["left","top"]; 

		var editWidth = panelCustom.add('edittext {properties: {name: "edittext11"}}'); 
			editWidth.text = "width"; 
			editWidth.preferredSize.width = 90;
		var CusWidth;
			editWidth.onChanging = function () {CusWidth = Number (editWidth.text)}

		

		var editHeigh = panelCustom.add('edittext {properties: {name: "edittext12"}}'); 
			editHeigh.text = "height"; 
			editHeigh.preferredSize.width = 90; 
		var CusHeigh;
			editHeigh.onChanging = function () {CusHeigh = Number (editHeigh.text)}



		var CreateCustom = panelCustom.add ("button", undefined, "Create");

		palette.layout.layout(true);

///// What's happen after a click ///
		
h_1920x1080.onClick = function(){	
	ScaleComposition (1920,1080)
	}

h_320x240.onClick = function(){	
	ScaleComposition (320,240)
	}

h_320x250.onClick = function(){	
	ScaleComposition (320,250)
	}
			
h_480x320.onClick = function(){	
	ScaleComposition (480,320)
    }
    
h_600x400.onClick = function(){	
	ScaleComposition (600,400)
	}

h_640x480.onClick = function(){	
	ScaleComposition (640,480)
	}

h_1024x768.onClick = function(){	
	ScaleComposition (1024,768)
	}

h_1200x627.onClick = function(){	
	ScaleComposition (1200,627)
	}


v_1080x1920.onClick = function(){
	ScaleComposition (1080,1920)
	}

v_320x480.onClick = function(){
	ScaleComposition (320,480)
	}
 
 v_768x1024.onClick = function(){
	ScaleComposition (768,1024)
	}
 

 s_1080x1080.onClick = function(){
    ScaleComposition (1080,1080)
	}
	
CreateCustom.onClick = function(){
	ScaleComposition (CusWidth,CusHeigh)
	}

    

//============== FUNCTIONS ==========================

function makeParentLayerOfAllUnparented(theComp, newParent)
{
	for (var i = 1; i <= theComp.numLayers; i++) {
		var curLayer = theComp.layer(i);
		var wasLocked = curLayer.locked;
		curLayer.locked = false;
		if (curLayer != newParent && curLayer.parent == null) {
			curLayer.parent = newParent;
		}
		curLayer.locked = wasLocked
	}
}

// Scales the zoom factor of every camera by the given scale_factor.
// Handles both single values and multiple keyframe values.
function scaleAllCameraZooms(theComp, scaleBy)
{
	for (var i = 1; i <= theComp.numLayers; i++) {
		var curLayer = theComp.layer(i);
		if (curLayer.matchName == "ADBE Camera Layer") {
			var curZoom = curLayer.zoom;
			if (curZoom.numKeys == 0) {
				curZoom.setValue(curZoom.value * scaleBy);
			} else {
				for (var j = 1; j <= curZoom.numKeys; j++) {
					curZoom.setValueAtKey(j,curZoom.keyValue(j)*scaleBy);
				}
			}
		}
	}
}

function ScaleComposition (compWidth,compHeigh)
{	

     var proj, selComps, l, comp;
     
   
     
     
     // Do the work
     app.beginUndoGroup(scriptName);
     
     // Determine the comps to process (active comp or selected in Project panel)
     if ((app.project.activeItem !== null) && (app.project.activeItem instanceof CompItem))
     {
         // Project panel isn't focused, so use last active Composition/Timeline panel
         selComps = [app.project.activeItem];
     }
     else
     {
         // Project panel is focused, so use the selection in it
         selComps = app.project.selection;
     }
     
     // Loop through all selected comps
     for (l=0; l<selComps.length; l++)
     {
         comp = selComps[l];
         if (!(comp instanceof CompItem))
             continue;

        
		var activeComp = comp.duplicate();
        activeComp.name =  comp.name +  "_" + String(compWidth) + "x" + String(compHeigh);
        
		var scale_factor_width = compWidth/activeComp.width;
		var scale_factor_height = compHeigh/activeComp.height;
		if (scale_factor_width<scale_factor_height) {
            var scale_factor = scale_factor_height
            } else {
             var scale_factor = scale_factor_width }
		
				
		// Create a null 3D layer.
		var null3DLayer = activeComp.layers.addNull();
		null3DLayer.threeDLayer = true;
		null3DLayer.name = "CTRL SCALE";
								
		// Set null3DLayer as parent of all layers that don't have parents.  
		for (var i = 1; i <= activeComp.numLayers; i++) {
			var curLayer = activeComp.layer(i);
			var wasLocked = curLayer.locked;
			if (curLayer != null3DLayer && curLayer.parent == null) {
				curLayer.parent = null3DLayer;
			}
		}				
		
		// Set new comp width and height.
		activeComp.width  = compWidth;
		activeComp.height = compHeigh;
				
		// Then for all cameras, scale the Zoom parameter proportionately.
		scaleAllCameraZooms(activeComp, scale_factor);
				
		// Set the scale of the super parent null3DLayer proportionately.
		var superParentScale = null3DLayer.scale.value;
		superParentScale[0] = superParentScale[0] * scale_factor;
		superParentScale[1] = superParentScale[1] * scale_factor;
		superParentScale[2] = superParentScale[2] * scale_factor;
		null3DLayer.scale.setValue(superParentScale);

		var null3DLayer_posX = compWidth/2;
		var null3DLayer_posY = compHeigh/2;
		null3DLayer.position.setValue([null3DLayer_posX,null3DLayer_posY,0]);
        
				

        }
        app.endUndoGroup();

	}

		return palette;
	}

	var myScriptPal = myScript_buildUI(thisObj);

		if (myScriptPal != null && myScriptPal instanceof Window){
		myScriptPal.center();
		myScriptPal.show();
		}

	}
myScript(this);
}






