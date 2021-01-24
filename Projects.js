import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
import '../project.css';
// import projects from './data';


export default function Projects() {



  const [projects, setProjects] = useState([
    {
      title: "",
      type: "",
      imageUrl: "",
      description: "",
      longDescription: "",
      userId: "",
      sanitizedHtml: "",
    },
  ]);
  



  useEffect(() => {
    fetch("http://localhost:8080/projects")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setProjects(jsonRes));
  },[]);


  const alltypes = [...new Set(projects.map((item) => item.type))];
  const [projecttype,setProjecttype]=useState("swarm");
  const [types, settypes] = useState(alltypes);
  

  const filterprojects = (type) => {
    setProjecttype(type);
    console.log(alltypes);
  };

   console.log(alltypes[0]);
    const Types = ({ types, filterprojects }) => {
      // console.log(types);
    return (
      <div className="btn-container">
        {alltypes.map((type,index) => {
          return (
            <button
              key={index}
              type="button"
              onClick={() => filterprojects(type)}
              className={projecttype === type ? "filter-btn active" : "filter-btn inactive"}
            >
              {type}
            </button>
          );
        })}
      </div>
    );
  };

  const Menu = ({ projects }) => {
  return (
    <div className="project-section-center">
      {projects.filter(project => project.type === projecttype).map((project) => {
        const {_id,title, imageUrl, description } = project;
        
        return (
          <article className="menu-project">
            <img src={imageUrl} alt={title} className="photo" />
            <div className="project-info">
              <header>
                <h4>{title}</h4>
              </header>
              <p className="project-text">{description}</p>
              <Link to={'/'+_id} id='ExtraBtn'><a href="#" className='Extra-btn' >Read more</a></Link>
            </div>
          </article>
        );
      })}
    </div>
  );
};

  return (
    <div className="proj-container">
      <div className="projects-title">
          <h2>Our Projects</h2>
          <div className="project-underline"></div>
        </div>
      <Types types={types} filterprojects={filterprojects} />
      <Menu projects={projects} />
    </div>
  )
}


