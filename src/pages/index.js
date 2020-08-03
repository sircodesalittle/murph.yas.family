import { graphql } from "gatsby"
import React from "react"
import "./styles.css"
var AsciiTable = require('ascii-table')

class IndexComponent extends React.Component {
  render() {
    const murphs = this.props.data.allMurphs.nodes
    var murphTables = []

    murphs.forEach(murph => {
      console.log(murph.parent.name)
      console.log(Date.parse(murph.parent.name).toString())
      var table = new AsciiTable(new Date(Date.parse(murph.parent.name + "T16:11:20.019Z")).toDateString())
      table.setHeading('Name', 'Time')
      murph.results.forEach(entry => {
        table.addRow(entry.name, entry.time)
      });
      murphTables.push(table)
    });
    
    return (
      <div>
          <h1 class="rainbow rainbow_text_animated">Next YAS Murph - 7:00 AM August 8 @ Alex's </h1>
          <div style={{textAlign: 'center'}}><a href="spotify:playlist:0UAPiXhYnNrndtZpEzPLjX">Spotify Playlist</a></div>
          <pre style={{textAlign: 'center'}}>Results:</pre>
          {murphTables.map((table, i) => (
            <pre style={{textAlign: 'center'}} key={i}>{table.toString()}</pre>
          ))}
      </div>
    )
  }
}

export default IndexComponent

export const IndexQuery = graphql`
query {
  allMurphs(sort: {fields: parent___id}) {
    nodes {
      results {
        name
        time
      }
      parent {
        ... on File {
          name
        }
      }
    }
  }
}
`