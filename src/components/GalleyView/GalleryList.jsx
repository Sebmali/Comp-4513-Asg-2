import React from 'react';

function GalleryList({ galleries, onSelectGallery }) {
  return (
    // <aside className="flex flex-col h-full border border-gray-600 bg-gray-700 p-4 rounded-md shadow-sm">
    <aside className="flex flex-col h-full border border-gray-600 bg-gray-700 p-4 rounded-md shadow-sm overflow-hidden">
      <h2 className="text-2xl font-semibold mb-3 text-gray-100">Galleries</h2>
      <div className="flex-grow overflow-y-auto px-4 pb-4">
        <ul className="list-none m-0 p-0 space-y-2" style={{ paddingInlineStart: 0}}>
            {galleries.map((g) => (
            <li key={g.galleryId} >
                <button
                    type="button"
                    className="block w-full 
                        px-4 py-2
                        bg-gray-600
                        hover:bg-gray-500 hover:text-blue-300
                        rounded-md
                        focus:outline-none
                        focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-700
                        transition-colors duration-150 ease-in-out
                        "
                    onClick={() => onSelectGallery(g.galleryId)}>
                    {g.galleryName}
                </button>
          </li>
        ))}
        </ul>
      </div>
    </aside>
  );
}

export default GalleryList;