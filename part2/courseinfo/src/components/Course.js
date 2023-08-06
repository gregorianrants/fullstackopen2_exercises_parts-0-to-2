const Header = ({course}) => {
    return <h2>{course}</h2>
}

const Part = ({part}) => {
    return <p className='part'>{part.name} {part.exercises}</p>
}

const Content = ({parts}) =>
    <div className='content'>{parts.map(part =>
        <Part part={part} key={part.id}/>
    )}</div>


const Total = ({parts}) => {
    const totalNumber = parts
        .map(part => part.exercises)
        .reduce((a, b) => a + b, 0)

    return (
        <p className={'total'}>
            total of {totalNumber} exercises
        </p>
    )
}


const Course = ({course}) => {
    return (
        <div className='course'>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course
