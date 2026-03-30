export default function Gastronomia() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Gastronomia
      </h1>

      {/* Introduzione */}
      <div className="mb-12">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Il Palio d'Urmon non è solo competizione e tradizione, ma anche un momento di convivialità 
          e scoperta dei sapori autentici del territorio. Durante i giorni della manifestazione, 
          i rioni aprono le loro cucine per offrire ai visitatori piatti tipici della tradizione locale.
        </p>
      </div>

      {/* Stand gastronomici */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Stand Gastronomici
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Ogni rione allestisce il proprio stand gastronomico dove è possibile gustare:
          </p>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
              <span><strong>Risotto alla robbiolese</strong> - Il piatto simbolo della tradizione locale, 
              preparato secondo le antiche ricette tramandate di generazione in generazione</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
              <span><strong>Salame d'oca</strong> - Specialità tipica del territorio, preparato artigianalmente 
              seguendo metodi tradizionali</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
              <span><strong>Paniscia</strong> - Piatto tradizionale lomellino a base di riso, fagioli e verdure</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
              <span><strong>Formaggi locali</strong> - Selezione dei migliori formaggi della Lomellina</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
              <span><strong>Dolci della tradizione</strong> - Torte e biscotti preparati secondo le ricette 
              delle nonne robbiolesi</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Vini e bevande */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Vini e Bevande
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Per accompagnare i piatti, vengono proposti i migliori vini delle colline pavesi e oltrepadane:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
              <span>Bonarda dell'Oltrepò Pavese</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
              <span>Barbera</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
              <span>Pinot Nero</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
              <span>Riesling</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
              <span>Birre artigianali locali</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Info pratiche */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          ℹ️ Informazioni Pratiche
        </h3>
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>
            <strong>Quando:</strong> Gli stand gastronomici sono aperti durante tutti i giorni della manifestazione, 
            da venerdì sera a domenica sera.
          </p>
          <p>
            <strong>Dove:</strong> Presso le sedi dei rioni nel centro storico di Robbio.
          </p>
          <p>
            <strong>Orari:</strong> Dalle 19:00 fino a tarda serata.
          </p>
          <p className="text-sm italic">
            Gli stand gastronomici rappresentano un'occasione unica per vivere l'atmosfera del Palio 
            e scoprire i sapori autentici della tradizione robbiolese.
          </p>
        </div>
      </div>
    </div>
  );
}