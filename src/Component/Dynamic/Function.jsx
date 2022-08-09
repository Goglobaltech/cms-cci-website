import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FormControl, Autocomplete, TextField } from "@mui/material";
import {
  GET_CATEGORY_WITH_PAGINATION,
  GET_PRODUCT_CATEGORY,
} from "../../Schema/category";
import { GET_ALL_ROLE } from "../../Schema/role";

export function SelectCategrory({ selectVal, setSelectVal, typeProduct }) {
  const [data, setData] = useState([]);

  const { data: d } = useQuery(GET_PRODUCT_CATEGORY, {
    variables: {
      type:
        typeProduct === "CleaningMaterails" ? "CleaningMaterails" : "Cosmetics",
    },
    onCompleted: ({ getProductCategory }) => {
      setData(getProductCategory);
    },
  });

  const categoryOptions =
    data?.map((e, index) => ({
      id: e?._id,
      label: e?.categoryName,
    })) || [];

  const handleChange = (event, newValue) => {
    setSelectVal(newValue);
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={categoryOptions}
      value={selectVal}
      onChange={handleChange}
      getOptionDisabled={(option) =>
        option?.label ? option?.label : "select category"
      }
      getOptionSelected={(option, value) => option?.id === value?.id}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          placeholder="select category"
          className="text-field"
        />
      )}
    />
  );
}

export function SelectRole({ selectVal, setSelectVal }) {
  const [data, setData] = useState([]);

  const { data: d } = useQuery(GET_ALL_ROLE, {
    onCompleted: ({ getAllRole }) => {
      setData(getAllRole);
    },
  });

  const categoryOptions =
    data?.map((e, index) => ({
      id: e?._id,
      label: e?.roleName,
    })) || [];

  const handleChange = (event, newValue) => {
    setSelectVal(newValue);
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={categoryOptions}
      value={selectVal}
      onChange={handleChange}
      getOptionDisabled={(option) =>
        option?.label ? option?.label : "select role"
      }
      getOptionSelected={(option, value) => option?.id === value?.id}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          placeholder="select category"
          className="text-field"
        />
      )}
    />
  );
}
