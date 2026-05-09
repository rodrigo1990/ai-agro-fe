"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import TextArea from "../input/TextArea";
import Label from "../Label";


interface TextAreaInputProps {
  title?: string;
  description?: string;
  isHeaderActive?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
   title,
   description,
   isHeaderActive = false,
   value,
   onChange,
 }) => {
  const [message, setMessage] = useState(value ?? "");
  const handleChange = (val: string) => {
    setMessage(val);
    onChange?.(val);
  };

  return (
    <ComponentCard>
      <div className="space-y-6">
        {/* Default TextArea */}
        <div>
           {description && (<Label>{description}</Label>)}
          <TextArea
            value={message}
            onChange={handleChange}
            placeholder="Agregá tus observaciones"
            rows={6}
          />
        </div>

        {/*/!* Disabled TextArea *!/*/}
        {/*<div>*/}
        {/*  <Label>Description</Label>*/}
        {/*  <TextArea rows={6} disabled />*/}
        {/*</div>*/}

        {/*/!* Error TextArea *!/*/}
        {/*<div>*/}
        {/*  <Label>Description</Label>*/}
        {/*  <TextArea*/}
        {/*    rows={6}*/}
        {/*    value={messageTwo}*/}
        {/*    error*/}
        {/*    onChange={(value) => setMessageTwo(value)}*/}
        {/*    hint="Please enter a valid message."*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
    </ComponentCard>
  );
}
export default TextAreaInput;