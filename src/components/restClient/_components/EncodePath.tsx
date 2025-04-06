import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const EncodePath = () => {
  const { baseUrl, endpoint, params } = useSelector((state: RootState) => state.rest);
  return (
    <section className="container path">
        <p>{baseUrl}{endpoint}{params}</p>
    </section>
  )
};

export default EncodePath;
