export default function Table({ headers, children }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400 border-b border-gray-100">
            {headers.map((header, index) => (
              <th 
                key={index} 
                className={`pb-4 font-medium ${header === 'Action' ? 'text-center' : ''}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {children}
        </tbody>
      </table>
    </div>
  );
}