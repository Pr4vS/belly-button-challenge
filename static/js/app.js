const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Use d3 to pull in the data and console log it
d3.json(url).then(function(data) {
   console.log(data);
});

// Create function to initalize dashboard HINT:init()
 function init() {
// Create reference point to the #selDataset id from the index.html file
    let dropdownMenu = d3.select("#selDataset");

// Use d3 to pull in the data and populate the drop-down menu
  d3.json(url).then((data) => {
  console.log(`Data: ${data}`);

// Create a reference point to data.names key
  let names = data.names;

// Create a for loop for the length of reference point
  names.forEach((name) => {
            
// Use append method to create a new "option" element for each sample name
// Use text method with reference point for "option" data.names key
// Use property method with "value", reference point for data.names key as parameters
dropdownMenu.append("option")
.text(name)
.property("value",name);
});

// Create reference point called firstSample to pull in index 0 for data.names key
let firstSample = names[0];

// Use buildCharts function with firstSample as parameter
buildMetadata(firstSample);
barChart(firstSample);
bubbleChart(firstSample);
    
});
};

// Build a function called buildMetadata that takes in a parameter called sample
function buildMetadata(sampleId) {

// Use d3 to pull in the data and retrieve
d3.json(url).then((data) => {
  console.log(`Data: ${data}`);

// Get all metadata
let metadata = data.metadata;

// Create a reference point to an array that takes in the id key equal to the sample parameter
let value = metadata.filter(meta => meta.id == sampleId);

// Create a new reference point indexing the 0 position of the previous reference point
let firstSampleID = value[0];

// Use d3 to select the panel with id of `#sample-metadata`
d3.select("#sample-metadata").html("")

// Use Object.entries function to add new key-value pairs to the Demographic panel
Object.entries(firstSampleID).forEach(([key,value]) => {
  d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
  });
});

};

// Build a function called barChart that takes in a parameter called sample 

function barChart(sampleId) {

// Use d3 to pull in the data
d3.json(url).then((data) => {
console.log(`Data: ${data}`);

// Create reference points for samples key
let sampleInfo = data.samples;

// Create a reference point to an array that takes in the id key equal to the sample parameter
let value = sampleInfo.filter(result => result.id == sampleId);

// Create a new reference point indexing the 0 position of the previous reference point
let firstSampleID = value[0];

// Create a reference point for these keys: otu_ids, otu_labels, sample_values
let trace1 = [{

// Slice 10 OTUs found
x:  firstSampleID.sample_values.slice(0,10).reverse(),
y: firstSampleID.otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse(),
text: firstSampleID.otu_labels.slice(0,10).reverse(),
type: "bar",
orientation: "h"
}];

// Setup the layout
let layout = {
title: "Top 10 OTUs Found",
xaxis: { title: "Sample Values" },
yaxis: { title: "OTU IDs" }
};
        
// Use Plotly.newPlot and fill in parameters with defined objects above
Plotly.newPlot("bar", trace1, layout)
});

}

//Build a bubble Chart
function bubbleChart(sampleId) {

// Use d3 to pull in the data
d3.json(url).then((data) => {
  console.log(`Data: ${data}`);

// Create reference points for samples key
let samples = data.samples;

// Create a reference point to an array that takes in the id key equal to the sample parameter
let value = samples.filter(sample => sample.id == sampleId);

// Create a new reference point indexing the 0 position of the previous reference point
let firstSampleID = value[0]; 

// Create a reference point for these keys: otu_ids, otu_labels, sample_values
let trace2 = [{

// Slice 10 OTUs found
x: firstSampleID.otu_ids,
y: firstSampleID.sample_values,
text: firstSampleID.otu_labels,
mode: "markers",
marker: {
size: firstSampleID.sample_values,
color: firstSampleID.otu_ids,
colorscale: "Picnic"
}
}];
        

// Create reference point called layout and define: title"Name Chart", margin: { t: 30, l: 150 }
let layout = {
title: "Bacteria Per Sample",
hovermode: "closest",
xaxis: {title: "OTU ID"},
yaxis: { title: "Sample Values" }
};

// Use Plotly.newPlot and fill in parameters with defined objects above
Plotly.newPlot("bubble", trace2, layout);
});
}

// Function that changes dashboard when sample change
function optionChanged(newSample) {
buildMetadata(newSample);
barChart(newSample);
bubbleChart(newSample);
}

init();













    
    
