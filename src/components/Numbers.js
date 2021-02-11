const Numbers = ({ personsList, handler }) => (
  <div>   
    {personsList.map(person => (
      <div key={person.name} >{person.name} {person.number}
        <button onClick={() => handler(person.name)}>delete</button>
      </div>
    ))}
  </div>
)

export default Numbers;