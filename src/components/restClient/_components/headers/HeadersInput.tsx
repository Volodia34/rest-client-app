import { headerKeys } from "@/constants/mockData";
import { setHeaderData, setUpdateHeaders } from "@/store/slices/restSlice";
import { RootState } from "@/store/store";
import Button from "@/UI/buttons/Button";
import Input from "@/UI/inputs/Input";
import SelectInput from "@/UI/inputs/SelectInput";
import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HeadersInput = ({ id, index }: { id: number; index: number }) => {
  const dispatch = useDispatch();
  const headers = useSelector((state: RootState) => state.rest.headers);
  const [render, setRender] = useState(false)
  const header = headers[index] || { id, key: "", value: "" };

  const handleKeyChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setHeaderData({data: { id, key: e.target.value, value: header.value }, index}));
    },
    [dispatch, id, header.value, index]
  );

  const handleValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setHeaderData({data: { id, key: header.key, value: e.target.value }, index}));
    },
    [dispatch, id, header.key, index]
  );

  const handleSetChange = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (e.currentTarget.id) {
        dispatch(setHeaderData({data: { id, key: e.currentTarget.id, value: headers[id].value }, index}));
      }
    },
    [dispatch, id, headers, index]
  );

  const removeRow = () => {
    dispatch(setUpdateHeaders(id))
  }

  useEffect(() => {
    setRender(!render)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headers[index]?.key])

  if (!headers[index]) {
    return null;
  }

  return (
      <div key={`${render}`} className="path-wrapper" id={`${id}`}>
        <SelectInput
          value={headers[index].key}
          forInput="headers-key"
          type="text"
          options={headerKeys}
          customStyle="widthMeth"
          onChange={handleKeyChange}
          onSelect={handleSetChange}
        />
        <Input onChange={handleValueChange} value={headers[index].value } forInput="headers-value" type="text" customStyle="widthPath" />
        <Button className="button" text={'Remove'} onClick={removeRow} />
      </div>
      )
}

export default HeadersInput;
