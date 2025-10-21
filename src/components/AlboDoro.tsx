export default function AlboDoro() {
  const data = [
    { anno: 2024, vincitore: "Ciot", punti: 18 },
    { anno: 2023, vincitore: "Mulin", punti: 16 },
    { anno: 2022, vincitore: "Torre", punti: 17 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Albo d&apos;oro
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                Anno
              </th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                Vincitore
              </th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                Punti
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.anno}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                  {item.anno}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                  {item.vincitore}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                  {item.punti}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
