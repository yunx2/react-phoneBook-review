const AddForm = ({ handler, setNumber, setName, setAddress, setNotes, address, notes, name, number }) => (
  <form>
    <div>name: 
      <input value={name} onChange={({ target }) => setName(target.value)} />
    </div>
    <div>number:
      <input value={number} onChange={({ target }) => setNumber(target.value)} />
    </div>
    <div>address:
      <input value={address} onChange={({ target }) => setAddress(target.value)} />
    </div>
    <div>notes:
      <input value={notes} onChange={({ target }) => setNotes(target.value)} />
    </div>
    <div>
      <button type="submit" onClick={e => handler(e)}>add</button>
    </div>
</form>
)

export default AddForm;