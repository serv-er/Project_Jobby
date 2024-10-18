import React from 'react'

const TopNiches = () => {
    const services=[
        {
        id:1,
        services:"Software Development",
        description:"Innovative software development services to build, maintain, and upgrade application, ensuring they meet the highest quality",
        },
        {
            id:2,
            services:"Web Development",
            description:"Comprehensive web development solutions from front-end design to back-end integration, delivering responsive and user-friendly website",
        },
        {
            id:3,
            services:"Data Science",
            description:"Advanced data science services to analyze and interpret complex data, providing actionable insights and data-driven solutions.",
        },
        {
            id:4,
            services:"Cloud Computing",
            description:"Reliable data science services to analyze and interpret complex data, providing actionable insights and data-driven solutions."
        },
        {
            id:5,
            services:"Mobile App Development",
            description:"Expert mobile app development for iOS and Android platforms, creating intuitive and engaging mobile experiences for uour users.",
        },
        {
            id:6,
            services:"DevOps",
            description:"DevOps services to streamline software development and operations, enhancing deployment efficiency and reducing time to market."
        }
    ]
  return (
    <section className="services">
<h3>
    Top Niches
</h3>
<div className="grid">
{
        services.map(item=>{
            return (
        <div className="card" key={item.id}>
          <h4>{item.services}</h4>
          <p>{item.description}</p>
        </div> 
            )
        })
    }
</div>
    </section>
  )
}

export default TopNiches