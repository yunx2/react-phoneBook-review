const AddForm = ({ handler, setNumber, setName, name, number }) => (
  <form>
    <div>name: 
      <input value={name} onChange={({ target }) => setName(target.value)} />
    </div>
    <div>number:
      <input value={number} onChange={({ target }) => setNumber(target.value)} />
    </div>
    <div>
      <button type="submit" onClick={e => handler(e)}>add</button>
    </div>
</form>
)

export default AddForm;