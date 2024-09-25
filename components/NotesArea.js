export default function NotesArea({ label, id, name, value, onChange, rows = 4 }) {
    return (
      <div>
        <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <div className="mt-2">
          <textarea
            id={id}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            name={name}
            rows={rows}
            onChange={onChange}
            value={value}
          />
        </div>
      </div>
    )
  }