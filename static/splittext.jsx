(function () {
    // Check if a text layer is selected
    if (!(app.project && app.project.activeItem && app.project.activeItem instanceof CompItem)) {
      alert("Please select a composition.");
      return;
    }
  
    var comp = app.project.activeItem;
    var selectedLayers = comp.selectedLayers;
  
    // Check if a text layer is selected
    if (selectedLayers.length === 0 || !(selectedLayers[0] instanceof TextLayer)) {
      alert("Please select a text layer.");
      return;
    }
  
    // Function to split text into words
    function splitTextIntoWords() {
      var selectedTextLayer = selectedLayers[0];
  
      // Get the text layer's source text property
      var textProp = selectedTextLayer.property("Source Text");
      var textDocument = textProp.value;
  
      // Split the text into words
      var words = textDocument.text.split(" ");
  
      // Create a new text layer for each word
      var position = selectedTextLayer.property("Position").value;
      var textProperties = selectedTextLayer.property("Text Properties").value;
      var textAnimator = selectedTextLayer.property("ADBE Text Animators").property(1);
      var delay = 0;
  
      for (var i = 0; i < words.length; i++) {
        var word = words[i];
  
        // Create a new text layer
        var newLayer = comp.layers.addText(word);
        newLayer.position.setValue(position);
  
        // Copy text properties and animator from the original text layer
        newLayer.property("Text Properties").setValue(textProperties);
        newLayer.property("ADBE Text Animators").addProperty(textAnimator.property("ADBE Text Animator"));
  
        // Set the delay for each word animation
        var animators = newLayer.property("ADBE Text Animators");
        for (var j = 1; j <= animators.numProperties; j++) {
          animators.property(j).property("ADBE Text Animator Properties").property("ADBE Text Animator Selector").property(1).property("ADBE Text Selector Start").setValue(delay);
          animators.property(j).property("ADBE Text Animator Properties").property("ADBE Text Animator Selector").property(1).property("ADBE Text Selector End").setValue(delay + word.length);
        }
  
        delay += word.length + 1;
      }
  
      // Remove the original text layer
      selectedTextLayer.remove();
    }
  
    // Create a new button with the "Split Text" functionality
    var scriptPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Split Text", undefined, { resizeable: true });
    var splitButton = scriptPanel.add("button", undefined, "Split Text");
    splitButton.onClick = splitTextIntoWords;
  
    // Resize the panel to fit the button
    scriptPanel.layout.layout(true);
    scriptPanel.layout.resize();
    scriptPanel.center();
  
    // Show the panel
    scriptPanel.show();
  })();
  