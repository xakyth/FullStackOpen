const Header = (props) => {
  console.log(props);
  return (
      <h1>{props.courseTitle}</h1>
  )
}

const Content = (props) => {
  console.log(props);
  return (
    <div>
      <Part name={props.part1.name} exercisesNum={props.part1.exercises} />
      <Part name={props.part2.name} exercisesNum={props.part2.exercises} />
      <Part name={props.part3.name} exercisesNum={props.part3.exercises} />
    </div>
  )
}

const Part = (props) => {
  return (
      <p>{props.name} {props.exercisesNum}</p>
  )
}

const Total = (props) => {
  return (
      <p>Number of exercises {props.num}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header courseTitle={course}/>
      <Content part1={part1} part2={part2} part3={part3} />
      <Total num={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App