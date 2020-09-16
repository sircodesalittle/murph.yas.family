import { graphql } from "gatsby"
import React from "react"
import "./styles.css"
import Layout from "../components/layout"
import MurphChart from "../components/MurphChart"

class IndexComponent extends React.Component {
  render() {
    const murphs = this.props.data.allMurphs.nodes
    var murphTables = []

    murphs.forEach(murph => {
      murphTables.push((
        <div className="card">
          <div className="card-head">
            <p className="card-head-title">
              {new Date(Date.parse(murph.parent.name + "T16:11:20.019Z")).toDateString()}
            </p>
          </div>
        
          <div className="content">
            <table class="table">
              <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Time</th>
                </tr>
              </thead>
          
              <tbody>
                {murph.results.map((entry, entryIndex) => { return (<tr><th>{entryIndex+1}</th><td>{entry.name}</td><td>{entry.time}</td></tr>)})}
              </tbody>
            </table>
          </div>
        </div>));
    });
    
    return (
      <Layout>
          <section className="padtop">
            <space className="x-large"></space>
            <div className="content">
            <h1 class="headline-1 rainbow rainbow_text_animated">Next YAS Murph - 7:00 AM September 19 @ Alex's</h1>
            
            <MurphChart murphs={murphs}></MurphChart>
            <h2 style={{textAlign: 'center'}}>Results:</h2>
            {murphTables}
            </div>
          </section>
      </Layout>
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