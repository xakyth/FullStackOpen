const Header = (courseInfo) => {
  return (
      <h1>{courseInfo.courseTitle}</h1>
  )
}

const Content = (courseInfo) => {
  return (
    <div>
      <Part name={courseInfo.part1} exercisesNum={courseInfo.exercises1} />
      <Part name={courseInfo.part2} exercisesNum={courseInfo.exercises2} />
      <Part name={courseInfo.part3} exercisesNum={courseInfo.exercises3} />
    </div>
  )
}

const Part = (part) => {
  return (
      <p>{part.name} {part.exercisesNum}</p>
  )
}

const Total = (courseInfo) => {
  return (
      <p>Number of exercises {courseInfo.num}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header courseTitle={course}/>
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3} />
      <Content partName={part1} exercisesNum={exercises1} />
      <Content partName={part2} exercisesNum={exercises2} />
      <Content partName={part3} exercisesNum={exercises3} />
      <Total num={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App