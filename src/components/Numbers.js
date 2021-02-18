import { Link } from 'react-router-dom';

const Numbers = ({ list, handler }) => (
  <div>   
    {list.map(contact => (
      <div key={contact.name} >
        <Link to={`/contacts/${contact.id}`}>
          {contact.name} {contact.number}
        </Link> 
        <button onClick={() => handler(contact.name)}>delete</button>
      </div>
    ))}
  </div>
)

export default Numbers;