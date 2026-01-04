import {
  CloseRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";

/* ================= STYLES ================= */

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: ${({ small }) => (small ? "8px" : "12px")};
  padding: 0 4px;
  color: ${({ theme, error, popup }) =>
    error
      ? theme.red
      : popup
      ? theme.popup_text_secondary
      : theme.text_primary};
`;

const OutlinedInput = styled.div`
  border-radius: ${({ small }) => (small ? "6px" : "8px")};
  border: 0.5px solid
    ${({ theme, error, popup }) =>
      error
        ? theme.red
        : popup
        ? theme.popup_text_secondary + "60"
        : theme.text_secondary};
  background: ${({ theme, chipableInput }) =>
    chipableInput ? theme.card : "transparent"};
  padding: ${({ small }) => (small ? "8px 10px" : "16px")};
  display: flex;
  align-items: center;
  gap: 12px;

  ${({ chipableInput, height }) =>
    chipableInput &&
    `
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    min-height: ${height};
  `}

  &:focus-within {
    border-color: ${({ theme }) => theme.secondary};
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: ${({ small }) => (small ? "12px" : "14px")};
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme, popup }) =>
    popup ? theme.popup_text_secondary : theme.text_primary};

  &::placeholder {
    opacity: 0.6;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  font-size: 14px;
  border: none;
  outline: none;
  background: transparent;
  resize: none;
  color: ${({ theme }) => theme.text_primary};
`;

const Error = styled.p`
  font-size: ${({ small }) => (small ? "8px" : "12px")};
  margin: 0 4px;
  color: ${({ theme }) => theme.red};
`;

const ChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Chip = styled.div`
  padding: 5px 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary + "10"};
  color: ${({ theme }) => theme.primary};
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

/* ================= COMPONENT ================= */

const TextInput = ({
  label,
  placeholder,
  name,
  value,
  error,
  handelChange,
  textArea = false,
  rows,
  chipableInput = false,
  chipableArray = [],
  removeChip,
  height = "auto",
  small = false,
  popup = false,
  password = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container>
      {label && (
        <Label htmlFor={name} error={error} small={small} popup={popup}>
          {label}
        </Label>
      )}

      <OutlinedInput
        error={error}
        chipableInput={chipableInput}
        height={height}
        small={small}
        popup={popup}
      >
        {chipableInput ? (
          <ChipWrapper>
            {chipableArray.map((chip, index) => (
              <Chip key={index}>
                {chip}
                <CloseRounded
                  sx={{ fontSize: 14, cursor: "pointer" }}
                  onClick={() => removeChip?.(name, index)}
                />
              </Chip>
            ))}

            <Input
              id={name}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={handelChange}
            />
          </ChipWrapper>
        ) : (
          <>
            {textArea ? (
              <TextArea
                id={name}
                name={name}
                rows={rows}
                placeholder={placeholder}
                value={value}
                onChange={handelChange}
              />
            ) : (
              <Input
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handelChange}
                type={password && !showPassword ? "password" : "text"}
                small={small}
                popup={popup}
              />
            )}

            {password && (
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "inherit",
                }}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </button>
            )}
          </>
        )}
      </OutlinedInput>

      {error && <Error small={small}>{error}</Error>}
    </Container>
  );
};

export default TextInput;
