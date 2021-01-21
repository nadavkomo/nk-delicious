import { useEffect, useState } from "react";

export function useForm(initialState, cb = function () { }) {
  const [fields, setFields] = useState(initialState);

  useEffect(() => { cb(fields) }, [fields])

  return [
    fields,
    function (event) {
      const value = event.target.type === 'number' ? +event.target.value : event.target.value
      setFields({
        ...fields,
        [event.target.name]: value
      });
    },
  ];
}