import React, { useState } from "react";
import Modal from "../../../components/common/Modal";
import Button from "../../../components/common/Button";
import { useDispatch } from "react-redux";
import {
  showErrorAlert,
  showSuccessAlert,
} from "../../../redux/features/alert/alertSlice";
import * as Repo from "../../../services/organizationChartServices/SystemDetailService";
import { useNavigate } from "react-router-dom";
const DeleteSystemModal = ({ show, onHide, system }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!system || !system.systemId) {
      dispatch(showErrorAlert({ message: "شناسه سیستم وجود ندارد" }));
      return;
    }
    setLoading(true);
    const res = await Repo.DELETE("DeleteSystem", {
      systemId: system.systemId,
    });
    if (res.success) {
      dispatch(showSuccessAlert({ message: res.message }));
      navigate(0);
    } else {
      dispatch(showErrorAlert({ message: res.message }));
    }
    setLoading(false);
  };
  return (
    <Modal show={show} onHide={onHide} title="حذف سیستم">
      <form
        onSubmit={submitHandler}
        className="min-h-[calc(17dvh)] text-[14px] w-full flex flex-col justify-between gap-y-2 leading-6"
      >
        <div>
          آیا از حذف سیستم
          {system && system.systemName ? (
            <span className="text-red-600">{` ${system.systemName} `}</span>
          ) : null}
          مطمئن هستید؟
        </div>
        <div className="flex justify-end gap-2 items-center pt-3 border-t border-gray-200">
          <Button
            disabled={loading}
            onClick={onHide}
            type="button"
            bg="bg-transparent disabled:bg-transparent disabled:text-[#121212] hover:bg-[#121212] hover:text-white"
            color="text-[#121212]"
            border="border !border-[#121212]"
            width="w-[calc(100%-8px)] sm:w-[110px]"
          >
            انصراف
          </Button>
          <Button
            loading={loading}
            loadingFill="fill-white"
            bg="bg-red-600"
            color="text-white"
            width="w-[calc(100%-8px)] sm:w-[110px]"
            type="submit"
          >
            حذف
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteSystemModal;
