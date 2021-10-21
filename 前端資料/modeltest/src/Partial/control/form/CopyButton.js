import React, { useStyle } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { MdContentCopy } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";

export function CopyButton({ value, ...props }) {
  return (
    <>
      <CopyToClipboard text={value}>
        <IconButton color="primary" omponent="span">
          <MdContentCopy />
        </IconButton>
      </CopyToClipboard>
    </>
  );
}
