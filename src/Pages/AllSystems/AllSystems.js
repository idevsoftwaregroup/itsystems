import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import * as Services from "../../services/organizationChartServices/SystemDetailService";

const SystemPage = () => {
  const fileStorageUrl = process.env.REACT_APP_FILESTORAGE_API_URL;
  const baseUrl = process.env.REACT_APP_CHART_API_URL;
  const urlData = window.location.origin;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [systemsPerPage] = useState(10); // Number of systems per page
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await Services.getAllSystems();
        if (res.success && res.data) {
          setData(res.data);
        } else {
          console.error("No data returned from API");
        }
      } catch (err) {
        console.error("Error fetching system data:", err);
        // Handle error (e.g., redirect to error page)
        // navigate("/not-found");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const indexOfLastSystem = currentPage * systemsPerPage;
  const indexOfFirstSystem = indexOfLastSystem - systemsPerPage;

  // Function to filter data based on searchTerm
  const filteredSystems = data
    ? data.filter((system) =>
        Object.keys(system).some((key) =>
          system[key]
            ? system[key]
                .toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            : false
        )
      )
    : [];

  const currentSystems = filteredSystems.slice(
    indexOfFirstSystem,
    indexOfLastSystem
  );

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to copy URL to clipboard
  const copyUrlToClipboard = (computerName) => {
    const url = `${urlData}/system/${encodeURIComponent(computerName)}`;
    navigator.clipboard.writeText(url);
    console.log(`Copied URL to clipboard: ${url}`);
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination to first page when searching
  };

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    return text.replace(regex, match => `<span class="highlight">${match}</span>`);
  };

  if (loading || !data) {
    return <Loader />;
  }

  const totalPages = Math.ceil(filteredSystems.length / systemsPerPage);

  return (
    <div className="relative overflow-x-auto">
      <div className="mb-4 flex justify-right pt-5">
        <label className="p-3">جستجو کنید :</label>
        <input
          type="text"
          placeholder="نام سیستم و سایر موارد ..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border rounded-md w-64 text-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
          <tr>
            <th scope="col" className="px-6 py-3">نام سیستم</th>
            <th scope="col" className="px-6 py-3">نام کاربر</th>
            <th scope="col" className="px-6 py-3">سیستم عامل</th>
            <th scope="col" className="p-6 py-3">مدل مادربورد</th>
            <th scope="col" className="p-6 py-3">پردازنده مرکزی</th>
            <th scope="col" className="p-6 py-3">محل استفاده</th>
            <th scope="col" className="p-6 py-3">نوع کاربری</th>
            <th scope="col" className="p-6 py-3">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {currentSystems.map((system) => (
            <tr key={system.systemId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: highlightText(system.computerName || "ثبت نشده", searchTerm) }}></td>
              <td className="px-6 py-4" dangerouslySetInnerHTML={{ __html: highlightText(system.user || "ثبت نشده", searchTerm) }}></td>
              <td className="px-6 py-4" dangerouslySetInnerHTML={{ __html: highlightText(system.os || "ثبت نشده", searchTerm) }}></td>
              <td className="px-6 py-4" dangerouslySetInnerHTML={{ __html: highlightText(system.mainBoardModel || "ثبت نشده", searchTerm) }}></td>
              <td className="px-6 py-4" dangerouslySetInnerHTML={{ __html: highlightText(system.cpu || "ثبت نشده", searchTerm) }}></td>
              <td className="px-6 py-4" dangerouslySetInnerHTML={{ __html: highlightText(system.location || "ثبت نشده", searchTerm) }}></td>
              <td className="px-6 py-4" dangerouslySetInnerHTML={{ __html: highlightText(system.systemTypeName || "ثبت نشده", searchTerm) }}></td>
              <td className="px-6 py-4">
                <button onClick={() => copyUrlToClipboard(system.computerName)} className="text-white focus:outline-none px-5">کپی</button>
                <button className="text-white bg-blue-500 focus:outline-none" onClick={() => { window.open(`${urlData}/system/${encodeURIComponent(system.computerName)}`, "_blank"); }}>دیدن</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-center my-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-700 py-2 px-4 ml-2 rounded"
        >
          قبلی
        </button>
        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-700 py-2 px-4 ml-2 rounded ${currentPage === index + 1 ? "bg-gray-300" : ""}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentSystems.length < systemsPerPage || currentPage === totalPages}
          className="bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-700 py-2 px-4 ml-2 rounded"
        >
          بعدی
        </button>
      </div>
    </div>
  );
};

export default SystemPage;
