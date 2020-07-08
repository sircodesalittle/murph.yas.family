import { graphql } from "gatsby"
import React from "react"
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
          {murphTables.map((table, i) => (
            <pre key={i}>{table.toString()}</pre>
          ))}
      </div>
    )
  }
}

export default IndexComponent

export const IndexQuery = graphql`
query {
  allMurphs {
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