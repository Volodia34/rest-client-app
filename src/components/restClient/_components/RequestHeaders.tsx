import Input from "@/UI/inputs/Input";
import SelectInput from "@/UI/inputs/SelectInput";
import RequestSection from "./RequestSection";

const headerKeys = ["Content-Type", "Authorization", "Accept", "User-Agent"];

const RequestHeaders = () => {
  return (
    <RequestSection title="Headers:" buttonText="Add Header">
      <div className="path-wrapper">
        <SelectInput forInput="headers-key" type="text" options={headerKeys} customStyle="widthMeth" />
        <Input forInput="headers-value" type="text" customStyle="widthPath" />
        <button className="button">Remove</button>
      </div>
    </RequestSection>
  );
};

export default RequestHeaders;
