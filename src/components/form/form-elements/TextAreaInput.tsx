"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import TextArea from "../input/TextArea";
import Label from "../Label";


interface TextAreaInputProps {
  title?: string;
  description?: string;
  isHeaderActive?:boolean;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
   title,
   description,
   isHeaderActive = false,
 }) => {
  const [message, setMessage] = useState("");
  const [messageTwo, setMessageTwo] = useState("");
  return (
    <ComponentCard>
      <div className="space-y-6">
        {/* Default TextArea */}
        <div>
           {description && (<Label>{description}</Label>)}
          <TextArea
            value={message}
            onChange={(value) => setMessage(value)}
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