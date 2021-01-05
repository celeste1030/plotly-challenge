// Build functions to populate Belly Button Diversity Dashboard

var dropDownItem = d3.select("#selDataset");

// Define a function that will create metadata for given sample

function buildMetadata(sample) {
    // Read the json data

    d3.json("samples.json").then(function (response) {
        console.log(response.metadata);

        // Parse and filter the data to get the sample's metadata

        var sampleMeta = response.metadata.filter(entry => entry.id == sample)[0];
        console.log(sampleMeta);
        var infoBox = d3.select("#sample-metadata");
        infoBox.html("");
        Object.entries(sampleMeta).forEach(([key, value]) => {

            // Specify the location of the metadata and update it

            infoBox.append("p")
                .text(`${key}: ${value}`);
        });
    });

}

// Define a function that will create charts for given sample
function buildCharts(sample) {
    console.log(sample);
    // Read the json data
    d3.json("samples.json").then(function (response) {
        // Parse and filter the data to get the sample's OTU data
        var samples = response.samples;
        var sampleEntry = samples.filter(subject => subject.id == sample)[0];

        // Create bar chart in correct location
        var data = [{
            type: 'bar',
            x: sampleEntry.sample_values.slice(0, 10).reverse(),
            y: sampleEntry.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
            text: sampleEntry.otu_labels.slice(0, 10).reverse(),
            orientation: 'h',
            marker: { color: 'rgb(158, 245, 66)' },
        }];

        var layout = {
            font: { color: "black", family: "Helvetica"},
            title: 'Belly Button Biodiversity Top 10 OTU',
            xaxis: { title: "Sample Value" },
            yaxis: {
                automargin: true,
                title: {
                    text: "OTU ID",
                    standoff: 20

                }
            },
            barmode: 'stack'
        };

        Plotly.newPlot('bar', data, layout);

        // Create bubble chart in correct location

        var trace = {
            x: sampleEntry.otu_ids,
            y: sampleEntry.sample_values,
            mode: 'markers',
            text: sampleEntry.otu_labels,
            marker: {
                color: sampleEntry.otu_ids,
                size: sampleEntry.sample_values,
                colorscale: 'Greens'
            }
        };

        var data2 = [trace];

        var layoutBubble = {
            font: { color: "black", family: "Helvetica" },
            xaxis: { title: "OTU ID" },
            yaxis: { title: "Sample Value" },
            title: 'Belly Button Biodiversity All Samples',
            showlegend: false,
        };

        Plotly.newPlot('bubble', data2, layoutBubble);

        // BONUS: Define function that will build a Gauge Chart

        var cleanData = response.metadata.filter(clean => clean.id == sample)[0];
        console.log(cleanData.wfreq);
        var traceG = {
            type: "indicator",
            mode: "gauge+number",
            value: cleanData.wfreq,
            title: "Belly Button Wash Frequency: Washes per Week",
            gauge: {
                axis: { range: [null, 9], tickwidth: 3, tickcolor: "black" },
                bar: { color: "white" },
                bgcolor: "white",
                borderwidth: .5,
                bordercolor: "black",
                steps: [
                    { range: [0, 1], color: "#009933" },
                    { range: [1, 2], color: "#00CC33" },
                    { range: [2, 3], color: "#00FF33" },
                    { range: [3, 4], color: "#00FFCC" },
                    { range: [4, 5], color: "#00CCCC" },
                    { range: [5, 6], color: "#0099CC" },
                    { range: [6, 7], color: "#0066FF" },
                    { range: [7, 8], color: "#0033FF" },
                    { range: [8, 9], color: "#6600FF" },
                ],
            }
        };
        var data3 = [traceG];

        var layoutG = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            paper_bgcolor: "#D0F0C0",
            font: { color: "black", family: "Helvetica"}
        };

        Plotly.newPlot('gauge', data3, layoutG);


    });
}



// Define function that will run on page load
function init() {

    // Read json data
    d3.json("samples.json").then(function (response) {

        response.names.forEach(name => {
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

