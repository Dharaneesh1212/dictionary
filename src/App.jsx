import { useState, useEffect } from "react";

const App = () => {
  const [meaning, setMeaning] = useState({});
  const [search, setSearch] = useState("");

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`;

  const getData = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setMeaning(data[0]);
        console.log(data);
      } else {
        console.log("There is no data");
      }
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  return (
    <main className="flex items-center justify-center h-screen w-screen">
      <div className="flex items-center justify-center flex-col gap-4 h-auto w-[38rem] p-6 bg-red-500 rounded-lg">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Give word to get meaning"
            className="p-2 outline-none rounded-md text-lg font-semibold"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {meaning.word && (
          <div className="flex flex-col items-start justify-start w-full h-auto m-4">
            <div className="flex items-center justify-start font-semibold text-xl h-auto w-full p-4">
              <p>
                Part of speech : {meaning.meanings && meaning.meanings[0]?.partOfSpeech}
              </p>
            </div>
            <div className="flex items-center justify-start font-semibold text-xl h-auto w-full p-4">
              <p>
                Definition : {meaning.meanings &&
                  meaning.meanings[0]?.definitions[0]?.definition}
              </p>
            </div>
            <div className="flex items-center justify-start font-semibold text-xl h-auto w-full p-4">
              <p>
                Audio pronounciation : <a 
                  className="text-white"
                  href={meaning.meanings && meaning.phonetics[0]?.audio} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Listen_audio
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default App;
