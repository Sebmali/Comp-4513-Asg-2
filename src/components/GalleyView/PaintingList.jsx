// PaintingsList.jsx
import React, { useState, useMemo } from 'react';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';

function PaintingsList({ paintings, onSelectPainting }) {
  const [sortField, setSortField] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');

  // Sort the paintings array based on sortField and sortDirection
  const sortedPaintings = useMemo(() => {
    const sorted = [...paintings].sort((a, b) => {
      let compareVal = 0;
      if (sortField === 'title') {
        compareVal = a.title.localeCompare(b.title);
      } else if (sortField === 'artist') {
        compareVal = a.artist.localeCompare(b.artist);
      } else if (sortField === 'year') {
        compareVal = a.year - b.year;
      }
      return sortDirection === 'asc' ? compareVal : -compareVal;
    });
    return sorted;
  }, [paintings, sortField, sortDirection]);

  // Toggle sort field/direction
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle asc/desc
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <section className="flex flex-col h-full border border-gray-600 bg-gray-700 rounded-md shadow-sm overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Paintings</h2>
      </div>

      {/* Scrollable container for the table */}
      <div className="flex-grow overflow-y-auto px-4 pb-4">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-600 text-white">
              {/* Title Column */}
              <th
                className="px-2 py-2 cursor-pointer w-1/3"
                onClick={() => handleSort('title')}
              >
                Title
                {sortField === 'title' && (
                  sortDirection === 'asc' ? <AiOutlineArrowUp className="inline ml-1" /> : <AiOutlineArrowDown className="inline ml-1" />
                )}
              </th>

              {/* Artist Column */}
              <th
                className="px-2 py-2 cursor-pointer w-1/3"
                onClick={() => handleSort('artist')}
              >
                Artist
                {sortField === 'artist' && (
                  sortDirection === 'asc' ? <AiOutlineArrowUp className="inline ml-1" /> : <AiOutlineArrowDown className="inline ml-1" />
                )}
              </th>

              {/* Year Column */}
              <th
                className="px-2 py-2 cursor-pointer w-1/6"
                onClick={() => handleSort('year')}
              >
                Year
                {sortField === 'year' && (
                  sortDirection === 'asc' ? <AiOutlineArrowUp className="inline ml-1" /> : <AiOutlineArrowDown className="inline ml-1" />
                )}
              </th>

              {/* Thumbnail Column */}
              <th className="px-2 py-2 w-1/6">Thumbnail</th>
            </tr>
          </thead>

          <tbody>
            {sortedPaintings.map((p) => (
              <tr
                key={p.paintingId}
                className="border-b border-gray-500 hover:bg-gray-600 cursor-pointer"
                onClick={() => onSelectPainting?.(p.paintingId)}
              >
                <td className="px-2 py-2">{p.title}</td>
                <td className="px-2 py-2">{p.artistId}</td> {/* Change to artist using the artist ID */}
                <td className="px-2 py-2">{p.yearOfWork}</td>
                <td className="px-2 py-2">
                  {p.thumbnail ? (
                    <img
                      src={p.imageFileName} /* Change to thumbnail using image FileName */
                      alt={p.title}
                      className="h-10 w-auto inline-block"
                    />
                  ) : (
                    <span className="text-sm text-gray-400">No image</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {paintings.length === 0 && (
          <p className="text-gray-300 mt-4">No paintings found.</p>
        )}
      </div>
    </section>
  );
}

export default PaintingsList;