const Numbers = ({ personsList}) => (
  <div>   
    {personsList.map(person => <div>{person.name} {person.number}</div>)}
  </div>
)

export default Numbers;