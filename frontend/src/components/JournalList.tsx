"use client";

import { useEffect, useState } from "react";
import { getJournals } from "@/services/journalService";

export default function JournalList() {

  const [journals,setJournals] = useState([]);

  useEffect(()=>{

    loadJournals();

  },[]);

  const loadJournals = async () => {

    const data = await getJournals();

    setJournals(data);
  };

  return (

    <div>

      <h2 className="font-bold mb-4">
        Recent Journals
      </h2>

      {journals.map((journal:any)=>(
        <div
          key={journal.id}
          className="border p-3 mb-2 rounded"
        >

          {journal.title}

        </div>
      ))}

    </div>
  );
}