


  const apiUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
const marginValues = {
    top:10,
    bottom:50,
    left:40,
    right:30
} 
const timeFormat = d3.timeFormat("%M:%S")
const width = 800;
const height = 500;
const xScale = d3.scaleTime().range([marginValues.left  ,width-marginValues.right])
const yScale = d3.scaleTime().range([height-marginValues.bottom,marginValues.top])
var color = d3.scaleOrdinal(d3.schemeSet2);
console.log(color(true))
d3.json(apiUrl).then(data=>{
 data.forEach(element => {
   element.Place = +element.Place
    const parsedTime = element.Time.split(':')
    element.Time = new Date(2022,0,0,0,parsedTime[0],parsedTime[1])
   
});
const yExtent = d3.extent(data,(d)=>d.Time);
console.log(yExtent)
const xMin = d3.min(data,(d)=>d.Year-1);
const xMax = d3.max(data,(d)=>d.Year+1)
console.log(yExtent[1])

xScale.domain([xMin,xMax])
yScale.domain(yExtent)
const yAxis = d3.axisLeft(yScale).tickFormat(timeFormat)
const xAxis = d3.axisBottom(xScale)
               .tickFormat(d3.format("d"))




const svg = d3.select('body')
.append('svg')
.attr('width',width)
.attr('height',height)
.style("background-color",'')
.style("margin",5+"rem")
.style("position", "relative")



const toolTip = d3.select("body")
  .append("div")
  .attr('id','tooltip')
  .attr("class", "tooltip")
  .style("position", "absolute")
  .style("background-color", "blue")
  .style("border", `1px`+` `+"solid"+` `+`black`)
  .style('border-radius',`5px`)
  .style("border-width", "1px")
  .style("padding", "5px")
  .style("opacity", 0)
  .style('color','white')

svg.selectAll("circles")
    .data(data)
    .enter()
    .append("circle")
    .attr('cx',(d)=>xScale(d.Year))
    .attr("cy",(d)=>height-(yScale(d.Time)+30))
    .attr("r",5)
    .attr("class","dot")
    .attr('data-xvalue',(d,i)=>d.Year)
    .attr('data-yvalue',(d,i)=>d.Time.toISOString())
    .style('fill',(d,i)=>d.Doping === ""?color(true):color(false))
    .on('mouseover',(event,d)=> {
      toolTip.style('opacity', .7)
          .style('left', (event.pageX + 10) + "px")
          .style('top', (event.pageY + 10) + "px");
      toolTip.html(`Name: ${d.Name} <br/> Nationality: ${d.Nationality} <br/> Year: ${d.Year} <br/> Time: ${timeFormat(d.Time) }<br/>${d.Doping===""?'':'<br/>'+'Doping: '+d.Doping} `)
      .attr('data-year', d.Year);
  })
  .on('mouseout', () => {
      toolTip.style('opacity', 0);
  });

//appending g
svg.append("g")
.attr("id",'x-axis')
.call(xAxis)
.attr("transform", "translate(" + '0' + "," + (height - 40) + ")")

svg.append("g")
.attr("id",'y-axis')
.call(yAxis)
.attr("transform","translate("+marginValues.left +","+ marginValues.top +")")  





//appending circles





const legend = svg.append("g")
.append('rect')
.attr('id','legend')
.attr('width','24px')
.attr('height','24px')
.attr('x',width/2+300)
.attr('y',height/2)
.style('fill',color(false))


legend.append('text')
.text('people who were Dopped positive are red')
.attr('y',height/2)
.attr('x',width/2+280)
.style('color','red')





})
