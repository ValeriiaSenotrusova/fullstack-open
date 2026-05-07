const Total = ({parts}) => {
  const totalAmount = parts.reduce((sum,parts)=> sum + parts.exercises,0)
  return (
    <h3>total of {totalAmount} exercises</h3>
  )
}
export default Total