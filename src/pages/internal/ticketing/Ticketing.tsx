import React, { useEffect, useState } from "react";
import InternalLayout from "../InternalLayout";
import { getTickets } from "../../../services/ticketService";
import DataTable from "../../../components/global/dataTables/DataTable";
import Pagination from "../../../components/global/dataTables/Pagination";

const Ticketing: React.FC = () => {
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data } = await getTickets(currentPage, 10);
        setTickets(data.tickets);
        setTotalPages(Math.ceil(data.total / 10));
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [currentPage]);

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Description", accessor: "description" },
    { header: "Status", accessor: "status" },
    { header: "Attachment", accessor: "attachment" },
    { header: "PIC", accessor: "pic.name" },
    { header: "Requestor", accessor: "requestor.name" },
  ];

  return (
    <InternalLayout>
      <h1 className="text-2xl font-bold mb-4">
        Welcome to the Ticketing Page!
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <DataTable columns={columns} data={tickets} />
          <div className="flex justify-end mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </InternalLayout>
  );
};

export default Ticketing;
