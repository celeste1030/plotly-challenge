/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */

var dropDownItem = d3.select("#selDataset");


// Define a function that will create metadata for given sample
function buildMetadata(sample) {

    d3.json("samples.json").then(function (response) {
        console.log(response.metadata);
        var sampleMeta = response.metadata.filter(entry => entry.id == sample)[0];
        console.log(sampleMeta)
    });

    // Read the json data

    // Parse and filter the data to get the sample's metadata

    // Specify the location of the metadata and update it

}

// Define a function that will create charts for given sample
function buildCharts(sample) {

    console.log(sample);

    // Read the json data

    // Parse and filter the data to get the sample's OTU data
    // Pay attention to what data is required for each chart

    // Create bar chart in correct location

    // Create bubble chart in correct location

}

// Define function that will run on page load
function init() {

    // Read json data
    d3.json("samples.json").then(function (response) {
        
        response.names.forEach( name => {
            var option = dropDownItem.append("option");
            option.text(name);
            option.property("value", name);

        });
        var dataset = dropDownItem.property("value");
        buildMetadata(dataset);
        buildCharts(dataset);


    });

}



function optionChanged(newSample) {

    buildMetadata(newSample);
    buildCharts(newSample);

    // Update metadata with newly selected sample

    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();

