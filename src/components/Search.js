const Search = ({ setSearch }) => (
  <div>
     search:
      <input onChange={({ target }) => setSearch(target.value.toLowerCase())} />
  </div>
)

export default Search;