import React, { Component } from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';


  String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    if (isNaN(seconds))
        return 'DNF'
    return hours+':'+minutes+':'+seconds;
}
function MurphChart(props) {
    const murphs = props.murphs

    let series = [];
    const colors = [
        "red",
        "blue",
        "green",
        "orange",
        "gold",
        "pink",
        "teal",
        "violet",
        "tomato"
    ]
    murphs.map((murph, murphIndex) => {
        murph.results.map((entry, entryIndex) => {
            if (!series.includes(entry.name))
                series.push(entry.name)
        })
    })

    let seriesNames = []
    series.map((series, seriesIndex) => {
        seriesNames.push(<Line type="monotone" dataKey={series} stroke={colors[seriesIndex]} />)
    })

    let murphData = []
    murphs.map((murph, murphIndex) => {
        let seriesData = {
            name: new Date(Date.parse(murph.parent.name + "T16:11:20.019Z")).toDateString(),
        };
        murph.results.map((entry, entryIndex) => {
            let time = entry.time.split(':')
            let seconds = (+time[0]) * 60 * 60 + (+time[1]) * 60 + (+time[2]); 
            if (time == entry.time.split(':'))
                seconds = null
            seriesData[entry.name] = seconds
        })
        murphData.push(seriesData)
    })
    console.log(murphData)
      

      return (
        <ResponsiveContainer width = '95%' height = {500} >
            <LineChart
            width={500}
            height={300}
            data={murphData.reverse()}
            
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter = {(time) => {return time.toString().toHHMMSS()}}/>
            <Tooltip formatter = {(time) => {return time.toString().toHHMMSS()}}/>
            <Legend />
            {seriesNames}
            </LineChart>
        </ResponsiveContainer>
      );
  }
 

  export default MurphChart