export default function Programma2025() {
  const programma = [
    {
      giorno: "Venerdì 12/09",
      eventi: [
        { ora: "18:00", titolo: "Apertura stand", luogo: "Piazza" },
        { ora: "21:00", titolo: "Sfilata dei Rioni", luogo: "Centro storico" },
      ],
    },
    {
      giorno: "Sabato 13/09",
      eventi: [
        { ora: "10:00", titolo: "Giochi dei bambini", luogo: "Parco" },
        { ora: "15:00", titolo: "Prove generali", luogo: "Piazza" },
      ],
    },
    {
      giorno: "Domenica 14/09",
      eventi: [
        { ora: "16:00", titolo: "Il Palio", luogo: "Percorso cittadino" },
        { ora: "19:00", titolo: "Premiazione", luogo: "Palco centrale" },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Programma 2025
      </h1>

      {programma.map((giorno, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            {giorno.giorno}
          </h2>
          <ul className="space-y-2">
            {giorno.eventi.map((evento, i) => (
              <li key={i} className="border-b pb-2">
                <span className="font-semibold">{evento.ora}</span>{" "}
                <span className="font-bold">{evento.titolo}</span>
                <div className="text-gray-600 dark:text-gray-300">{evento.luogo}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
