import { headerKeys } from "@/constants/mockData";
import { setHeaderData } from "@/store/slices/restSlice";
import { RootState } from "@/store/store";
import Button from "@/UI/buttons/Button";
import Input from "@/UI/inputs/Input";
import SelectInput from "@/UI/inputs/SelectInput";
import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HeadersInput = ({ id }: { id: number }) => {
  const dispatch = useDispatch();
  const headers = useSelector((state: RootState) => state.rest.headers);
  const [render, setRender] = useState(false)
  const header = headers[id] || { key: "", value: "" };

  const handleKeyChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setHeaderData({ id, key: e.target.value, value: header.value }));
    },
    [dispatch, id, header.value]
  );

  const handleValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setHeaderData({ id, key: header.key, value: e.target.value }));
    },
    [dispatch, id, header.key]
  );

  const handleSetChange = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (e.currentTarget.id) {
        dispatch(setHeaderData({ id, key: e.currentTarget.id, value: headers[id].value }));
      }
    },
    [dispatch, id, headers]
  );

  useEffect(() => {
    setRender(!render)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headers[id].key])

  return (
      <div key={`${render}`} className="path-wrapper" id={`${id}`}>
        <SelectInput
          value={headers[id].key}
          forInput="headers-key"
          type="text"
          options={headerKeys}
          customStyle="widthMeth"
          onChange={handleKeyChange}
          onSelect={handleSetChange}
        />
        <Input onChange={handleValueChange} value={headers[id].value } forInput="headers-value" type="text" customStyle="widthPath" />
        <Button className="button" text={'Remove'} onClick={() => {}} />
      </div>
      )
}

export default HeadersInput;
