import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Project from "../components/Project";
import { mediaQueries } from "../components/utils/mediaQueries";

const ProjectsStyled = styled.div`
  padding: 0 10rem 40rem 10rem;
  ${mediaQueries("sm")`
    padding: 0 5rem 35rem 5rem;
  `}
  h2 {
    color: white;
    text-align: center;
    font-size: 3rem;
    padding-bottom: 4rem;
  }
  .projectsContainer {
    display: grid;
    grid-template: 1fr / repeat(3, 25vw);
    justify-content: center;
    gap: 5.4rem 1.8rem;

    ${mediaQueries("md")`
    display: flex;
    flex-direction: column; 
    gap: 4.8rem 0;
  `}
  }
`;

const Projects = () => {
  const { allFile: items } = useStaticQuery(graphql`
    query {
      allFile(
        filter: { sourceInstanceName: { eq: "data" }, extension: { eq: "md" } }
        sort: { order: DESC, fields: birthtime }
      ) {
        edges {
          node {
            id
            childMarkdownRemark {
              frontmatter {
                title
                type
                text
                usedTools
                link
                source
                image {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                imageSecond {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              html
            }
          }
        }
      }
    }
  `);
  return (
    <ProjectsStyled>
      <h2 id='projects'>Projects</h2>
      <div className='projectsContainer'>
        {items.edges.map(item => (
          <Project
            key={item.node.id}
            portfolio={item.node.childMarkdownRemark}
          />
        ))}
      </div>
    </ProjectsStyled>
  );
};

export default Projects;
