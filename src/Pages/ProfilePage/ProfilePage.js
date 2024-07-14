import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Avatar from "../../components/avatar/Avatar";

const ProfilePage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const CHART_API = process.env.REACT_APP_CHART_API_URL;
  const controller = "OrganizationChart/";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          `${CHART_API}${controller}Employee/${id}/Profile`
        );
        setData(response.data);
      } catch (error) {
        alert("خطایی رخ داده است.");
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="relative h-[calc(100dvh)] w-screen bg-[#f3f3f3]">
      {data && <Avatar data={data} />}
    </div>
  );
};

export default ProfilePage;
