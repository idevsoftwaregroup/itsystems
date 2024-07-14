import React, { useState } from "react";
import Input from "../../components/common/Input";
import { useFormik } from "formik";
import {
  onChangeHandler_AnySpace,
  onChangeHandler_MultiSpace,
} from "../../utilities/InputOnchangeHandler.ts";
import Button from "../../components/common/Button";
import FileUploader from "../../components/common/FileUploader/FileUploader.jsx";
import * as Repo from "../../services/organizationChartServices/SystemDetailService.js";
import { useDispatch } from "react-redux";
import {
  showErrorAlert,
  showSuccessAlert,
} from "../../redux/features/alert/alertSlice.js";
import { useNavigate } from "react-router-dom";
const CreateSystemPage = () => {
  const [loading, setLoading] = useState(false);
  const [filePatch, setFilePatch] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      systemId: "",
      systemName: "",
      description: "",
      location: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.systemId) {
        errors.systemId = "لطفا شناسه دستگاه را وارد کنید";
      } else if (values.systemId.length > 255) {
        errors.systemId = "شناسه دستگاه بدرستی وارد نشده است";
      }
      if (!values.systemName) {
        errors.systemName = "لطفا نام دستگاه را وارد کنید";
      } else if (values.systemName.length > 255) {
        errors.systemName = "نام دستگاه بدرستی وارد نشده است";
      }
      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      const res = await Repo.POST("CreateSystem", {
        systemId: values.systemId,
        systemName: values.systemName,
        description: values.description ? values.description : "",
        systemPicUrl: filePatch && filePatch.url ? filePatch.url : "",
        location: values.location ? values.location : "",
      });
      if (res.success) {
        navigate(`/system/${values.systemId}`);
        dispatch(showSuccessAlert({ message: res.message }));
      } else {
        dispatch(showErrorAlert({ message: res.message }));
      }
      setLoading(false);
    },
  });

  return (
    <div className="w-full h-[calc(100dvh)] flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full h-[calc(100dvh)] sm:h-auto sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] sm:border sm:border-gray-300 sm:rounded-[15px] sm:shadow-md flex flex-col justify-between items-center gap-y-2 py-3 px-4"
      >
        <div className="w-full flex flex-col gap-y-2">
          <label className="w-full font-theme-semibold pb-2 border-b">
            ثبت سیستم جدید
          </label>
          <div className="w-full flex flex-wrap justify-between items-center gap-y-2">
            <Input
              errorText={formik.errors.systemId ? formik.errors.systemId : null}
              name="systemId"
              onChange={(e) =>
                onChangeHandler_AnySpace(
                  e,
                  formik.handleChange,
                  formik.values.systemId,
                  25,
                  true
                )
              }
              value={formik.values.systemId}
              disabled={loading}
              label="شناسه دستگاه :"
              width="w-full sm:w-[calc(50%-8px)]"
              placeholder="لطفا شناسه دستگاه را وارد کنید"
              dir="ltr"
            />
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
        <Button
          width="w-full sm:w-[250px]"
          loading={loading}
          loadingFill="fill-white"
          type="submit"
        >
          ثبت دستگاه
        </Button>
      </form>
    </div>
  );
};

export default CreateSystemPage;
