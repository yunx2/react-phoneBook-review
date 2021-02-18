const Numbers = ({ list, handler }) => (
  <div>   
    {list.map(contact => (
      <div key={contact.name} >{contact.name} {contact.number}
        <button onClick={() => handler(contact.name)}>delete</button>
      </div>
    ))}
  </div>
)

export default Numbers;