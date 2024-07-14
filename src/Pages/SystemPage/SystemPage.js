import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import * as Services from "../../services/organizationChartServices/SystemDetailService";
import { IoImage } from "react-icons/io5";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import DeleteSystemModal from "./modals/DeleteSystemModal";
import UpdateSystemModal from "./modals/UpdateSystemModal";

const SystemPage = () => {
  const fileStorageUrl = process.env.REACT_APP_FILESTORAGE_API_URL;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [showUpdateModel, setShowUpdateModel] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state to true before fetching
        if (!id) {
          navigate("/not-found");
          return;
        }
        const res = await Services.GET(`GetSystem/${id}`);
        if (res.success && res.data) {
          setData(res.data);
        } else {
          navigate("/not-found");
        }
      } catch (err) {
        console.error("Error fetching system data:", err);
        navigate("/not-found");
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchData(); // Call fetchData when component mounts
  }, [id, navigate]);

  const reloadData = async () => {
    try {
      setLoading(true);
      const res = await Services.GET(`GetSystem/${id}`);
      if (res.success && res.data) {
        setData(res.data);
      } else {
        navigate("/not-found");
      }
    } catch (err) {
      console.error("Error fetching system data:", err);
      navigate("/not-found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="w-full min-h-[calc(100dvh)] flex justify-center items-center"
        dir="rtl"
      >
        {loading || !data ? (
          <Loader />
        ) : (
          <div className="w-full h-[calc(100dvh)] sm:h-auto sm:w-[375px] sm:border sm:border-gray-300 sm:rounded-[15px] sm:shadow-md flex flex-col justify-between items-center gap-y-2 p-3 font-theme-semibold">
            <div className="w-full flex flex-col gap-y-2">
              {data.systemPicUrl ? (
                <div className="bg-gray-100 rounded-[10px] mb-2">
                  <img
                    alt={data.systemId ? data.systemId : "تصویر سیستم"}
                    src={`${fileStorageUrl}${data.systemPicUrl}`}
                    className="w-full aspect-[4/2.3] object-contain rounded-[10px]"
                  />
                </div>
              ) : (
                <div className="bg-gray-100 rounded-[10px] w-full aspect-[4/2.3] flex justify-center items-center mb-2">
                  <IoImage size={45} className="text-gray-400" />
                </div>
              )}
              <div className="flex items-center gap-x-2 text-[13px] ">
                <label className="text-gray-500">شناسه سیستم :</label>
                <div>{data.systemId}</div>
              </div>
              <div className="flex items-center gap-x-2 text-[13px] ">
                <label className="text-gray-500">نام سیستم :</label>
                <div className={`${data.computerName ? "" : "text-red-600"}`}>
                  {data.computerName ? data.computerName : "ثبت نشده"}
                </div>
              </div>
              <div className="flex items-center gap-x-2 text-[13px] ">
                <label className="text-gray-500">مکان :</label>
                <div className={`${data.location ? "" : "text-red-600"}`}>
                  {data.location ? data.location : "ثبت نشده"}
                </div>
              </div>
              <div className="flex items-center gap-x-2 text-[13px] ">
                <label className="text-gray-500">کاربر سیستم :</label>
                <div className={`${data.user ? "" : "text-red-600"}`}>
                  {data.user ? data.user : "ثبت نشده"}
                </div>
              </div>
              <div className="flex items-center gap-x-2 text-[13px] ">
                <label className="text-gray-500">سیستم عامل :</label>
                <div className={`${data.os ? "" : "text-red-600"}`}>
                  {data.os ? data.os : "ثبت نشده"}
                </div>
              </div>
              <div className="flex items-center gap-x-2 text-[13px] ">
                <label className="text-gray-500">حافظه سیستم :</label>
                <div className={`${data.ram ? "" : "text-red-600"}`}>
                  {data.ram ? data.ram : "ثبت نشده"}
                </div>
              </div>
              <div className="flex items-center gap-x-2 text-[13px] ">
                <label className="text-gray-500">نام مادربورد :</label>
                <div className={`${data.mainBoardName ? "" : "text-red-600"}`}>
                  {data.mainBoardName ? data.mainBoardName : "ثبت نشده"}
                </div>
              </div>
              <div className="flex items-center gap-x-2 text-[13px] ">
                <label className="text-gray-500">مدل مادربورد :</label>
                <div className={`${data.mainBoardModel ? "" : "text-red-600"}`}>
                  {data.mainBoardModel ? data.mainBoardModel : "ثبت نشده"}
                </div>
              </div>
              <div className="flex items-center gap-x-2 text-[13px] ">
                <label className="text-gray-500">ریزپردازنده ( CPU‌ ) :</label>
                <div className={`${data.cpu ? "" : "text-red-600"}`}>
                  {data.cpu ? data.cpu : "ثبت نشده"}
                </div>
              </div>
              <div className="flex items-center gap-x-2 text-[13px] ">
                <label className="text-gray-500">توضیحات :</label>
                <div className={`${data.description ? "" : "text-red-600"}`}>
                  {data.description ? data.description : "ثبت نشده"}
                </div>
              </div>
              {data.description ? (
                <div className="flex items-start gap-x-2 text-[13px] ">
                  <label className="text-gray-500 whitespace-nowrap mt-[3px]">
                    توضیحات :
                  </label>
                  <div className="leading-6">{data.description}</div>
                </div>
              ) : null}
            </div>
            <div className="w-full flex flex-col gap-y-2">
              <Button onClick={() => setShowUpdateModel(true)}>ویرایش</Button>
              <Button onClick={() => setShowDeleteModal(true)} bg="bg-red-600">
                حذف
              </Button>
            </div>
          </div>
        )}
      </div>
      {showUpdateModel && (
        <UpdateSystemModal
          show={showUpdateModel}
          onHide={() => setShowUpdateModel(false)}
          reload={reloadData}
          system={data}
        />
      )}
      {showDeleteModal && (
        <DeleteSystemModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          system={data}
        />
      )}
    </>
  );
};

export default SystemPage;
