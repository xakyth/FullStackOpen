const Footer = () => {
  return (
    <p>footer component says: hello</p>
  )
}

const Hello = (props) => {
  console.log(props);
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} yeard old</p>
    </div>
  )
}

const App = () => {
  
  const friends = [
    'Maya', 'Peter'
  ]

  return (
    <div>
      <p>{friends}</p>
    </div>
  )
}

export default App
