import React, { useState } from "react";
import Modal from "../../../components/common/Modal";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Repo from "../../../services/organizationChartServices/SystemDetailService";
import {
  showErrorAlert,
  showSuccessAlert,
} from "../../../redux/features/alert/alertSlice";
import Input from "../../../components/common/Input";
import { onChangeHandler_MultiSpace } from "../../../utilities/InputOnchangeHandler.ts";
import FileUploader from "../../../components/common/FileUploader/FileUploader";
import Button from "../../../components/common/Button";
const UpdateSystemModal = ({ show, onHide, system, reload }) => {
  const [loading, setLoading] = useState(false);
  const [filePatch, setFilePatch] = useState(
    system && system.systemPicUrl ? { url: system.systemPicUrl } : {}
  );
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: system
      ? {
          systemName: system && system.systemName ? system.systemName : "",
          description: system && system.description ? system.description : "",
          location: system && system.location ? system.location : "",
        }
      : {
          systemName: "",
          description: "",
          location: "",
        },
    validate: (values) => {
      const errors = {};
      if (!values.systemName) {
        errors.systemName = "لطفا نام دستگاه را وارد کنید";
      } else if (values.systemName.length > 255) {
        errors.systemName = "نام دستگاه بدرستی وارد نشده است";
      }
      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      const res = await Repo.PUT("UpdateSystem", {
        systemId: system.systemId,
        systemName: values.systemName,
        description: values.description ? values.description : "",
        systemPicUrl: filePatch && filePatch.url ? filePatch.url : "",
        location: values.location ? values.location : "",
      });
      if (res.success) {
        dispatch(showSuccessAlert({ message: res.message }));
        await reload();
        onHide();
      } else {
        dispatch(showErrorAlert({ message: res.message }));
      }
      setLoading(false);
    },
  });

  return (
    <Modal
      width="w-[90%] sm:w-[580px] md:w-[750px] lg:w-[850px]"
      title="بروزرسانی سیستم"
      show={show}
      onHide={onHide}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col justify-between items-center gap-y-2"
      >
        <div className="w-full flex flex-col gap-y-2">
          <div className="w-full flex flex-wrap justify-between items-center gap-y-2">
            <Input
              errorText={
                formik.errors.systemName ? formik.errors.systemName : null
              }
              name="systemName"
              onChange={(e) =>
                onChangeHandler_MultiSpace(
                  e,
                  formik.handleChange,
                  formik.values.systemName,
                  25,
                  true
                )
              }
              value={formik.values.systemName}
              disabled={loading}
              label="نام دستگاه :"
              width="w-full sm:w-[calc(50%-8px)]"
              placeholder="لطفا نام دستگاه را وارد کنید"
            />
            <Input
              errorText={formik.errors.location ? formik.errors.location : null}
              name="location"
              onChange={(e) =>
                onChangeHandler_MultiSpace(
                  e,
                  formik.handleChange,
                  formik.values.location,
                  35,
                  true
                )
              }
              value={formik.values.location}
              disabled={loading}
              label="محل قرارگیری :"
              width="w-full sm:w-[calc(50%-8px)]"
              placeholder="لطفا محل دستگاه را وارد کنید"
            />
            <Input
              rows={4}
              errorText={
                formik.errors.description ? formik.errors.description : null
              }
              name="description"
              onChange={(e) =>
                onChangeHandler_MultiSpace(
                  e,
                  formik.handleChange,
                  formik.values.description,
                  500,
                  true
                )
              }
              value={formik.values.description}
              disabled={loading}
              label="توضیحات :"
              width="w-full"
              placeholder="لطفا توضیحات را وارد کنید"
            />
          </div>
        </div>
        <FileUploader
          btn_name="تصویر دستگاه (اختیاری)"
          uploaderName="ticketAttachmentUploader"
          fileName={setFilePatch}
          extraUrl="Upload?ServiceType=1"
        />
        <div className="w-full flex justify-end gap-2 items-center pt-3 border-t border-gray-200">
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
            width="w-[calc(100%-8px)] sm:w-[110px]"
            type="submit"
          >
            بروزرسانی
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateSystemModal;
