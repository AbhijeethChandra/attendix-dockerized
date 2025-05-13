import React from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  Select,
  TextareaAutosize,
} from "@mui/material";

const CustomInput = ({
  label,
  placeholder,
  type = "text",
  options,
  width = "310px",
  required = false,
  handleChange,
  value,
  name,
  multiline = false,
  minRows = 6,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: width }}>
      <label
        style={{
          marginBottom: "6px",
          fontSize: "14px",
          color: "#333",
          fontWeight: "500",
        }}
      >
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </label>

      {multiline ? (
        <TextareaAutosize
          minRows={minRows}
          placeholder={placeholder}
          name={name}
          value={value || ""}
          onChange={handleChange}
          style={{
            padding: "8px 14px",
            fontSize: "14px",
            backgroundColor: "#fff",
            border: "1px solid rgba(0, 0, 0, 0.23)",
            borderRadius: "4px",
            fontFamily: "inherit",
            resize: "vertical",
            width: "calc(100% - 1px)", 
          }}
         sx={{ backgroundColor: "#fff"}}
         
        />
      ) : options ? (
        <FormControl size="small">
          <Select
            value={value}
            onChange={handleChange}
            name={name}
            displayEmpty
            sx={{
              height: "40px",
              fontSize: "14px",
              backgroundColor: "#fff",
            }}
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: "#aaa" }}>{placeholder}</span>;
              }
              const selectedOption = options.find(
                (opt) => opt.value === selected
              );
              return selectedOption ? selectedOption.label : "";
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <TextField
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          size="small"
          sx={{
            "& .MuiInputBase-root": {
              height: "40px",
              fontSize: "14px",
              backgroundColor: "#fff",
            },
          }}
        />
      )}
    </div>
  );
};

export default CustomInput;