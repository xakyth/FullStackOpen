const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><b>total of {sum} exercises</b></p>

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
} 

const Content = ({ parts }) => {
    const res = parts.map(part => 
        <Part key={part.id} part={part} />
    )
    return (
        <div>
            {res}
        </div>
    )
}

const Course = (props) => {
    const { course } = props
    const total = course.parts.reduce((acc, cur) => {
        return acc + cur.exercises
    }, 0)
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total sum={total} />
        </div>
    )
}

export default Course
