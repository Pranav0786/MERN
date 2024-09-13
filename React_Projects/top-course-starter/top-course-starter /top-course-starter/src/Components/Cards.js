import React from 'react'
import Card from './Card';

const Cards = ( {props} ) => {

    let courses = props.courses ;
    
    function getCourses () {
        let allcourses = [] ;
        Object.values(courses).forEach(array => {
            array.forEach(courseData => {
                allcourses.push(courseData) ;
            })
        })
        return allcourses ;
    }


    return (
        <div>
            {
                getCourses().map( (course) =>
                    <Card key={course.id} course = {course} /> 
                )
            }
        </div>
    )
}

export default Cards
