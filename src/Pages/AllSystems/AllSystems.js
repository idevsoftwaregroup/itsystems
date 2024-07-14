import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loader from "../../components/common/Loader";
import * as Services from "../../services/organizationChartServices/SystemDetailService";
import { IoImage } from "react-icons/io5";

const SystemPage = () => {
  const fileStorageUrl = process.env.REACT_APP_FILESTORAGE_API_URL;
  const baseUrl = process.env.REACT_APP_CHART_API_URL;
  const urlData = window.location.origin;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [systemsPerPage] = useState(10); // Number of systems per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state to true before fetching
        const res = await Services.getAllSystems(); // Fetch systems data
        if (res.success && res.data) {
          setData(res.data); // Update state with fetched data
        } else {
          console.error("No data returned from API");
        }
      } catch (err) {
        console.error("Error fetching system data:", err);
        // Handle error (e.g., redirect to error page)
        // navigate("/not-found");
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchData(); // Call fetchData when component mounts
  }, [id, navigate]); // Dependency array: run effect when id or navigate changes

  // Logic to paginate data
  const indexOfLastSystem = currentPage * systemsPerPage;
  const indexOfFirstSystem = indexOfLastSystem - systemsPerPage;
  const currentSystems = data ? data.slice(indexOfFirstSystem, indexOfLastSystem) : [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const copyUrlToClipboard = (computerName) => {
    const url = `${urlData}/system/${encodeURIComponent(computerName)}`;
    navigator.clipboard.writeText(url);
    // You can optionally show a toast or alert to indicate successful copy
    console.log(`Copied URL to clipboard: ${url}`);
  };

  if (loading || !data) {
    return <Loader />; // Render loader while fetching data
  }

  // Calculate total pages
  const totalPages = Math.ceil(data.length / systemsPerPage);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
          <tr>
            <th scope="col" className="px-6 py-3">
              نام سیستم
            </th>
            <th scope="col" className="px-6 py-3">
              کاربر
            </th>
            <th scope="col" className="px-6 py-3">
              سیستم عامل
            </th>
            <th scope="col" className="px-6 py-3">
              حافظه سیستم
            </th>
            <th scope="col" className="p-6 py-3">
              نام مادربورد
            </th>
            <th scope="col" className="p-6 py-3">
              مدل مادربورد
            </th>
            <th scope="col" className="p-6 py-3">
              پردازنده مرکزی ( CPU‌ )
            </th>
            <th scope="col" className="p-6 py-3">
              توضیحات
            </th>
            <th scope="col" className="p-6 py-3">
              محل استفاده
            </th>
            <th scope="col" className="p-6 py-3">
              تصویر سیستم
            </th>
            <th scope="col" className="p-6 py-3">
              نوع کاربری سیستم
            </th>
            <th scope="col" className="p-6 py-3">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          {currentSystems.map((system) => (
            <tr
              key={system.systemId}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                {system.computerName ? system.computerName : "ثبت نشده"}
              </td>
              <td className="px-6 py-4">
                {system.user ? system.user : "ثبت نشده"}
              </td>
              <td className="px-6 py-4">
                {system.os ? system.os : "ثبت نشده"}
              </td>
              <td className="px-6 py-4">
                {system.ram ? system.ram : "ثبت نشده"}
              </td>
              <td className="px-6 py-4">
                {system.mainBoardName ? system.mainBoardName : "ثبت نشده"}
              </td>
              <td className="px-6 py-4">
                {system.mainBoardModel ? system.mainBoardModel : "ثبت نشده"}
              </td>
              <td className="px-6 py-4">
                {system.cpu ? system.cpu : "ثبت نشده"}
              </td>
              <td className="px-6 py-4">
                {system.description ? system.description : "ثبت نشده"}
              </td>
              <td className="px-6 py-4">
                {system.location ? system.location : "ثبت نشده"}
              </td>
              <td className="px-6 py-4">
                {system.systemPicUrl ? (
                  <img
                    src={`${fileStorageUrl}${system.systemPicUrl}`}
                    alt={`تصویر سیستم ${system.systemId}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <IoImage size={45} className="text-gray-400" />
                )}
              </td>
              <td className="px-6 py-4">
                {system.systemTypeName ? system.systemTypeName : "ثبت نشده"}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => copyUrlToClipboard(system.computerName)}
                  className="text-white hover:underline focus:outline-none px-5"
                >
                  کپی
                </button>
                <button
                  className="text-white bg-blue-500 focus:outline-none"
                  onClick={() => {
                    // Define your navigation logic here, for example:
                    window.open(
                      `${urlData}/system/${encodeURIComponent(
                        system.computerName
                      )}`,
                      "_blank"
                    );
                  }}
                >
                  دیدن
                </button>
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
            className={`bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-700 py-2 px-4 ml-2 rounded ${
              currentPage === index + 1 ? "bg-gray-300" : ""
            }`}
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
