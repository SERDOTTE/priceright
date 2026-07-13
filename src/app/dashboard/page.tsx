'use client'

import Link from 'next/link';
import Modal from '../../../components/Modal';
import React, { useState } from 'react';
import Filter from '../../../components/Filter';

export const FilterList = [
  {
    title: "Support Status", label: "Ticket Status", htmlFor: "ticketStatus", name: "status", id: "ticketStatus",
    options: [
      { value: "all", label: "All Tickets" },
      { value: "open", label: "Open / Unassigned" },
      { value: "pending", label: "Pending Client Action" },
      { value: "resolved", label: "Resolved" }
    ]
  },
  {
    title: "Priority Level", label: "Urgency", htmlFor: "urgencyLevel", name: "priority", id: "urgencyLevel",
    options: [
      { value: "high", label: "High Priority (24hr)" },
      { value: "medium", label: "Medium" },
      { value: "low", label: "Low" }
    ]
  },
  {
    title: "Record Type", label: "Document Category", htmlFor: "docCategory", name: "document_type", id: "docCategory",
    options: [
      { value: "invoice", label: "Invoices" },
      { value: "contract", label: "Service Contracts" },
      { value: "intake", label: "Client Intake Forms" }
    ]
  }
];

export default function OrdersDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen text-[#2D3436] font-sans">
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <main className="p-8 max-w-7xl mx-auto">
        <div className="flex max-sm:flex-col max-sm:gap-2 max-sm:items-start sm:max-w-250 my-0 mx-auto justify-between items-center rounded-lg mb-6 shadow-md/20 p-5">
          <div id="searchBoxContainer">
            <div className="searchContainer flex items-center justify-between gap-2 h-8 ">
              <input
                type="search"
                id="search"
                name="q"
                placeholder="Search Orders"
                className="w-full h-full text-sm rounded-md ring-1 focus:ring-blue-500 bg-transparent outline-none px-2 py-1"
              />
              <div className="search-icon bg-callout flex justify-center items-center rounded-full w-13 h-10 hover:cursor-pointer hover:bg-callout/-70">
                <button aria-label="button" className='hover:cursor-pointer' >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="size-4">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                  </svg>
                </button>
              </div>

            </div>
          </div>

          {/* Opening the modal is now just a link */}
          <button onClick={() => setIsOpen(true)}
            className="bg-header2 text-white px-6 py-2 rounded-md font-medium hover:cursor-pointer"
          >+ Create Order
          </button>
        </div>
        <div className='bg-gray-200 shadow-md/20 rounded-l sm:max-w-250 my-0 mx-auto'>
          <Filter filters={FilterList} />
        </div>
 
        {/* Table rendering goes here (same as before, mapping over 'orders') */}
        <div className="bg-[#FFFFFF] rounded-lg shadow overflow-hidden">
          {/* ... table content ... */}
          {/* View button inside table: */}
          {/* <Link href={`/dashboard?viewOrder=${order.id}`}>View</Link> */}
        </div>
      </main>
    </div>
  );
}