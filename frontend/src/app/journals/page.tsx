"use client";

import { useEffect, useState } from "react";
import { getJournals } from "@/services/journalService";
import Sidebar from "@/components/Sidebar";

export default function JournalsPage() {

const [journals, setJournals] = useState<any[]>([]);
const [search, setSearch] = useState("");
const [month, setMonth] = useState("");
const [year, setYear] = useState("");

useEffect(() => {
loadJournals();
}, []);

const loadJournals = async () => {

try {

  const data = await getJournals();

  setJournals(data);

} catch (error) {

  console.error(
    "Failed to load journals",
    error
  );

}

};

const filteredJournals =
journals.filter((journal: any) => {

  const matchesSearch =

    journal.title
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )

    ||

    journal.content
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      );

  const journalDate =
    new Date(
      journal.created_at
    );

  const matchesMonth =
    !month ||
    journalDate.getMonth() + 1
    ===
    Number(month);

  const matchesYear =
    !year ||
    journalDate.getFullYear()
    ===
    Number(year);

  return (
    matchesSearch
    &&
    matchesMonth
    &&
    matchesYear
  );

});

return (

<div className="flex min-h-screen">

  {/* Sidebar */}

  <div className="w-60 border-r bg-white">

    <Sidebar />

  </div>

  {/* Main Content */}

  <div className="flex-1 bg-green-50 p-10">

    <h1 className="text-5xl font-bold text-black mb-8">
      JOURNALS
    </h1>

    {/* Filters Row */}

    <div
      className="
      bg-white
      rounded-xl
      shadow-md
      p-6
      mb-8
      flex
      gap-4
      items-end
      flex-wrap
      "
    >

      {/* Search */}

      <div className="flex-1 min-w-[250px]">

        <label
          className="
          block
          font-semibold
          text-black
          mb-2
          "
        >
          Search Journals
        </label>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
          w-full
          border
          rounded-lg
          p-3
          text-black
          "
        />

      </div>

      {/* Month */}

      <div>

        <label
          className="
          block
          font-semibold
          text-black
          mb-2
          "
        >
          Month
        </label>

        <select
          value={month}
          onChange={(e) =>
            setMonth(
              e.target.value
            )
          }
          className="
          border
          rounded-lg
          p-3
          min-w-[180px]
          text-black
          "
        >

          <option value="">
            All Months
          </option>

          <option value="1">
            January
          </option>

          <option value="2">
            February
          </option>

          <option value="3">
            March
          </option>

          <option value="4">
            April
          </option>

          <option value="5">
            May
          </option>

          <option value="6">
            June
          </option>

          <option value="7">
            July
          </option>

          <option value="8">
            August
          </option>

          <option value="9">
            September
          </option>

          <option value="10">
            October
          </option>

          <option value="11">
            November
          </option>

          <option value="12">
            December
          </option>

        </select>

      </div>

      {/* Year */}

      <div>

        <label
          className="
          block
          font-semibold
          text-black
          mb-2
          "
        >
          Year
        </label>

        <select
          value={year}
          onChange={(e) =>
            setYear(
              e.target.value
            )
          }
          className="
          border
          rounded-lg
          p-3
          min-w-[150px]
          text-black
          "
        >

          <option value="">
            All Years
          </option>

          <option value="2026">
            2026
          </option>

          <option value="2025">
            2025
          </option>

          <option value="2024">
            2024
          </option>

        </select>

      </div>

    </div>

    {/* Journal Cards */}

    {

      filteredJournals.length === 0

      ?

      (

        <div
          className="
          bg-white
          p-8
          rounded-xl
          shadow-md
          text-black
          "
        >

          No journals found.

        </div>

      )

      :

      (

        <div
          className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
          "
        >

          {

            filteredJournals.map(
              (
                journal: any
              ) => (

                <div
                  key={
                    journal.id
                  }
                  className="
                  bg-white
                  rounded-xl
                  shadow-lg
                  border-t-8
                  border-[#89023E]
                  p-6
                  hover:shadow-xl
                  transition
                  "
                >

                  <h2
                    className="
                    text-2xl
                    font-bold
                    text-black
                    mb-3
                    "
                  >

                    {
                      journal.title
                    }

                  </h2>

                  <p
                    className="
                    text-black
                    "
                  >

                    {

                      journal.content
                        .length > 150

                        ?

                        journal.content.slice(
                          0,
                          150
                        ) + "..."

                        :

                        journal.content

                    }

                  </p>

                  <p
                    className="
                    mt-5
                    text-sm
                    text-gray-500
                    "
                  >

                    {

                      new Date(
                        journal.created_at
                      )
                      .toLocaleDateString()

                    }

                  </p>

                </div>

              )
            )

          }

        </div>

      )

    }

  </div>

</div>

);
}