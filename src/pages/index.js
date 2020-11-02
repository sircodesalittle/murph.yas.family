import { graphql } from "gatsby"
import { withPrefix } from 'gatsby';
import React from "react"
import "./styles.css"
import Layout from "../components/layout"
import MurphChart from "../components/MurphChart"


class IndexComponent extends React.Component {
  render() {
    const murphs = this.props.data.allMurphs.nodes
    // Sort these bad boys
    murphs.sort(function(a,b){
      return new Date(Date.parse(b.parent.name + "T16:11:20.019Z")) - new Date(Date.parse(a.parent.name + "T16:11:20.019Z"));
    })
    console.log(murphs)
    var murphTables = []

    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


    murphs.forEach(murph => {
      murphTables.push((
        <div className="card">
        
          <div class="card-container">
              <div class="card-image" style={{backgroundImage: `url(${withPrefix('/img/' + murph.parent.name + '.jpg')})`, backgroundPosition: '50% 0'}}></div>

              <div class="title-container">
                  <p class="title">{monthNames[new Date(Date.parse(murph.parent.name + "T16:11:20.019Z")).getMonth()]}</p>
                  <span class="subtitle">{new Date(Date.parse(murph.parent.name + "T16:11:20.019Z")).toDateString()}</span>
              </div>
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
            <h1 class="headline-1 rainbow rainbow_text_animated">Next YAS Murph - 7:30 AM November 14 @ Alex's</h1>
            
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
  allMurphs(sort: {fields: id}) {
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